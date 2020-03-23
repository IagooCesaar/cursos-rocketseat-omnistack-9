import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../../services/api';

import './styles.css';

export default function Dashborad() {
    const [spots, setSpots ] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');
    
    const socket  = useMemo(() => socketio('http://192.168.100.100:3333', {
        query: {
            user_id
        }
    }), [user_id])

    useEffect(() => { 
        socket.on('booking_request', data => {
            setRequests([...requests, data])
        })
    }, [requests, socket]);

    useEffect(() => {
        async function loadSpots() {
            
            let response  = null;
            try {
                console.log('Tentativa de obter spots do usuário id '+user_id)
                response = await api.get('/dashboard', {
                    headers: {
                        user_id
                    },
                })

            } catch (error) {
                console.log('Falha ao obter spots do usuário',error)   
            } finally {
                console.log('Spots retornados',response.data)
            }
            setSpots(response.data);            
        }
        loadSpots();
    }, []);

    async function handleDecision(id, decision) {
        await api.post(`/bookings/${id}/${decision ? 'approvals' : 'rejections'}`)
        setRequests(requests.filter(request => request._id !== id))
    }

    return (
        <>
            {requests && (<ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong> 
                        </p>
                        <button className="accept" onClick={() => handleDecision(request._id,true)}>ACEITAR</button>
                        <button className="reject" onClick={() => handleDecision(request._id,false)}>REJEITAR</button>
                    </li>
                ))}
            </ul>)}
            <ul className="spot-list">
                {spots && ( spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>  
                        <span>{spot.price ? `R$ ${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                )))}
            </ul>            
            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>                
            </Link>
        </>
    )
}
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default function Dashborad() {
    const [spots, setSpots ] = useState([]);
    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
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

    return (
        <>
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
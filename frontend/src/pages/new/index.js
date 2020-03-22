import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';
import './styles.css';

export default function New({history}) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail])

    async function handleSubmit(event){
        event.preventDefault()
        let response = null;
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('techs',     techs);
        data.append('price',     price);
        data.append('company',   company);

        try {
            response = await api.post('/spots', data, {
                headers: {
                    user_id
                }
            })
        } catch(error) {
            console.log('Falha ao criar novo spot',error)  
            return
        } finally {
            console.log('Spots retornados',response.data)
        }
        history.push('/dashboard')
    }

    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
               style={{ backgroundImage: `url(${preview})` }} 
               className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select a img"/>
            </label>
            <label htmlFor="company">EMPRESA *</label>
            <input 
                id="company"
                placeholder="Sua empresa incrível"                
                value={company}
                onChange={e => setCompany(e.target.value)}
                type="text"
            />
            <label htmlFor="techs">TECNOLOGIAS *
                <span> (separadas por vírgula)</span>
            </label>
            <input 
                id="techs"
                placeholder="Quais tecnologias usam"                
                value={techs}
                onChange={e => setTechs(e.target.value)}
                type="text"
            />
            <label htmlFor="price">VALOR DA DIÁRIA
                <span> (em branco para gratuito)</span>
            </label>
            <input 
                id="price"
                placeholder="Valor cobrado por dia"                
                value={price}
                onChange={e => setPrice(e.target.value)}
                type="number"
            />
            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}
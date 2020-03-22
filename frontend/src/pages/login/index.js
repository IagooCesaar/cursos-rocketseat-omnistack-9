import React, { useState }  from 'react';

import api from '../../services/api';

export default function Login({ history }) {

    const [email, setEmail] = useState('')

    async function handleSubmit(event) {
        event.preventDefault();
        console.log('Tentativa de login com email',email)
        let response = null;
        try {
            response = await api.post('/sessions', { email })
            const { _id } = response.data;
            localStorage.setItem('user', _id) // aba application no console do navegador

        } catch(error) {
            console.log('Erro ao iniciar sessão',error)
        } finally {
            console.log('Resposta no Login', response)
        }      
        if (response) history.push('/dashboard')

   }
    return (
        <>
            <p>
                Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
            </p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail *</label>  
                <input 
                    type="email" 
                    id="email" 
                    placeholder="Seu melhor e-mail" 
                    onChange={event => setEmail(event.target.value)}
                />
                <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    )
}
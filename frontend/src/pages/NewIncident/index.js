import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function NewIncident() {
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');
  const [title, setTitle] = useState('');
  const [description, setDiscription] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const data = { title, description, value };
    api
      .post('incidents', data, {
        headers: {
          authorization: ongId
        }
      })
      .then(response => {
        console.log(response.data);
        history.push('/profile');
      });
  };

  return (
    <div className='newincident-container'>
      <div className='content'>
        <section>
          <img src={logoImg} alt='Be The Hero' />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontar um herói para resolver
            isso.
          </p>
          <Link className='back-link' to='/profile'>
            <FiArrowLeft size={16} color='#E02041' />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='Título do caso'
          />
          <textarea
            value={description}
            onChange={e => setDiscription(e.target.value)}
            placeholder='Descrição'
          />

          <input
            value={value}
            type='number'
            onChange={e => setValue(e.target.value)}
            placeholder='Valor em reais'
          />

          <button className='button' type='submit'>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

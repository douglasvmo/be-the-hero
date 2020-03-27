import React, { useEffect, useState } from 'react';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './style.css';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

function Profile() {
  const history = useHistory();
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    if (ongId !== null) {
      api
        .get('profiles', {
          headers: {
            authorization: ongId
          }
        })
        .then(response => {
          setIncidents(response.data);
        });
    } else {
      history.push('/');
    }
  }, [ongId, history]);

  const handleDeliteIncident = id => {
    api
      .delete(`incidents/${id}`, {
        headers: {
          authorization: ongId
        }
      })
      .then(() => {
        setIncidents(incidents.filter(incident => incident.id !== id));
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className='profile-container'>
      <header>
        <img src={logoImg} alt='Be The Hero' />
        <span>Bem Vinda, {ongName}</span>
        <Link className='button' to='/incidents/new'>
          Cadastrar novo caso
        </Link>
        <button type='button' onClick={handleLogout}>
          <FiPower size={18} color='#e02041' />
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id.toString()}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>
            <strong>DESCRIÇÃO:</strong>
            <p> {incident.description}</p>
            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat('pt-br', {
                style: 'currency',
                currency: 'BRL'
              }).format(incident.value)}
            </p>
            <button
              onClick={() => {
                handleDeliteIncident(incident.id);
              }}
            >
              <FiTrash2 size={20} color='#a8a8b3' />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;

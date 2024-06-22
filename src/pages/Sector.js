import '../css/Sector.css';
import BarChart from '../charts/BarChart';
import { useState, useEffect } from 'react';
import SectorChart from '../charts/SectorChart';
import { useLocation } from 'react-router-dom';

const Sector = () => {

  const [ensino, setEnsino] = useState('medio');

  const location = useLocation();
  
   useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ensinoParam = params.get('e');

    if (ensinoParam === 'em') {
      setEnsino('medio');
      console.log('Ensino médio selecionado');
    } else if (ensinoParam === 'ef') {
      setEnsino('fundamental');
      console.log('Ensino fundamental selecionado');
    }
  }, [location.search]);

  const ultimaAtualizacao = localStorage.getItem('ultimaAtualizacao') || false;

  return (
    <main className="container-sector">
      <section className='content-sector'>
        <h1> Super BI Letícia | Sector Graph </h1>
        {ultimaAtualizacao && (
          <a className='ultimaAtualizacao'><strong>Semana:</strong> {ultimaAtualizacao}</a>
        )}
        <p>Made by <strong>TecVit</strong></p>
        <nav className='navbar'>
          <select value={ensino} onChange={(e) => {
            setEnsino(e.target.value)
          }}>
            <option value="fundamental">Ensino Fundamental</option>
            <option value="medio">Ensino Médio</option>
          </select>
        </nav>
        <SectorChart key={ensino} ensino={ensino} />
      </section>
    </main>
  );
}

export default Sector;

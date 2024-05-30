import '../css/Bar.css';
import BarChart from '../charts/BarChart';
import { useState } from 'react';

const Bar = () => {

  const [ensino, setEnsino] = useState('medio');
  const [serie, setSerie] = useState('1ºA');

  return (
    <main className="container-bar">
      <section className='content-bar'>
        <h1> Super BI Letícia | Bar </h1>
        <p>Made by <strong>TecVit</strong></p>
        <nav className='navbar'>
          <select defaultValue={ensino} onChange={(e) => {
            setSerie(e.target.value === 'medio' ? '1ºA' : '6ºA'); 
            setEnsino(e.target.value)
          }}>
            <option value="fundamental">Ensino Fundamental</option>
            <option value="medio">Ensino Médio</option>
          </select>
          {ensino === 'fundamental' ? (
            <>
              <a onClick={() => setSerie('6ºA')} className={serie === '6ºA' && 'selecionado'}>6º Ano A</a>
              <a onClick={() => setSerie('6ºB')} className={serie === '6ºB' && 'selecionado'}>6º Ano B</a>
              <a onClick={() => setSerie('6ºC')} className={serie === '6ºC' && 'selecionado'}>6º Ano C</a>
              <a onClick={() => setSerie('7ºA')} className={serie === '7ºA' && 'selecionado'}>7º Ano A</a>
              <a onClick={() => setSerie('7ºB')} className={serie === '7ºB' && 'selecionado'}>7º Ano B</a>
              <a onClick={() => setSerie('8ºA')} className={serie === '8ºA' && 'selecionado'}>8º Ano A</a>
              <a onClick={() => setSerie('8ºB')} className={serie === '8ºB' && 'selecionado'}>8º Ano B</a>
              <a onClick={() => setSerie('9ºA')} className={serie === '9ºA' && 'selecionado'}>9º Ano A</a>
              <a onClick={() => setSerie('9ºB')} className={serie === '9ºB' && 'selecionado'}>9º Ano B</a>
            </>
          ) : ensino === 'medio' ? (
            <>
              <a onClick={() => setSerie('1ºA')} className={serie === '1ºA' && 'selecionado'}>1º Ano A</a>
              <a onClick={() => setSerie('1ºB')} className={serie === '1ºB' && 'selecionado'}>1º Ano B</a>
              <a onClick={() => setSerie('2ºA')} className={serie === '2ºA' && 'selecionado'}>2º Ano A</a>
              <a onClick={() => setSerie('2ºB')} className={serie === '2ºB' && 'selecionado'}>2º Ano B</a>
              <a onClick={() => setSerie('3ºA')} className={serie === '3ºA' && 'selecionado'}>3º Ano A</a>
              <a onClick={() => setSerie('3ºB')} className={serie === '3ºB' && 'selecionado'}>3º Ano B</a>
              <a onClick={() => setSerie('3ºC')} className={serie === '3ºC' && 'selecionado'}>3º Ano C</a>
            </>
          ) : (
            <></>
          )}
        </nav>
        <BarChart serie={serie} />
      </section>
    </main>
  );
}

export default Bar;
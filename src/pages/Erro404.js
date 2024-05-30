import '../css/Erro404.css';
import BarChart from '../charts/BarChart';
import { useState } from 'react';

const Erro404 = () => {

  const [ensino, setEnsino] = useState('medio');
  const [serie, setSerie] = useState('1ºA');

  return (
    <main className="container-erro404">
      <section className='content-erro404'>
        <h1>Page not found :(</h1>
      </section>
    </main>
  );
}

export default Erro404;
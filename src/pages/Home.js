import '../css/Home.css';
import BarChart from '../charts/BarChart';
import { useState } from 'react';

const Home = () => {

  const [ensino, setEnsino] = useState('medio');
  const [serie, setSerie] = useState('1ºA');

  return (
    <main className="container-home">
      <section className='content-home'>
        <h1>Welcome to <br /> Super BI Letícia</h1>
        <p>Made by <strong>TecVit</strong></p>
      </section>
    </main>
  );
}

export default Home;
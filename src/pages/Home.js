import '../css/Home.css';
import BarChart from '../charts/BarChart';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Home = () => {

  const [ensino, setEnsino] = useState('medio');
  const [serie, setSerie] = useState('1ºA');

  return (
    <main className="container-home">
      <section className='content-home'>
        <h1>Welcome to <br /> Super BI Letícia</h1>
        <p>Made by <strong>TecVit</strong></p>
        <nav className='links'>
        <Link to="/bar">
            Bar Graph
          </Link>
          <Link to="/sector">
            Sector Graph
          </Link>
        </nav>
      </section>
    </main>
  );
}

export default Home;
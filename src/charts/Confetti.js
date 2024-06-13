import React, { useEffect, useRef } from 'react';
import ConfettiGenerator from 'confetti-js';

const Confetti = () => {
  const confettiRef = useRef(null);

  useEffect(() => {
    console.log('renderizou')
    const confettiSettings = { target: confettiRef.current };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    // Limpa o confetti quando o componente for desmontado
    return () => confetti.clear();
  }, []);

  return <canvas ref={confettiRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }} />;
};

export default Confetti;
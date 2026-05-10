import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState<{ status: string | null }>({ status: null });

  useEffect(() => {
    fetch('http://localhost:8000/health')
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return <div>{data && <p>{data.status}</p>}</div>;
}

export default App;

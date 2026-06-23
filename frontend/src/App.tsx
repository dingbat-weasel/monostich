import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState<{ status: string | null }>({ status: null });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/health`)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);
  console.log(data);

  return <div>{data && <p>{data.status}</p>}</div>;
}

export default App;

import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState<{ status: string | null }>({ status: null });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_URL;

    fetch(`${baseUrl}/health`)
      .then(async (res) => {
        const rawText = await res.text();
        console.log('Raw payload from railway: ', rawText);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return JSON.parse(rawText);
      })
      .then((json) => setData(json))
      .catch((err) => {
        console.log('Fetch or Parse error caught: ', err);
        setError(err.message);
      });
  }, []);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && <p>{data.status}</p>}
    </div>
  );
}

export default App;

import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [serchQuery, setSerchQuery] = useState([]);
  const ref = useRef();
  const [isBlank, setIsBlank] = useState(true);


  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      return res.json();
    })
    .then((data) => setUsers(data));
  }, [])

  const checkBlank = () => {
    if(ref.current.value.length === 0) {
      setIsBlank(true);
    } else {
      setIsBlank(false);
    }
  };

  const handleSerch = () => {
    console.log(ref.current.value);
    checkBlank();

    // フィルタリング機能
    setSerchQuery(
      users.filter((user) => user.name.toLowerCase().includes(ref.current.value))
    );
  };

  console.log(serchQuery);

  return (
    <div className="App">
      <div className='main'>
        <h2>Serch-App</h2>
        <input type='text' ref={ref} onChange={() => handleSerch()}/>
        <div className='content'>
          {isBlank
            ? users.map((user) => {
              <div className='box' key={user.id}>
              <h3>{user.name}</h3>
              <hr />
              <p>{user.email}</p>
              </div>
            }) : serchQuery.map((user) => (
            <div className='box' key={user.id}>
              <h3>{user.name}</h3>
              <hr />
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

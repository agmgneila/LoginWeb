import React, { useState } from 'react';
import Login from './Login';
import Mensaje from './Mensaje';

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setUser(user);
  };

  return (
    <div className="App">
      {user ? (
        <Mensaje mensaje={`Bienvenido, ${user.name}`} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;

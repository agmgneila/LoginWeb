import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Realizar la llamada a la API para obtener los usuarios
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        // Buscar si el email coincide con algún usuario
        const user = users.find(u => u.email === email);
        if (!user) {
          setMensaje('Error: Usuario no encontrado.');
          return;
        }

        // Verificar si la contraseña (username) coincide con el usuario
        if (user.username !== password) {
          setMensaje('Error: Contraseña incorrecta.');
          return;
        }

        // Si todo está correcto
        setMensaje(`Bienvenido, ${user.name}!`);
        onLoginSuccess(user);
      })
      .catch(error => {
        setMensaje('Error: Fallo en la conexión con la API.');
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Username (Password):</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Login;

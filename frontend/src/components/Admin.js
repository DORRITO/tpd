import React, { useState } from 'react';
import axios from 'axios';

function Admin() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (password === '123') {
      setAuthenticated(true);

      try {
        const response = await axios.post('http://localhost:5000/admin/users');
        setUsers(response.data.users);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('Неверный пароль');
    }
  };

  const handleDeleteUser = async (userId) => {
    const response = await axios.delete(`http://localhost:5000/admin/users/delete/${userId}`);
    console.log(response.data);
    window.location.reload();
  };

  return (
    <div style={{ height: 'auto' }} className='wrapper'>
      {authenticated && (
        <>
          {users.map((user, index) => (
            <div className='usersTable' key={index}>
              <div className='usersHeader'>
                <div className='usersName'>
                  <span>id: {user._id}</span> <br />
                  {user.fullName}
                </div>
                <div style={{ cursor: 'pointer' }} onClick={() => handleDeleteUser(user._id)} className='usersDelete'>Удалить аккаунт</div>
              </div>

              <div className='userInfo'>
                Номер телефона: {user.phoneNumber}
              </div>

              <div className='userInfo'>
                Почта: {user.email}
              </div>
            </div>
          ))}
        </>
      )}

      {!authenticated && (
        <form onSubmit={handlePasswordSubmit}>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Войти</button>
        </form>
      )}
    </div>
  );
}

export default Admin;

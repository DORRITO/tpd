import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './css/style.css'
import axios from 'axios';
import Cookies from 'js-cookie';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate()

  const onLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password
      })
  
      const { token, user } = response.data
  
      if (token) {
        Cookies.set('token', token);

        axios.post('http://localhost:5000/users/profile', null, {  // Changed this line
          headers: {
            authorization: token,  // Corrected spelling: 'authorization'
          },
        }).then(response => {
          console.log(response.data);
        });
      }

      window.location.reload()
  
      console.log('Успешная авторизация')
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      setErrorMsg(error.response.data.message);
    }
  }
  
  return (
    <div className='container'>
    <div className='wrapper'>
        <div className='form'>
            <div className='authTitle'>
                Авторизация
            </div>
            {errorMsg && <div className="error">{errorMsg}</div>}
            <input required className='formInput' placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input required className='formInput' placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className='buttonInput' onClick={onLogin}>Войти</button>
        </div> 

        <div className='bottomText'>
            Еще нету аккаунта? <Link to="/regis">Зарегистрироваться</Link>
        </div>
    </div>
</div>
  )
}

export default Login
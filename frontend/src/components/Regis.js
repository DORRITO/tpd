import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import InputMask from 'react-input-mask';

function Regis() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [accountType, setAccountType] = useState('customer'); 
  const [errorMsg, setErrorMsg] = useState(''); 

  const createUsers = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/registration', {
        email,
        password,
        fullName: displayName,
        phoneNumber,
        [accountType]: true
      })

      const { token, message } = response.data;

      if (token) {
        Cookies.set('token', token);
      }

      window.location.reload();
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      setErrorMsg('Проверьте правильность введеных данных');
    }
  }

  return (
    <div className="container">
      <div className="wrapper">
        <div className="form formReg">
          <div className="authTitle">Регистрация</div>
          {errorMsg && <div className="error">{errorMsg}</div>}
          <input
            className="formInput"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Ваше имя"
            required
          />
        <InputMask 
          mask="+7 (999) 999 99 99" 
          maskChar="_"
          value={phoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)} 
        >
          {(inputProps) => (
            <input
              className="formInput"
              placeholder="Номер телефона"
              required
              value={phoneNumber}
              {...inputProps} 
            />
          )}
        </InputMask>
          <input
            className="formInput"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="formInput"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select className='regisSelect' value={accountType} onChange={(e) => setAccountType(e.target.value)}>
            <option value="customer">Заказчик</option>
            <option value="driver">Водитель</option>
          </select>
          <button onClick={createUsers} className="buttonInput">
            Зарегистрироваться
          </button>
        </div>

        <div className="bottomText">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </div>
      </div>
    </div>
  );
}

export default Regis;

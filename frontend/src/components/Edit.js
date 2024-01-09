import { useState, useEffect, useRef } from 'react'
import React from 'react'
import './css/style.css'
import backImage from './image/back.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import InputMask from 'react-input-mask';

function Edit() {
  const navigate = useNavigate()
  const myRef = useRef(null);

  const [msg, setMsg] = useState(''); 

  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
  });

  const token = Cookies.get('token');

  useEffect(() => {
    if (token) {
      axios
        .post(
          'http://localhost:5000/users/profile',
          null,
          {
            headers: {
              authorization: token,
            },
          }
        )
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error('Ошибка: ' + error);
        });
    }
  }, [token]); // Добавляем зависимость token

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/users/update',
        userData,
        {
          headers: {
            authorization: token,
          },
        }
      );

      console.log('Профиль успешно обновлен:', response.data);
      setMsg('Профиль успешно обновлен')
      myRef.current.style.color = 'green';
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
      setMsg(error.response.data.message);
      myRef.current.style.color = 'red';
    }
  };

  return (
    <div className='wrapper'>
      <div className='wrapperEdit'>
          <div className='wrapperEditHeader'>
              <div className='back'>
                  <img onClick={() => {
                    navigate('/home')
                  }} src={backImage} />
              </div>

              <div className='headerTitle'>
                  Настройки профиля
              </div>
          </div>

          <form className='formEdit'>
              <div className='inputFormEdit'>
                <label>Изменить имя</label>
                <input type="text" name="fullName" placeholder="Полное имя" value={userData.fullName} onChange={handleChange} />
              </div>

              <div className='inputFormEdit five'>
                <label>Изменить почту</label>
                <input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} />
              </div>

              <div className='inputFormEdit five'>
                <label>Изменить Телефон</label>
                <InputMask 
                mask="+7 (999) 999 99 99" 
                maskChar="_"
                value={userData.phoneNumber}
                onChange={handleChange}
                name='phoneNumber'
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    className="formInputMask"
                    placeholder="Номер телефона"
                    required
                    value={userData.phoneNumber}
                    name='phoneNumber'
                    onChange={handleChange}
                  />
                )}
              </InputMask>
              </div>
              <button onClick={handleSubmit}>Сохранить изменения</button>
              <div ref={myRef} className='msg'>{msg}</div>
          </form>

      </div>
    </div>
  )
}

export default Edit
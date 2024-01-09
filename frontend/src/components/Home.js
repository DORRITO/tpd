import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const mapStyles = {
  width: '100%',
  height: '100%'
};

const Home = () => {
  const [userData, setuserData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = Cookies.get('token')
    if(token) {
      axios.post('http://localhost:5000/users/profile', null, {
        headers: {
          authorization: token,  
        },
      })
      .then(response => {
        setuserData(response.data)
      })
      .catch(error => {
        console.error("Ошибка: " + error)
      })
    }
  }, [])  

  if (!userData) {
    return <div>Загрузка данных...</div>;
  }

  const handleButtonClick = () => {
    if (userData.roles.includes('customer')) {
      navigate('/createOrder');
    } else if (userData.roles.includes('driver')) {
      navigate('/orders');
    }
  };

  return (
    <div>
        <div className='gridHome'>
          <div className='leftSide'>
              <div className='logo'>
                  TPDelivery
              </div>
              <div className='leftSideTop'>
                  <div className='homeTitle'>Привет <span>{userData.fullName}</span>!</div>
                  <div>
                    <p>Телефон: {userData.phoneNumber}</p>
                    <p>Статус: {userData.roles.includes('customer') ? 'Заказчик' : 'Водитель'}</p>

                    <button className='createOrder' onClick={handleButtonClick}>
                        {userData.roles.includes('customer') ? 'Заказать такси' : 'Найти заказы'}
                    </button>
                </div>

                <div className='leftSideBottom'>
                       <button onClick={() => {
                        navigate('/edit')
                      }}>Изменить профиль</button> 

                      <button onClick={() => {
                        navigate('/login')
                        Cookies.remove('token')
                        window.location.reload()
                      }}>Выйти</button> 
                </div>
              </div>  
          </div>

          <div className='rightSide'>
              
          </div>
        </div>
    </div>
  );
};

export default Home;

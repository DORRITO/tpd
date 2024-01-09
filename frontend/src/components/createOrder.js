import React, { useState, useEffect } from 'react';
import backImage from './image/back.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import geolib from 'geolib';
import Cookies from 'js-cookie';

function CreateOrder() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState(''); 

  const token = Cookies.get('token');

  const routes = [
    { label: "Караганда - Астана", routePrice: 3000 },
    { label: "Караганда - Алматы", routePrice: 12000 },
    { label: "Караганда - Жезказган", routePrice: 7000 },
    { label: "Астана - Караганда", routePrice: 3000 },
    { label: "Алматы - Караганда", routePrice: 12000 },
    { label: "Жезказган - Караганда", routePrice: 7000 },
  ];

  const [orderData, setOrderData] = useState({
    routes: routes[0].label,
    price: '',
    startAddress: '',
    endAddress: '',
    seats: '',
    dateRoute: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target || e;

    if (name === 'seats') {
      const selectedRoute = routes.find(route => route.label === orderData.routes);
      const price = parseInt(value, 10) * selectedRoute.routePrice;

      setOrderData(prevState => ({
        ...prevState,
        price,
        [name]: value,
      }));
    } else {
      setOrderData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    // Если пользователь не менял выбранный маршрут, устанавливаем значение по умолчанию
    if (orderData.routes === '') {
      setOrderData(prevState => ({
        ...prevState,
        routes: routes[0].label,
      }));
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/order/create',
        orderData,
        {
          headers: {
            authorization: token,
          },
        }
      );
      
      setMsg('Заказ успешно создан. Он удалится через 2 часа')
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='wrapper'>
      <div className='wrapperEdit'>
        <div className='wrapperEditHeader'>
          <div className='back'>
            <img
              onClick={() => {
                navigate('/home');
              }}
              src={backImage}
              alt="Back"
            />
          </div>
          <div style={{ marginLeft: '20%' }} className='headerTitle'>
            Создание заказа
          </div>
        </div>

        <form className='formEdit inputFormEdit'>
          <label>Выберите маршут</label>
          <select
            style={{ width: '100%', padding: 10 }}
            className='regisSelect'
            value={orderData.routes}
            onChange={handleChange}
            name="routes"
          >
            {routes.map((route, index)=> (
              <option key={index} value={route.label}>{route.label} (Цена: {route.routePrice} KZT)</option>
            ))}

          </select>
          <div className='inputFormEdit'>
            <label>Адрес</label>
            <input
              type="text"
              value={orderData.startAddress}
              onChange={handleChange}
              name="startAddress"
              placeholder="Где вас забрать"
            />
          </div>

          <div className='inputFormEdit'>
            <label>Где вас оставить</label>
            <input
              type="text"
              value={orderData.endAddress}
              onChange={handleChange}
              name="endAddress"
              placeholder="Куда ехать"
            />
          </div>

          <div className='inputFormEdit'>
            <label>Дата и время выезда</label>
            <input
              type="text"
              value={orderData.dateRoute}
              onChange={handleChange}
              name="dateRoute"
              placeholder="Дата и время выезда"
            />
          </div>

          <div className='inputFormEdit'>
            <label>Сколько человек едет</label>
            <input
              type="number"
              name="seats"
              value={orderData.seats}
              onChange={handleChange}
              placeholder="Количество мест"
              min="1"
              max="6"
            />
          </div>

          {orderData.price ? (
            <div className="totalInfo">
              <div>Сумма: {orderData.price} KZT</div>
            </div>
          ) : (
            <div className="totalInfo">Введите количество пассажиров</div>
          )} 

          <button onClick={handleSubmitCreate}>Заказать такси</button>

          <div className='msg'>{msg}</div>
        </form>
      </div>
    </div>
  );
}

export default CreateOrder;
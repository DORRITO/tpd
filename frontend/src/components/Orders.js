import React, { useEffect, useState } from 'react'
import backImage from './image/back.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

function Orders() {
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchOrders(){
      try{
        const response = await axios.post('http://localhost:5000/order/view')

        setOrders(response.data.orders)
      } catch(e){
        console.log(e)
      }
    }

    fetchOrders()
  }, [])
  return (
    <div className='wrapper'>
    <div style={{overflow: 'hidden'}} className='wrapperEdit'>
        <div className='wrapperEditHeader'>
            <div className='back'>
                <img onClick={() => {
                  navigate('/home')
                }} src={backImage} />
            </div>

            <div style={{marginLeft: '20%'}} className='headerTitle'>
                Список заказов
            </div>
        </div>

        <div className='orderGrid'>
            {orders.map((order, index) => (
              <div key={index} className='order'>
                  <div className='headerRoutes'>
                      <div className='routerTitle'>
                          {order.routes}
                      </div>

                      <div className='routerPrice'>
                          {order.price}₸
                      </div>
                  </div>

                  <div className='hr'></div>

                  <div className='orderSettings'>
                      Имя заказчика: <span>{order.customer.fullName}</span>
                  </div>

                  <div className='orderSettings'>
                      Начальный адрес: <span>{order.startAddress}</span>
                  </div>

                  <div className='orderSettings'>
                      Конечный адрес: <span>{order.endAddress}</span>
                  </div>

                  <div className='orderSettings'>
                      Дата выезда: <span>{order.dateRoute}</span>
                  </div>

                  <div className='orderSettings'>
                      Количество пассажиров: <span>{order.seats}</span>
                  </div>

                  <div className='hr'></div>

                  <div className='getContact'>
                      <a href={`tel:${order.customer.phoneNumber}`}>Связаться с заказчиком</a>
                  </div>
              </div>
            ))}
        </div>

    </div>
  </div>
  )
}

export default Orders
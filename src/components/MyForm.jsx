import { Select, Space, Form, Input } from 'antd';
import { RiExchangeLine } from "react-icons/ri";
import { useState, useEffect } from 'react'
import st from './MyForm.module.css'
import axios from 'axios';


function coinExchanger(value, priceA, priceB) {
   const totalPrice = value * priceA
   const priceThatCoin = totalPrice / priceB
   return priceThatCoin
}

const MyForm = () => {
   const [data, setData] = useState([])
   const [coinA, setCoinA] = useState(null)
   const [coinB, setCoinB] = useState(null)
   const [inputValue, setInputValue] = useState('')

   useEffect(() => {
      const AXIoptions = {
         method: 'GET',
         url: 'https://openapiv1.coinstats.app/coins',
         params: { limit: '3' },
         headers: {
            accept: 'application/json',
            'X-API-KEY': '42r9S30ZFqxPxK7h1dHi/bZSFmIE8VXs4a5oqgZAxI4='
         }
      };

      axios
         .request(AXIoptions)
         .then(function (response) {
            setData(response.data.result);
         })
         .catch(function (error) {
            console.error(error);
         });
   }, [])

   return (
      <>
         <Form className={st.formBox}>
            <Input
               className={st.input}
               type='text'
               value={inputValue}
               onChange={(event) => setInputValue(event.target.value)} />
            <Select
               className={st.select}
               onSelect={(v) => setCoinA(data.find((c) => c.id === v))}
               placeholder="select coin"
               optionLabelProp="label"
               options={data.map((coin) => ({
                  label: coin.symbol,
                  value: coin.id,
                  icon: coin.icon,
               }))}
               optionRender={(option) => (
                  <Space>
                     <img className={st.img} src={option.data.icon} />{option.data.label}
                  </Space>
               )}
            />
            <RiExchangeLine className={st.exchangeImg} />
            <Input
               className={st.input}
               value={coinExchanger((+inputValue), coinA?.price, coinB?.price)}
            />
            <Select
               className={st.select}
               onSelect={(v) => setCoinB(data.find((c) => c.id === v))}
               placeholder="select coin"
               optionLabelProp="label"
               options={data.map((coin) => ({
                  label: coin.name,
                  value: coin.id,
                  icon: coin.icon,
               }))}
               optionRender={(option) => (
                  <Space>
                     <img className={st.img} src={option.data.icon} />{option.data.label}
                  </Space>
               )}
            />
         </Form>
      </>
   )
}

export default MyForm

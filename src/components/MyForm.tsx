import { Select, Space, Form, Input } from 'antd';
import { RiBitCoinLine } from "react-icons/ri";
import { useState, useEffect, FC } from 'react'
import st from './MyForm.module.css'
import axios from 'axios';

type TypeData = {
   id?: string,
   icon: string,
   name: string,
   symbol: string,
   price: number
}

type TypeCoin = {
   id: string,
   price: number,
}

function coinExchanger(value: number, priceA: number, priceB: number) {
   const totalPrice = value * priceA
   const priceThatCoin = totalPrice / priceB
   return priceThatCoin
}

const MyForm: FC = () => {
   const [data, setData] = useState<TypeData[]>([])
   const [coinA, setCoinA] = useState<TypeCoin>({ id: '', price: 0 })
   const [coinB, setCoinB] = useState<TypeCoin>({ id: '', price: 0 })
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

   console.log(coinA)

   return (
      <>
         <Form className={st.formBox}>
            <Input
               className={st.input}
               placeholder='Enter amount'
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
            <RiBitCoinLine className={st.exchangeImg} />
            <Input
               className={st.input}
               value={coinExchanger((+inputValue), coinA.price, coinB?.price)}
            />
            <Select
               className={st.select}
               onSelect={(v) => setCoinB(data.find((c) => c.id === v))}
               placeholder="select coin"
               optionLabelProp="label"
               options={data.map((coin) => ({
                  label: coin.symbol,
                  value: coin.id,
                  icon: coin.icon,
               }))}
               optionRender={(option) => (
                  <Space className={st.space}>
                     <img className={st.img} src={option.data.icon} />{option.data.label}
                  </Space>
               )}
            />
         </Form>
      </>
   )
}

export default MyForm

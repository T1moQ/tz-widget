import { useState, useEffect, FC } from 'react'
import { Form, Input } from 'antd';
import { RiBitCoinLine } from "react-icons/ri";
import axios from 'axios';
import st from './MyForm.module.css'
import MySelect from './MySelect';
import { TypeCoin, TypeData } from '../types/types'
import { coinExchanger } from '../utils/utils'

const MyForm: FC = () => {
   const [data, setData] = useState<TypeData[]>([])
   const [coinA, setCoinA] = useState<TypeCoin | null>(null)
   const [coinB, setCoinB] = useState<TypeCoin | null>(null)
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
               placeholder='Enter amount'
               type='text'
               value={inputValue}
               onChange={(event) => setInputValue(event.target.value)} />
            <MySelect data={data} onSelect={(v) => setCoinA(data?.find((c) => c.id === v) || null)} />

            <RiBitCoinLine className={st.exchangeImg} />

            <Input
               className={st.input}
               value={coinA && coinB && coinExchanger((+inputValue), coinA.price, coinB.price) || ''}
            />
            <MySelect data={data} onSelect={(v) => setCoinB(data?.find((c) => c.id === v) || null)} />
         </Form>
      </>
   )
}

export default MyForm

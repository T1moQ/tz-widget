import { useState, FC } from 'react'
import { Form, Input } from 'antd';
import { RiBitCoinLine } from "react-icons/ri";
import { TypeCoin } from '../../types/types'
import { coinExchanger } from '../../utils/utils'
import { useGetBTC } from '../../api/useGetBTC'
import st from './MyForm.module.css'
import MySelect from '../select/MySelect';

const MyForm: FC = () => {
   const [coinA, setCoinA] = useState<TypeCoin | null>(null)
   const [coinB, setCoinB] = useState<TypeCoin | null>(null)
   const [inputValue, setInputValue] = useState('')
   const { data, isError, isLoading } = useGetBTC()

   return (
      <>
         {isLoading && <div>Loading...</div>}
         {isError && <div>Error! =( </div>}
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

import { Select, Space } from 'antd'
import st from './MySelect.module.css'
import { TypeData } from '../types/types'

const MySelect = ({ data, onSelect }: { data: TypeData[], onSelect: (v: string) => void }) => {
   return (
      <>
         <Select
            className={st.select}
            onSelect={onSelect}
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
      </>
   )
}

export default MySelect

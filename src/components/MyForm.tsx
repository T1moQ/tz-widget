import { Form, InputNumber, Select, Space } from "antd"
import type { SelectProps } from 'antd';

const MyForm: React.FC = () => {

   const handleChange = (value: string[]) => {
      console.log(`selected ${value}`);
   }

   const options: SelectProps['options'] = [
      {
         label: 'China',
         value: 'china',
         emoji: '🇨🇳',
         desc: 'China (中国)',
      },
      {
         label: 'USA',
         value: 'usa',
         emoji: '🇺🇸',
         desc: 'USA (美国)',
      },
      {
         label: 'Japan',
         value: 'japan',
         emoji: '🇯🇵',
         desc: 'Japan (日本)',
      },
      {
         label: 'Korea',
         value: 'korea',
         emoji: '🇰🇷',
         desc: 'Korea (韩国)',
      },
   ];

   return (
      <Form className="formBox">
         <div>
            <InputNumber min={1} max={10} defaultValue={3} />
            <Select
               style={{ width: '150px' }}
               placeholder="select one country"
               onChange={handleChange}
               optionLabelProp="label"
               options={options}
               optionRender={(option) => (
                  <Space>
                     <span role="img" aria-label={option.data.label}>
                        {option.data.emoji}
                     </span>
                     {option.data.desc}
                  </Space>
               )}
            />
         </div>
         <div>
            <InputNumber min={1} max={10} defaultValue={3} />
            <Select
               style={{ width: '150px' }}
               placeholder="select one country"
               onChange={handleChange}
               optionLabelProp="label"
               options={options}
               optionRender={(option) => (
                  <Space>
                     <span role="img" aria-label={option.data.label}>
                        {option.data.emoji}
                     </span>
                     {option.data.desc}
                  </Space>
               )}
            />
         </div>
      </Form>
   );
};

export default MyForm;
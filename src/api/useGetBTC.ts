import { useState, useEffect } from "react"
import { TypeData } from "../types/types"
import axios from "axios"

export function useGetBTC() {
   const [data, setData] = useState<TypeData[]>([])
   const [isLoading, setIsLoading] = useState(false)
   const [isError, setIsError] = useState(false)

   useEffect(() => {
      setIsLoading(true)
      const options = {
         params: { limit: '3' },
         headers: { 'X-API-KEY': '42r9S30ZFqxPxK7h1dHi/bZSFmIE8VXs4a5oqgZAxI4=' }
      };

      axios.get('https://openapiv1.coinstats.app/coins', options)
         .then(response => { setData(response.data.result) })
         .catch(() => setIsError(true))
         .finally(() => setIsLoading(false))
   }, [])

   return { data, isLoading, isError }
}
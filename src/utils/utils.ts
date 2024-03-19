export function coinExchanger(value: number, priceA: number, priceB: number) {
   const totalPrice = value * priceA
   const priceThatCoin = totalPrice / priceB
   return priceThatCoin
}
import { View, Text } from 'react-native'
import React from 'react'

import { useCart } from '@/provider/CartProvider'
const Cart = () => {
  const {items} =useCart()
  return (
    <View>
      <Text>{items.length}</Text>
    </View>
  )
}

export default Cart
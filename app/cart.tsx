import { View, Text, Platform, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import CartListItem from '@/components/CartListItem';
import Button from '@/components/Button';
import { useCart } from '@/provider/CartProvider';

const CartScreen = () => {
  const { items} = useCart();

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />

      {/* <Text style={{ marginTop: 20, fontSize: 20, fontWeight: '500' }}>
        Total: ${total}
      </Text>
      <Button onPress={checkout} text="Checkout" /> */}

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default CartScreen;
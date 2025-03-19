import {View, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import CartCard from '../Component/CartCard';

const Cart = () => {
  const {cartList, totalPrice} = useSelector(state => state.cart);
  return (
    <View style={{flex: 1, backgroundColor: '#f8f4ec'}}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: '700',
          marginLeft: 25,
          marginTop: 15,
        }}>
        Cart
      </Text>
      <CartCard cartList={cartList} />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'white',
          width: '100%',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#e8a57c',
            paddingVertical: 15,
            paddingHorizontal: 25,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Total Amount</Text>
          <Text style={{fontSize: 18, fontWeight: '500'}}>₹ {totalPrice}</Text>
        </View>
      </View>
    </View>
  );
};

export default Cart;

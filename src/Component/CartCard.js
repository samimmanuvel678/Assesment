import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addQuantity,
  deleteItem,
  removeQuantity,
} from '../Redux/Slices/cartSlices';
import {addOrder} from '../Redux/Slices/orderSlice';
const CartCard = ({cartList}) => {
  const dispatch = useDispatch();
  const handleCheckOut = (id, name, price) => {
    dispatch(addOrder({name: name, amount: price}));
    dispatch(deleteItem({id: id}));
  };

  const renderCartCard = data => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: 15,
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: 'white',
          borderRadius: 18,
          elevation: 2,
        }}>
        <Image
          source={{uri: data.item.pic}}
          style={{
            width: 95,
            height: 95,
            backgroundColor: 'white',
            borderRadius: 8,
          }}
        />
        <View style={{width: '100%', gap: 15}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 15,
            }}>
            <Text style={{width: 150, fontSize: 15, fontWeight: '500'}}>
              {data.item.name}
            </Text>
            <Text>₹ {data.item.price}</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 80}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
              }}>
              <Pressable
                style={{
                  backgroundColor: '#ff725e',
                  borderRadius: 4,
                  paddingHorizontal: 5,
                }}
                onPress={() => dispatch(addQuantity({itemId: data.item.id}))}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 18,
                    fontWeight: '400',
                  }}>
                  +
                </Text>
              </Pressable>
              <Text style={{fontSize: 18, fontWeight: '400', color: 'black'}}>
                {data.item.quantity}
              </Text>
              <Pressable
                style={{
                  backgroundColor: '#ff725e',
                  borderRadius: 4,
                  paddingHorizontal: 5,
                  paddingVertical: 1,
                }}
                onPress={() =>
                  dispatch(removeQuantity({itemId: data.item.id}))
                }>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 17,
                    fontWeight: '400',
                  }}>
                  –
                </Text>
              </Pressable>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#ff725e',
                borderRadius: 5,
                marginTop: 3,
                paddingHorizontal: 15,
                paddingVertical: 10,
              }}
              onPress={() =>
                handleCheckOut(data.item.id, data.item.name, data.item.price)
              }>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 15,
                  color: '#333333',
                  fontWeight: '600',
                }}>
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{paddingHorizontal: 10}}>
      <FlatList
        data={cartList}
        renderItem={renderCartCard}
        contentContainerStyle={{
          width: '100%',
          gap: 10,
          paddingBottom: 150,
          marginTop: 10,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CartCard;

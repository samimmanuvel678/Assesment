import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadOrders} from '../Redux/Slices/orderSlice';

const Order = () => {
  const dispatch = useDispatch();
  const list = useSelector(state => state.order.orderList);
  console.log(list);
  useEffect(() => {
    dispatch(loadOrders());
  }, []);
  const renderOrders = item => {
    return (
      <View
        style={{
          paddingVertical: 14,
          paddingHorizontal: 15,
          backgroundColor: '#ff725e',
          borderRadius: 8,
          gap: 10,
          elevation: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Text style={{fontSize: 15, fontWeight: '600', color: '#2e2e2e'}}>
              Order No :
            </Text>
            <Text style={{fontSize: 15, fontWeight: '600', color: '#2e2e2e'}}>
              {item.item.orderNo}
            </Text>
          </View>
          <Text style={{fontSize: 15, fontWeight: '600', color: '#2e2e2e'}}>
            ₹ {item.item.amount}
          </Text>
        </View>
        <Text style={{fontSize: 17, fontWeight: '600', color: '#2e2e2e'}}>{item.item.name}</Text>
        <Text style={{fontSize: 15, fontWeight: '400', textAlign: 'right', color: '#2e2e2e' }}>
          {item.item.time}
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#f8f4ec'}}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: '700',
          marginLeft: 25,
          marginTop: 15,
        }}>
        Order
      </Text>
      <FlatList
        data={list}
        renderItem={renderOrders}
        contentContainerStyle={{
          gap: 10,
          marginTop: 20,
          paddingBottom: 150,
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Order;

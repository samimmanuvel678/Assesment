import {View, Text, FlatList, Image, Pressable, Alert} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addItem} from '../Redux/Slices/cartSlices';

const ProductCards = ({data, selectedCategory}) => {
  const filterName = selectedCategory.toLowerCase();
  const dispatch = useDispatch();
  const filteredProducts =
    filterName === 'all'
      ? data
      : data.filter(item => item.category === filterName);
  const handleCart = (id, name, price, pic) => {
    dispatch(
      addItem({
        id: id,
        name: name,
        price: price,
        pic: pic,
      }),
      Alert.alert('Cart', 'Added to Cart', [{text: 'OK'}]),
    );
  };
  const renderList = data => {
    const originalPrice =
      data.item.price / (1 - data.item.discountPercentage / 100);
    return (
      <View
        style={{
          width: 165,

          backgroundColor: 'white',
          display: 'flex',
          borderRadius: 8,
          overflow: 'hidden',
          paddingBottom: 15,
        }}>
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 8,
            elevation: 5,
          }}>
          <Image
            source={{uri: data?.item?.thumbnail}}
            style={{width: '155', height: 181}}
          />
        </View>
        <View style={{paddingHorizontal: 15}}>
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              marginTop: 20,
              fontWeight: '600',
            }}>
            {data.item.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              fontWeight: '600',
              marginTop: 8,
            }}>
            ₹ {data.item.price}
          </Text>
          <View style={{flexDirection: 'row', gap: 10, marginTop: 3}}>
            <Text
              style={{
                width: '45%',
                fontSize: 12,
                color: 'black',
                fontWeight: '500',
                color: '#e63946',
                textDecorationLine: 'line-through',
              }}>
              ₹ {parseFloat(originalPrice.toFixed(2))}
            </Text>
            <Text
              style={{
                width: '50%',
                fontSize: 12,
                color: 'black',
                fontWeight: '500',
                color: '#e63946',
              }}>
              {parseFloat(data.item.discountPercentage.toFixed(0))}% OFF
            </Text>
          </View>

          <Pressable
            style={{
              backgroundColor: '#ff725e',
              padding: 5,
              borderRadius: 8,
              marginTop: 10,
            }}
            onPress={() =>
              handleCart(
                data.item.id,
                data.item.title,
                data.item.price,
                data.item.thumbnail,
              )
            }>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                fontWeight: '600',
                color: '#333333',
              }}>
              Add to Cart
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={filteredProducts}
        renderItem={renderList}
        numColumns={2}
        contentContainerStyle={{
          rowGap: 20,
          alignItems: 'center',
          paddingBottom: 150,
        }}
        columnWrapperStyle={{gap: 25}}
      />
    </View>
  );
};

export default ProductCards;

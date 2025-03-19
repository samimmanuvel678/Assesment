import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchData} from '../Redux/Slices/dataSlice';
import {FlatList} from 'react-native-gesture-handler';
import ProductCards from '../Component/ProductCards';
import DropDown from '../Component/DropDown';

const Products = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSlectedCategory] = useState('All');

  const {items, loading, error} = useSelector(state => state.data);
  useEffect(() => {
    dispatch(fetchData());
  }, []);
  return (
    <View style={{backgroundColor:"#f8f4ec",}}>
      <View style={{flexDirection: 'row',justifyContent:"space-between", alignItems:"center",paddingHorizontal:10,paddingVertical:10,paddingRight:25}}>
        <Text style={{fontSize:25,fontWeight:"600"}}>Products</Text>
        <DropDown
          data={items.products}
          selectedCategory={selectedCategory}
          setSlectedCategory={setSlectedCategory}
        />
      </View>

      {items ? <ProductCards data={items.products} selectedCategory={selectedCategory}/> : null}
      {loading && <ActivityIndicator size={'large'} color="#0000ff" />}
      {error && <Text>Error occured</Text>}
    </View>
  );
};

export default Products;

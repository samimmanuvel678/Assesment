import {View, Text, Pressable, TouchableHighlight} from 'react-native';
import React, {useState} from 'react';

const DropDown = ({data, selectedCategory, setSlectedCategory}) => {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueCategories = [...new Set(data?.map(item => item.category))];
  const handleSelection = value => {
    setSlectedCategory(value);
    setIsOpen(false);
  };
  return (
    <Pressable
      onPress={() => setIsOpen(!isOpen)}
      style={{zIndex: 5, justifyContent: 'flex-start'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
          padding: 10,
          backgroundColor: '#ff725e',
          borderRadius: 10,
        }}>
        <Text style={{fontSize: 15, fontWeight: '600'}}>
          {selectedCategory}
        </Text>
        <Text>▼</Text>
      </View>
      {isOpen ? (
        <View
          style={{
            position: 'absolute',
            top: 35,
            right: 1,
            zIndex: 5,
            backgroundColor: '#ffa08c',
          }}>
          <TouchableHighlight
            underlayColor="#f8f4ec"
            style={{borderBottomWidth: 0.5, paddingBottom: 5, paddingTop: 5}}
            onPress={() => handleSelection('All')}>
            <Text
              style={{textAlign: 'center', fontSize: 14, fontWeight: '500'}}>
              All
            </Text>
          </TouchableHighlight>

          {uniqueCategories.map((item, index) => {
            const categoryName = item
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
            return (
              <TouchableHighlight
                key={index}
                underlayColor="#f8f4ec"
                style={{marginTop: 8, minWidth: 150, borderBottomWidth: 0.5}}
                onPress={() => handleSelection(categoryName)}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    textAlign: 'center',
                    paddingBottom: 5,
                  }}>
                  {categoryName}
                </Text>
              </TouchableHighlight>
            );
          })}
        </View>
      ) : null}
    </Pressable>
  );
};

export default DropDown;

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Products from '../Screens/Products';
import Cart from '../Screens/Cart';
import Order from '../Screens/Order';
import Ionicon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Product"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let IconName;
          if (route.name === 'Product') {
            IconName = focused ? 'pricetags' : 'pricetags-outline';
          } else if (route.name === 'Cart') {
            IconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Order') {
            IconName = focused ? 'list-circle' : 'list-circle-outline';
          }
          return <Ionicon name={IconName} />;
        },
        tabBarActiveTintColor: '#ff725e',
        tabBarInactiveTintColor: '#b0afaf',
        tabBarLabelStyle: {fontSize: 14},
        // tabBarStyle:{backgroundColor:"ffe8d6",paddingBottom:20}
      })}>
      <Tab.Screen name="Product" component={Products} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Orders" component={Order} />
    </Tab.Navigator>
  );
}
export default MyTabs;

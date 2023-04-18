import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import OrderList from './OrderList';
import {useAppDispatch, useAppSelector} from './store/hooks';
import {
  isLoggedIn,
  logout,
  resetCustData,
  resetMainOrderData,
  resetWorkerData,
} from './reducer';
import Icon from 'react-native-vector-icons/Ionicons';
import InsertOrder from './screens/InsertOrder';
import {NavigatorScreenParams} from '@react-navigation/native';
import Example from './screens/example';

export type rootStackParams = {
  Home: any | undefined;
  bottomStack: any | undefined;
  InsertOrder: any | undefined;
};
export type bottomStackParams = {
  OrderList: any | undefined;
  example: any | undefined;
};
const Stack = createNativeStackNavigator<rootStackParams>();
const bottomStack = createBottomTabNavigator<bottomStackParams>();

const BottomStack = () => {
  const dispatch = useAppDispatch();
  return (
    <bottomStack.Navigator>
      <bottomStack.Screen
        name="OrderList"
        component={OrderList}
        options={{
          headerRight: () => {
            return (
              <>
                <Icon
                  name="ios-exit-outline"
                  color={'black'}
                  size={24}
                  style={{padding: 10}}
                  onPress={() => {
                    dispatch(logout());
                    dispatch(resetWorkerData());
                    dispatch(resetCustData());
                    dispatch(resetMainOrderData());
                  }}
                />
              </>
            );
          },
        }}
      />
      <bottomStack.Screen name="example" component={Example} />
    </bottomStack.Navigator>
  );
};
const NavigationStack = () => {
  let isLoggedInVar = useAppSelector(isLoggedIn);
  return (
    <Stack.Navigator>
      {isLoggedInVar ? (
        <>
          <Stack.Screen
            name="bottomStack"
            component={BottomStack}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="InsertOrder"
            component={InsertOrder}
            options={{headerTitle: 'Add new order'}}
          />
        </>
      ) : (
        <Stack.Screen name="Home" component={Home} />
      )}
    </Stack.Navigator>
  );
};

export default NavigationStack;

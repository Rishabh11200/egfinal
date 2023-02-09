import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import OrderList from './OrderList';
import {useAppDispatch, useAppSelector} from './store/hooks';
import {isLoggedIn, logout} from './reducer';
import Icon from 'react-native-vector-icons/Ionicons';

export type rootStackParams = {
  Home: any | undefined;
  bottomStack: any | undefined;
};
export type bottomStackParams = {
  OrderList: any | undefined;
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
                  }}
                />
              </>
            );
          },
        }}
      />
    </bottomStack.Navigator>
  );
};
const NavigationStack = () => {
  let isLoggedInVar = useAppSelector(isLoggedIn);
  return (
    <Stack.Navigator>
      {isLoggedInVar ? (
        <Stack.Screen
          name="bottomStack"
          component={BottomStack}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen name="Home" component={Home} />
      )}
    </Stack.Navigator>
  );
};

export default NavigationStack;

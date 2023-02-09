import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {orderList} from '../interfaces';
import {color} from '../constants/color';

interface OrderCardProps {
  itemData: orderList;
}
const OrderCard = (props: OrderCardProps) => {
  const {itemData} = props;
  console.log(itemData);
  return (
    <View style={styles.mainView}>
      <Text style={styles.textTitle}>Order no. {itemData.OrderNumber}</Text>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'row',
  },
  textTitle: {
    color: color.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

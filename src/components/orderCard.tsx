import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MainOrderType, orderList} from '../interfaces';
import {color} from '../constants/color';

interface OrderCardProps {
  itemData: MainOrderType;
}
const OrderCard = (props: OrderCardProps) => {
  const {itemData} = props;
  return (
    <View style={styles.profileBoxShadow}>
      <View style={styles.cardIn}>
        <View>
        </View>
        <View style={styles.cardDetail}>
          <Text style={styles.textTitle}>{itemData.customerName}</Text>
          <Text style={styles.cardDescription}>{itemData.OrderNumber}</Text>
          <View style={{alignItems: 'flex-end', marginHorizontal: 15}}>
            <Text style={styles.cardDescription}>₹{itemData.amount} /-</Text>
            <Text style={styles.inactiveBadge}>Delete</Text>
          </View>
        </View>
      </View>
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileBoxShadow: {
    flex:1, 
    marginVertical: 5,
    marginHorizontal: 10,
    elevation: 4,
    backgroundColor: color.white,
    shadowColor: color.black,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 10,
      width: 40,
    },
    borderRadius: 10,
  },
  cardIn: {
    fontSize: 20,
    flexDirection: 'row',
  },
  cardDetail: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  cardDescription: {
    fontSize: 18,
    fontWeight: '500',
    color: color.black,
    marginTop: 6,
  },
  inactiveBadge: {
    marginTop: 10,
    color: 'red',
  },
});

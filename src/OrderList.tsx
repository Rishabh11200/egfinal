import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {MainOrderType} from './interfaces';
import OrderCard from './components/orderCard';
import {color} from './constants/color';

const OrderList = () => {
  const [mainOrderList, setMainOrderList] = useState<Array<MainOrderType>>([]);
  const [loading, setLoading] = useState<boolean>();

  const fetchList = async () => {
    let res = await firestore()
      .collection('Orders')
      .orderBy('Timestamp', 'desc')
      .get();
    return res.docs;
  };
  const fetchCustomer = async () => {
    let res = await firestore().collection('Customer').get();
    return res.docs;
  };
  const final = new Promise<MainOrderType[]>(async (resolve, reject) => {
    try {
      let arr: Array<MainOrderType> = [];
      const orderRes = await fetchList();
      const custRes = await fetchCustomer();
      if (orderRes && custRes) {
        orderRes.forEach(orderData => {
          custRes.forEach(custData => {
            let newOrderObj = {} as MainOrderType;
            if (orderData.data().CustomerID === custData.data().CustomerID) {
              newOrderObj = {
                CustomerID: orderData.data().CustomerID,
                customerName: custData.data().Name,
                OrderNumber: orderData.data().OrderNumber,
                sampleWeight: orderData.data().sampleWeight,
                Timestamp: orderData.data().Timestamp,
                touch: orderData.data().touch,
                Weight: orderData.data().Weight,
                WeightScale: orderData.data().WeightScale,
                WorkerID: orderData.data().WorkerID,
                amount: orderData.data().amount,
              };
            }
            arr.push(newOrderObj);
          });
        });
      }
      resolve(arr);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

  useEffect(() => {
    setLoading(true);
    final.then(res => {
      setMainOrderList(res);
      setLoading(false);
    });
  }, []);
  return (
    <View style={styles.layout}>
      {loading ? (
        <>
          <ActivityIndicator size={'large'} color={color.black} />
        </>
      ) : (
        <FlatList
          data={mainOrderList}
          renderItem={({item}) => {
            return <OrderCard itemData={item} />;
          }}
        />
      )}
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

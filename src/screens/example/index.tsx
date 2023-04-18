import {firebase} from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {MainOrderType, orderList} from '../../interfaces';
import {Text} from 'react-native';

const Example = () => {
  const [collection1Data, setCollection1Data] = useState([]);
  const [collection2Data, setCollection2Data] = useState([]);
  const [collection3Data, setCollection3Data] = useState<Array<MainOrderType>>(
    [],
  );
  const [realtimeData, setRealtimeData] = useState<orderList[]>([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   const collection1Snapshot = await firestore().collection("collection1").get();
    //   setCollection1Data(collection1Snapshot.docs.map(doc => doc.data()));

    //   const collection2Snapshot = await firestore.collection("collection2").get();
    //   setCollection2Data(collection2Snapshot.docs.map(doc => doc.data()));

    //   const collection3Snapshot = await firestore.collection("collection3").get();
    //   setCollection3Data(collection3Snapshot.docs.map(doc => doc.data()));
    // };

    const unsubscribe = firestore()
      .collection('Orders').orderBy('Timestamp', 'desc')
      .where('isCancelled', '==', false)
      .limit(25)
      .onSnapshot(snapshot => {
        // setRealtimeData(snapshot.docs.map(doc => doc.data()) as orderList[]);
        firestore()
          .collection('Customer')
          .get()
          .then(res => {
            setCollection3Data(
              snapshot.docs.map(orderData => {
                let newOrderObj = {} as MainOrderType;
                res.docs.forEach(custData => {
                  if (
                    orderData.data().CustomerID === custData.data().CustomerID
                  ) {
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
                      isCancelled: orderData.data().isCancelled,
                      sampleWeightScale: orderData.data().sampleWeightScale,
                    };
                  }
                });
                return newOrderObj;
              }),
            );
          });
      });
    // fetchData();

    return () => {
      unsubscribe();
    };
  }, []);
  if(collection3Data){
    console.log(collection3Data);
    
  }
  return (
    <>
      <Text>Hello</Text>
    </>
  );
};

export default Example;

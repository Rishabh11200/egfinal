import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  allMergedData,
  customerDataType,
  MainOrderType,
  workerDataType,
} from './interfaces';
import OrderCard from './components/orderCard';
import {color} from './constants/color';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAppDispatch, useAppSelector} from './store/hooks';
import {
  insertCustData,
  insertWorkerData,
  insertmainOrderData,
  mainOrderAllData,
} from './reducer';
import {bottomStackParams, rootStackParams} from './navigation';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type OrderListProps = CompositeScreenProps<
  BottomTabScreenProps<bottomStackParams, 'OrderList'>,
  NativeStackScreenProps<rootStackParams>
>;
const orderCollection = firestore().collection('Orders');
const SINGLE_PAGE_DATA = 6;
const OrderList = (props: OrderListProps) => {
  const [loading, setLoading] = useState<boolean>();
  const [mainOrderList, setMainOrderList] = useState<Array<MainOrderType>>([]);
  const [lastData, setLastData] = useState<any | undefined>();
  const dispatch = useAppDispatch();

  const fetchCustomer = async () => {
    let res = await firestore().collection('Customer').get();
    return res.docs;
  };

  const fetchWorker = async () => {
    let res = await firestore().collection('Workers').get();
    return res.docs;
  };

  const final = new Promise<allMergedData>(async (resolve, reject) => {
    try {
      let allCustData: Array<customerDataType> = [];
      let allWorkerData: Array<workerDataType> = [];
      const custRes = await fetchCustomer();
      const workerRes = await fetchWorker();
      if (custRes && workerRes) {
        custRes.forEach(element => {
          allCustData.push(element.data() as customerDataType);
        });
        workerRes.forEach(element => {
          allWorkerData.push(element.data() as workerDataType);
        });
      }
      // if (orderRes && custRes && workerRes) {
      //   orderRes.forEach(orderData => {
      //     custRes.forEach(custData => {
      //       let newOrderObj = {} as MainOrderType;
      //       if (orderData.data().CustomerID === custData.data().CustomerID) {
      //         newOrderObj = {
      //           CustomerID: orderData.data().CustomerID,
      //           customerName: custData.data().Name,
      //           OrderNumber: orderData.data().OrderNumber,
      //           sampleWeight: orderData.data().sampleWeight,
      //           Timestamp: orderData.data().Timestamp,
      //           touch: orderData.data().touch,
      //           Weight: orderData.data().Weight,
      //           WeightScale: orderData.data().WeightScale,
      //           WorkerID: orderData.data().WorkerID,
      //           amount: orderData.data().amount,
      //           isCancelled: orderData.data().isCancelled,
      //           sampleWeightScale: orderData.data().sampleWeightScale,
      //         };
      //       }
      //       arr.push(newOrderObj);
      //     });
      //   });
      //   custRes.forEach(data => {
      //     allCustData.push(data.data() as customerDataType);
      //   });
      //   workerRes.forEach(data => {
      //     allWorkerData.push(data.data() as workerDataType);
      //   });
      // }
      let mix: allMergedData = {
        cust: allCustData,
        main: [],
        worker: allWorkerData,
      };
      resolve(mix);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

  const onAdd = () => {
    props.navigation.navigate('InsertOrder');
  };

  const onLoadMore = () => {
    if (lastData !== undefined) {
      orderCollection
        .orderBy('Timestamp', 'desc')
        .where('isCancelled', '==', false)
        .startAfter(lastData)
        .limit(SINGLE_PAGE_DATA)
        .get()
        .then(snapshot => {
          firestore()
            .collection('Customer')
            .get()
            .then(res => {
              setMainOrderList([
                ...mainOrderList,
                ...snapshot.docs.map(orderData => {
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
              ]);
            });
          setLastData(snapshot.docs[snapshot.docs.length - 1]);
        });
    }
  };

  const onDelete = (orderID: number) => {
    
  };
  useEffect(() => {
    final.then((res: allMergedData) => {
      dispatch(insertCustData({customerAllData: res.cust}));
      dispatch(insertWorkerData({workerAllData: res.worker}));
    });
    const unsubscribe = orderCollection
      .orderBy('Timestamp', 'desc')
      .where('isCancelled', '==', false)
      .limit(SINGLE_PAGE_DATA)
      .onSnapshot(snapshot => {
        setLoading(true);
        firestore()
          .collection('Customer')
          .get()
          .then(res => {
            setMainOrderList(
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
        setLastData(snapshot.docs[snapshot.docs.length - 1]);
        setLoading(false);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{flex:1}}>
      {loading ? (
        <View style={styles.loadingLayout}>
          <ActivityIndicator size={'large'} color={color.black} />
        </View>
      ) : (
        <View style={styles.layout}>
          <TouchableOpacity
            style={styles.FAB}
            onPress={onAdd}
            activeOpacity={0.5}>
            <Icon name="ios-add-outline" size={30} color="#01a699" />
          </TouchableOpacity>
          <FlatList
            data={mainOrderList}
            renderItem={({item}) => {
              return <OrderCard itemData={item} />;
            }}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.5}
          />
        </View>
      )}
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingLayout: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  FAB: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 50,
    opacity: 50,
    backgroundColor: '#fff',
    borderRadius: 100,
    zIndex: 1,
  },
});

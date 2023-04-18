import {
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import {customerDataType, orderList, workerDataType} from '../../interfaces';
import {useAppSelector} from '../../store/hooks';
import {customerAllData, workerAllData} from '../../reducer';
import {Dropdown} from 'react-native-element-dropdown';
import {scaleData} from '../../constants/variables';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {rootStackParams} from '../../navigation';

type InsertOrderProps = NativeStackScreenProps<rootStackParams, 'InsertOrder'>;
const InsertOrder = (props: InsertOrderProps) => {
  const [weight, setWeight] = useState<string>();
  const [sampleWeight, setSampleWeight] = useState<string>();
  const [weightScale, setWeightScale] = useState<string>();
  const [sampleWeightScale, setSampleWeightScale] = useState<string>();
  const [touch, setTouch] = useState<string>();
  const [amount, setAmount] = useState<string>();
  const [orderNo, setOrderNo] = useState<number>();
  const [customerValue, setCustomerValue] = useState<string>();
  const [workerValue, setWorkerValue] = useState<string>();
  let cust: customerDataType[] = useAppSelector(
    customerAllData,
  ) as customerDataType[];
  let workers: workerDataType[] = useAppSelector(
    workerAllData,
  ) as workerDataType[];

  const setAllFields = (text: any, fieldName: any) => {
    if (fieldName === 'weight') {
      setWeight(text);
    }
    if (fieldName === 'sampleWeight') {
      setSampleWeight(text);
    }
    if (fieldName === 'touch') {
      setTouch(text);
    }
    if (fieldName === 'amount') {
      setAmount(text);
    }
  };

  const fetchLatestOrderNum = async () => {
    let res = await firestore()
      .collection('Orders')
      .orderBy('Timestamp', 'desc')
      .limit(25)
      .get();
    return res.docs[0];
  };

  const final = new Promise<number>(async (resolve, reject) => {
    try {
      let all: Array<orderList> = [];
      let data = await fetchLatestOrderNum();
      if (data) {
        resolve(data.data().OrderNumber);
      }
    } catch (error) {
      reject(error);
    }
  });

  const onSend = async () => {
    if (
      weight &&
      sampleWeight &&
      weightScale &&
      sampleWeightScale &&
      touch &&
      amount &&
      orderNo &&
      customerValue &&
      workerValue
    ) {
      let obj: orderList = {
        amount: parseFloat(amount),
        CustomerID: customerValue,
        isCancelled: false,
        OrderNumber: orderNo,
        sampleWeight: parseFloat(sampleWeight),
        sampleWeightScale: sampleWeightScale,
        Timestamp: firestore.Timestamp.fromDate(new Date()),
        touch: touch,
        Weight: parseFloat(weight),
        WeightScale: weightScale,
        WorkerID: workerValue,
      };
      await firestore()
        .collection('Orders')
        .add(obj)
        .then(res => {
          props.navigation.navigate('bottomStack');
          return res;
        });
    }
  };
  useEffect(() => {
    final.then(res => setOrderNo(res + 1));
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.main}
      keyboardShouldPersistTaps={'handled'}>
      <View style={styles.container}>
        <Text style={styles.orderText}>Order no. {orderNo}</Text>
        <Dropdown
          style={styles.dropdownContainer}
          placeholderStyle={styles.dropDownPlaceholderStyle}
          selectedTextStyle={styles.dropDownSelectedTextStyle}
          inputSearchStyle={styles.dropDownInputSearchStyle}
          data={cust}
          search
          maxHeight={300}
          labelField="Name"
          valueField="CustomerID"
          placeholder="Select Customer"
          searchPlaceholder="Search..."
          value={customerValue}
          renderItem={data => {
            return (
              <View style={styles.dropDownList}>
                <Text style={styles.dropDownSelectedTextStyle}>
                  {data.Name}
                </Text>
              </View>
            );
          }}
          onChange={item => {
            setCustomerValue(item.CustomerID);
          }}
        />
        <Dropdown
          style={styles.dropdownContainer}
          placeholderStyle={styles.dropDownPlaceholderStyle}
          selectedTextStyle={styles.dropDownSelectedTextStyle}
          inputSearchStyle={styles.dropDownInputSearchStyle}
          data={workers}
          search
          maxHeight={300}
          labelField="Name"
          valueField="WorkerID"
          placeholder="Select Worker"
          searchPlaceholder="Search..."
          value={workerValue}
          renderItem={data => {
            return (
              <View style={styles.dropDownList}>
                <Text style={styles.dropDownSelectedTextStyle}>
                  {data.Name}
                </Text>
              </View>
            );
          }}
          onChange={item => {
            setWorkerValue(item.WorkerID);
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={styles.inputContainerWithDropDown}>
            <TextInput
              style={styles.inputs}
              value={weight}
              keyboardType={'numeric'}
              placeholder="Weight"
              onChangeText={text => setAllFields(text, 'weight')}
            />
          </View>
          <View style={{flex: 0.3}}>
            <Dropdown
              style={styles.dropDownScale}
              placeholderStyle={styles.dropDownPlaceholderStyle}
              selectedTextStyle={styles.dropDownSelectedTextStyle}
              data={scaleData}
              maxHeight={100}
              labelField="label"
              valueField="value"
              placeholder="Scale"
              value={weightScale}
              renderItem={data => {
                return (
                  <View style={styles.dropDownList}>
                    <Text style={styles.dropDownSelectedTextStyle}>
                      {data.label}
                    </Text>
                  </View>
                );
              }}
              onChange={item => {
                setWeightScale(item.value);
              }}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.inputContainerWithDropDown}>
            <TextInput
              style={styles.inputs}
              value={sampleWeight}
              keyboardType={'numeric'}
              placeholder="Sample weight"
              onChangeText={text => setAllFields(text, 'sampleWeight')}
            />
          </View>
          <View style={{flex: 0.3}}>
            <Dropdown
              style={styles.dropDownScale}
              placeholderStyle={styles.dropDownPlaceholderStyle}
              selectedTextStyle={styles.dropDownSelectedTextStyle}
              data={scaleData}
              maxHeight={100}
              labelField="label"
              valueField="value"
              placeholder="Scale"
              value={sampleWeightScale}
              renderItem={data => {
                return (
                  <View style={styles.dropDownList}>
                    <Text style={styles.dropDownSelectedTextStyle}>
                      {data.label}
                    </Text>
                  </View>
                );
              }}
              onChange={item => {
                setSampleWeightScale(item.value);
              }}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            value={touch}
            keyboardType={'numeric'}
            placeholder="Touch"
            onChangeText={text => setAllFields(text, 'touch')}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            value={amount}
            keyboardType={'numeric'}
            placeholder="Price"
            onChangeText={text => setAllFields(text, 'amount')}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableHighlight
            activeOpacity={0.6}
            style={[styles.buttonContainer, styles.sendButton]}
            onPress={() => onSend()}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );
};

export default InsertOrder;

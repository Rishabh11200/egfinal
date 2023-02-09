import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export type orderList = {
  CustomerID: string;
  OrderNumber: number;
  Timestamp: FirebaseFirestoreTypes.Timestamp;
  Weight: number;
  WeightScale: string;
  WorkerID: string;
  sampleWeight: string;
  touch: string;
  amount: number;
};

export type customerDataType = {
  Address: string;
  CustomerID: string;
  Email: string;
  Inquiry: boolean;
  M_Number: string;
  Name: string;
};

export interface MainOrderType extends orderList {
  customerName: string;
}

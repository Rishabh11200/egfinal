import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export type orderList = {
  CustomerID: string;
  OrderNumber: number;
  Timestamp: FirebaseFirestoreTypes.Timestamp;
  Weight: number;
  WeightScale: string;
  WorkerID: string;
  sampleWeight: number;
  touch: string;
  isCancelled: boolean;
  sampleWeightScale: string;
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

export type workerDataType = {
  Name: string;
  Status: string;
  WNumber: string;
  WorkerID: string;
};

export type allMergedData = {
  cust: customerDataType[];
  main: MainOrderType[];
  worker: workerDataType[];
};

export type scale = 'gm' | 'kg';

export interface MainOrderType extends orderList {
  customerName: string;
}

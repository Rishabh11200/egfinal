import React, {useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {rootStackParams} from './navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppDispatch} from './store/hooks';
import {loggingIn, UserState} from './reducer';

type HomeProps = NativeStackScreenProps<rootStackParams, 'Home'>;
const Home = (props: HomeProps) => {
  const [numbers, setNumbers] = useState<string[]>();
  const [loginNum, setLoginNum] = useState<string>('');
  const [confirmation, setConfirmation] = useState<null | any>();
  const [code, setCode] = useState<string>();
  const dispatch = useAppDispatch();
  const abc = async () => {
    let ab = await firestore().collection('admin').get();
    ab.docs.map(da => setNumbers(da.data().numbers));
  };
  const send = async () => {
    if (numbers && numbers.includes(loginNum)) {
      console.log('send otp');
      try {
        const confirmation = await auth()
          .signInWithPhoneNumber(`+91${loginNum}`)
          .catch(err => console.log(err));
        console.log(confirmation);
        setConfirmation(confirmation);
      } catch (error) {
        console.log('[confirmation]', error);
      }
    }
  };
  async function confirmCode() {
    try {
      await confirmation.confirm(code);
      const use: FirebaseAuthTypes.User | null = auth().currentUser;

      let obj: UserState = {
        user: {
          phoneNumber: use?.phoneNumber as string,
          uid: use?.uid as string,
        },
        isLoggedIn: true,
      };
      dispatch(loggingIn(obj));
      console.log('[confirmation]Response = ', use);
    } catch (error) {
      console.log('Invalid code.');
    }
  }
  React.useEffect(() => {
    abc();
  }, []);
  return (
    <View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>Hey</Text>
          <TextInput
            keyboardType="number-pad"
            value={loginNum}
            onChangeText={setLoginNum}
          />
          <Button title="Submit" onPress={send} />
          {confirmation ? (
            <>
              <TextInput
                keyboardType="number-pad"
                value={code}
                onChangeText={setCode}
              />
              <Button title="Submit" onPress={confirmCode} />
            </>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});

import {StyleSheet} from 'react-native';
import {color} from '../../constants/color';

export default StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    marginTop: 30,
  },
  inputContainer: {
    borderColor: color.gray,
    backgroundColor: color.white,
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
    width: '80%',
    marginBottom: 20,
    flexDirection: 'row',
  },
  inputContainerWithDropDown: {
    borderColor: color.gray,
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
    alignItems: 'center',
    backgroundColor: color.white,
    flex: 0.7,
    marginBottom: 20,
    flexDirection: 'row',
  },
  inputs: {
    height: 45,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 20,
    overflow: 'visible',
    borderBottomColor: color.white,
    flex: 1,
  },
  buttonContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 200,
    borderRadius: 30,
  },
  sendButton: {
    backgroundColor: color.black,
  },
  buttonText: {
    color: color.white,
    fontSize: 18,
  },
  orderText: {
    fontWeight: 'bold',
    color: color.black,
    fontSize: 19,
    marginBottom: 20,
  },
  dropdownContainer: {
    height: 50,
    borderColor: color.gray,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  dropDownLabel: {
    position: 'absolute',
    backgroundColor: color.white,
    color: color.black,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  dropDownPlaceholderStyle: {
    fontSize: 16,
    color: color.black,
  },
  dropDownSelectedTextStyle: {
    fontSize: 19,
    color: color.black,
  },
  dropDownInputSearchStyle: {
    height: 40,
    fontSize: 20,
    color: color.black,
  },
  dropDownList: {
    margin: 10,
    justifyContent: 'center',
  },
  dropDownScale: {
    height: 50,
    marginStart: 10,
    borderRadius: 10,
    padding: 4,
  },
});

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// enable xhr log
XMLHttpRequest = globalThis.originalXMLHttpRequest
  ? globalThis.originalXMLHttpRequest
  : globalThis.XMLHttpRequest;

AppRegistry.registerComponent(appName, () => App);


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import { ApplicationInsights } from '@microsoft/applicationinsights-web';

import { ReactNativeManualDevicePlugin } from '@microsoft/applicationinsights-react-native/dist-esm/manualIndex'; // for android
//import { ReactNativeManualDevicePlugin } from '@microsoft/applicationinsights-react-native/manual'; // for web

// call this from a separate file --could be named analytics.tx and export appinsights.
var RNPlugin = new ReactNativeManualDevicePlugin();

// let keep this hidden.
var appInsights = new ApplicationInsights({
  config: {
    disableDeviceCollection: true,
    instrumentationKey: '8b1a5005-c48c-4301-8212-f086e79d288',
    extensions: [RNPlugin]
  }
});
appInsights.loadAppInsights();
appInsights.trackPageView({ name: "Landing Page" });
appInsights.trackEvent({ name: 'some event' });
appInsights.trackMetric("loadtime", 1500); // in milliseconds
console.log("current app", appInsights.context);

export default function App() {

  const processAnalytics = () => {
    try {
      appInsights.trackEvent({ name: 'Custom Event', properties: { customProperty: 'customValue' } });
      console.log("current app2", appInsights.context);
    } catch (error) {
      // implement this to capture errors on vital logics
      appInsights.trackException(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Done to implement analytics tracking!</Text>
      <Button title='Fire Analytics' onPress={() => { processAnalytics() }} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  LoginScreen,
  TodayScreen,
  RegistrationScreen,
  WeekScreen,
  MonthScreen,
  YearScreen,
  UserScreen,
} from './src/screens';
import { firebase } from './src/firebase/config';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    // returns currently logged in user
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <SafeAreaProvider>
        <View>
          <Text>Loading...</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {user ? (
          <Stack.Navigator>
            <Tab.Navigator
              tabBarOptions={{
                labelStyle: { fontSize: 12 },
                tabStyle: { width: 100 },
                style: { backgroundColor: 'powderblue' },
              }}
            >
              <Tab.Screen name="Today">
                {(props) => <TodayScreen {...props} extraData={user} />}
              </Tab.Screen>
              <Tab.Screen name="Week" component={WeekScreen} />
              <Tab.Screen name="Month" component={MonthScreen} />
              <Tab.Screen name="Year" component={YearScreen} />
              <Tab.Screen name="User" component={UserScreen} />
            </Tab.Navigator>
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

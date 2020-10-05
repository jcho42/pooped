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
  Icon,
  AddData,
} from './src/screens';
import { firebase } from './src/firebase/config';
import { Text, View, Button, LogBox } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// LogBox.ignoreAllLogs()

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
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Pooped"
              options={({navigation}) => ({
                headerLeft: () => <Icon />,
                headerTitleAlign: 'left',
                headerRight: () => (
                  <Button
                    onPress={() => navigation.navigate('AddData', {user})}
                    title="Add Data"
                    color="#000"
                  />
                ),
              })}
            >
              {() => (
                <Tab.Navigator
                  tabBarOptions={{
                    labelStyle: { fontSize: 12 },
                    tabStyle: { width: 75 },
                    style: { backgroundColor: 'powderblue' },
                  }}
                >
                  <Tab.Screen name="Today">
                    {props => <TodayScreen {...props} user={user} />}
                  </Tab.Screen>
                  <Tab.Screen name="Week">
                    {props => <WeekScreen {...props} user={user} />}
                  </Tab.Screen>
                  <Tab.Screen name="Month">
                    {props => <MonthScreen {...props} user={user} />}
                  </Tab.Screen>
                  <Tab.Screen name="Year">
                    {props => <YearScreen {...props} user={user} />}
                  </Tab.Screen>
                  <Tab.Screen name="User">
                    {props => <UserScreen {...props} user={user} />}
                  </Tab.Screen>
                </Tab.Navigator>
              )}
            </Stack.Screen>
            <Stack.Screen name="AddData" component={AddData} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

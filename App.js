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
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TabView } from 'react-native-tab-view';

LogBox.ignoreLogs([
  'Setting a timer',
  'VirtualizedLists should never be nested',
]);

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'today', title: 'Today' },
    { key: 'week', title: 'Week' },
    { key: 'month', title: 'Month' },
    { key: 'year', title: 'Year' },
    { key: 'user', title: 'User' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'today':
        return <TodayScreen user={user} />;
      case 'week':
        return <WeekScreen user={user} />;
      case 'month':
        return <MonthScreen user={user} />;
      case 'year':
        return <YearScreen user={user} />;
      case 'user':
        return <UserScreen user={user} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    // returns currently logged in user
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        try {
          const document = await usersRef.doc(user.uid).get();
          const userData = document.data();
          setUser(userData);
        } catch (error) {
          console.error(error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <SafeAreaProvider>
        <Icon
          viewStyles={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          iconStyles={{
            width: 200,
            height: 200,
          }}
        />
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
              options={({ navigation }) => ({
                headerLeft: () => (
                  <Icon
                    iconStyles={{
                      width: 50,
                      height: 50,
                      marginLeft: 15,
                    }}
                  />
                ),
                headerTitleAlign: 'left',
                headerRight: () => (
                  <Button
                    onPress={() => navigation.navigate('AddData', { user })}
                    title="New Entry"
                    color="#421C14"
                  />
                ),
                headerRightContainerStyle: {
                  marginRight: 8,
                },
              })}
            >
              {() => (
                <TabView
                  navigationState={{ index, routes }}
                  renderScene={renderScene}
                  onIndexChange={setIndex}
                  lazy
                />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="AddData"
              component={AddData}
              options={() => ({
                title: 'New Entry',
              })}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login">
              {() => <LoginScreen resetIdx={setIndex} />}
            </Stack.Screen>
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

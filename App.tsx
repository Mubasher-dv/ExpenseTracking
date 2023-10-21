import React from 'react';
import {
  StatusBar
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AllExpenses from './screens/AllExpenses';
import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import { GlobalStyles } from './constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import IconButton from './components/UI/IconButton';

import { ExpensesContextProvider } from './store/expenses-context'


const BottomTab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();


function ExpenseOverviewBottomNavigation() {
  return (
    <BottomTab.Navigator screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({ tintColor }) => (
        <IconButton
          icon='add'
          size={24}
          color={tintColor}
          onpress={() => {
            navigation.navigate('ManageExpense')
          }}
        />
      )
    })}>
      <BottomTab.Screen name='RecentExpenses' component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="hourglass-outline" size={size} color={color} />;
          }
        }} />
      <BottomTab.Screen name='AllExpenses' component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => {
            return <Icon name='calendar-outline' size={size} color={color} />
          }
        }}
      />
    </BottomTab.Navigator>
  )
}


function App() {

  return (
    <>
      <StatusBar />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: 'white',

          }}>
            <Stack.Screen name='ExpensesOverview' component={ExpenseOverviewBottomNavigation} options={{
              headerShown: false
            }} />
            <Stack.Screen name='ManageExpense' component={ManageExpenses} options={{
              presentation: 'modal'
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}


export default App;

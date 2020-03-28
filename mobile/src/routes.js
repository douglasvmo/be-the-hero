import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Incidents from './pages/Incidents';
import Details from './pages/Details';

const AppStack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name='INCIDENTES' component={Incidents} />
        <AppStack.Screen name='DETAILS' component={Details} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
export default Routes;

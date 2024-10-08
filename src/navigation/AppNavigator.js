
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Users from '../Screen/User'
import AddUser from '../Screen/Adduser'




const Stack=createNativeStackNavigator()
const AppNavigator = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name='Users' component={Users} />
        <Stack.Screen name='AddUser' component={AddUser} />
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default AppNavigator
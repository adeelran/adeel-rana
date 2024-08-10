
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import Users from '../contacts/User'
import AddUser from '../contacts/Contact'
import PersonDetail from '../contacts/PersonDetail'




const Stack=createNativeStackNavigator()
const AppNavigator = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name='Users' component={Users} 
    options={{
      headerTitle:"Contacts",
     
    }}
    />
        <Stack.Screen name='AddUser' component={AddUser}
        options={{
          headerTitle:"Add"
        }}
        />
         <Stack.Screen name='PersonDetail' component={PersonDetail} />
       
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default AppNavigator
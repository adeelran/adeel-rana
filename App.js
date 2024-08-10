
import React from 'react'
import { Provider } from 'react-redux'
import Store from './contact App/Reduxs/Store'
import AppNavigator from './contact App/Navigations/AppNavigation'
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/integration/react'
let persistor=persistStore(Store)
const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor} >
      <AppNavigator/>
      
      </PersistGate>
  
   </Provider>
  )
}

export default App



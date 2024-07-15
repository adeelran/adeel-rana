import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../redux/counterSlice';


const Rana = () => {
    const data = useSelector((val)=>val.app.value);
    const dispatch=useDispatch()
    console.log(data)
  return (
    <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
      <Text>{data} </Text>
      <View style={{flexDirection:"row",justifyContent:"space-between",width:"60%"}}>
        <TouchableOpacity onPress={()=>dispatch(decrement())}>
            <Text>decrement</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>dispatch(increment())}>
            <Text>increment</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Rana
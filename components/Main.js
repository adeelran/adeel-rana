import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { decrement, increment } from '../redux/counterSlice';

const Main = () => {
  const data = useSelector(val => val.app.value);
  const dispatch=useDispatch()
 
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize:60,margin:40}}>{data}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '60%',
        }}>
        <TouchableOpacity onPress={()=>dispatch(decrement())}>
          <Text
            style={{
              backgroundColor: 'black',
              color: 'white',
              padding: 10,
              borderTopLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            decrement
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>dispatch(increment())}>
          <Text  style={{
              backgroundColor: 'black',
              color: 'white',
              padding: 10,
              borderTopLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}>increment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({});

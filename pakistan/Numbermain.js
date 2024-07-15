import {View, Text, TouchableOpacity, Button,} from 'react-native';
import React,{useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {decrement, increment} from './CounterSlice';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';
const Numbermain = () => {
  const data = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  const viewShotRef = useRef();
  const shareContent =  async() => {
    try {
      const uri = await viewShotRef.current.capture();
      const shareOptions = {
        title: 'Check out this video',
        message: 'Here is an interesting pic rana adeel',
        url:uri,
        type: 'image/png',
       // url: 'https://www.youtube.com/watch?v=TGTNBxbFHRY',
        
      };
       Share.open(shareOptions);
    } catch (err) {
      if (err) console.log(err);
    }
  };
  return (
    <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.9 }} style={{ flex: 1,backgroundColor:"white" }}>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{margin: 40}}>{data} </Text>
      <View
        style={{
          flexDirection: 'row',
          width: '60%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => dispatch(decrement())}>
          <Text
            style={{
              backgroundColor: 'black',
              color: 'white',
              padding: 15,
              borderTopLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            {' '}
            decrement
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(increment())}>
          <Text
            style={{
              backgroundColor: 'black',
              color: 'white',
              padding: 15,
              borderTopLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            increment
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{margin: 30}}>
        <Button title="share" onPress={shareContent} />
      </View>
    </View>
    </ViewShot>
  );
};

export default Numbermain;

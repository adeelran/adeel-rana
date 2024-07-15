import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './todoSlice';
import { decrement, increment } from './counterSlice';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';

const Numbermain = () => {
  const [text, setText] = useState('');
  const todos = useSelector(state => state.todo.items);
  const counter = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  const viewShotRef = useRef();

  const shareContent = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const shareOptions = {
        title: 'Check out this screenshot',
        message: 'Here is the current state of my to-do list and counter',
        url: uri,
        type: 'image/png',
      };
      Share.open(shareOptions);
    } catch (err) {
      if (err) console.log(err);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
      <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>{item.text}</Text>
      <TouchableOpacity onPress={() => dispatch(toggleTodo(item.id))}>
        <Text style={{ color: 'blue' }}>{item.completed ? 'Undo' : 'Complete'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(deleteTodo(item.id))}>
        <Text style={{ color: 'red' }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.9 }} style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ margin: 20 }}>Counter: {counter}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginBottom: 20 }}>
          <TouchableOpacity onPress={() => dispatch(decrement())}>
            <Text style={{ backgroundColor: 'black', color: 'white', padding: 10, borderRadius: 5 }}>Decrement</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(increment())}>
            <Text style={{ backgroundColor: 'black', color: 'white', padding: 10, borderRadius: 5 }}>Increment</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={{ borderWidth: 1, padding: 10, width: '80%', marginBottom: 20 }}
          value={text}
          onChangeText={setText}
          placeholder="Add a new to-do"
        />
        <TouchableOpacity onPress={() => {
          if (text) {
            dispatch(addTodo(text));
            setText('');
          }
        }}>
          <Text style={{ backgroundColor: 'blue', color: 'white', padding: 10, borderRadius: 5 }}>Add To-Do</Text>
        </TouchableOpacity>

        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          style={{ marginTop: 20, width: '80%' }}
        />

        <View style={{ margin: 30 }}>
          <Button title="Share" onPress={shareContent} />
        </View>
      </View>
    </ViewShot>
  );
};

export default Numbermain;

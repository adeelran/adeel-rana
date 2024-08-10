import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addUser, updateUser } from '../Reduxs/UserSlice';
import Icon from 'react-native-vector-icons/AntDesign';

const AddUser = () => {
  const route = useRoute();
  const { type, data } = route.params || {};
  const [name, setName] = useState(type === "edit" ? data.name : '');
  const [surname, setSurname] = useState(type === "edit" ? data.surname : '');
  const [mobile, setMobile] = useState(type === "edit" ? data.mobile : '');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const validate = () => {
    if (name === '' || surname === '' || mobile === '') {
      return false;
    }
    return true;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            if (validate()) {
              if (type === 'edit') {
                dispatch(updateUser({
                  id: data.id,
                  name,
                  surname,
                  mobile,
                }));
              } else {
                dispatch(addUser({ name, surname, mobile }));
              }
              navigation.navigate('Users');
            } else {
              Alert.alert('Please fill all data');
            }
          }}
          style={{
            padding: 15,
            borderRadius: 10,
            alignItems: 'flex-end',
          }}
        >
          <View style={{ marginBottom: -25 }}>
            <Icon name="check" size={25} color="gray" />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, name, surname, mobile]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ marginTop: 40 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Name</Text>
        <TextInput
          placeholder="Enter Name"
          value={name}
          onChangeText={txt => setName(txt)}
          style={{
            width: '100%',
            height: 50,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            paddingLeft: 10,
            marginTop: 5,
          }}
        />
      </View>
      <View style={{ marginTop: 40 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Surname</Text>
        <TextInput
          placeholder="Enter Surname"
          value={surname}
          onChangeText={txt => setSurname(txt)}
          style={{
            width: '100%',
            height: 50,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            paddingLeft: 10,
            marginTop: 5,
          }}
        />
      </View>
      <View style={{ marginTop: 40 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Phone number</Text>
        <TextInput
          placeholder="Mobile number"
          value={mobile}
          onChangeText={txt => setMobile(txt)}
          style={{
            width: '100%',
            height: 50,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            paddingLeft: 10,
            marginTop: 5,
          }}
          keyboardType="number-pad"
          maxLength={11}
        />
      </View>
    </View>
  );
};

export default AddUser;

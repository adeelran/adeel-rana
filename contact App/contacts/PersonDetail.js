import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteUser} from '../Reduxs/UserSlice';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const PersonDetail = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const {user} = route.params || {};
  console.log(user);

  const handleDelete = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this contact?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', onPress: () => {
        dispatch(deleteUser(user.id));
        navigation.navigate("Users");
      }},
    ]);
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View>
          <View>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  marginTop: 20,
                  marginLeft: 70
                }}>
                <FontAwesome6
                  name="circle-user"
                  size={100}
                  color="white"
                  style={{backgroundColor: '#7b7b7b', borderRadius: 60}}
                />
              </View>
              <View style={{marginTop: 80, flexDirection: 'row'}}>
                <TouchableOpacity onPress={handleDelete} style={{marginRight: 30}}>
                  <AntDesign name="delete" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AddUser', {type: 'edit', data: user})}>
                  <FontAwesome name="pencil" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flexDirection: 'row', margin: 'auto', marginVertical: 20}}>
              <Text style={{marginRight: 10, fontSize: 30, fontWeight: 'bold'}}>{user.name}</Text>
              <Text style={{fontSize: 30, fontWeight: 'bold'}}>{user.surname}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 20, marginRight: 60}}>{user.mobile}</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: 50, height: 50, borderRadius: 25, backgroundColor: '#08ae2d', justifyContent: 'center', alignItems: 'center'}}>
                  <Feather name="phone" size={20} color="white" />
                </View>
                <View style={{width: 50, height: 50, borderRadius: 25, backgroundColor: '#e9ad13', justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                  <FontAwesome6 name="message" size={20} color="white" />
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <Text style={styles.noUserText}>No user details available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'blue',
    color: 'white',
    backgroundColor: 'blue',
    marginRight: 5,
  },
  deleteButton: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'red',
    color: 'white',
    backgroundColor: 'red',
  },
  noUserText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
});

export default PersonDetail;

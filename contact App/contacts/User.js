import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, deleteAllUsers } from '../Reduxs/UserSlice';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Users = (props) => {
  const navigation = useNavigation();
  const users = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [menuVisible, setMenuVisible] = useState(false); // Manage menu visibility
  const [sortVisible, setSortVisible] = useState(false); // Manage sort options visibility
  const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () =>
        searchVisible ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '92%' }}>
            <TouchableOpacity onPress={() => {
              setSearchVisible(false);
              setSearchText('');
            }}>
              <Ionicons name="chevron-back" size={25} color="gray" style={{ marginRight: 5 }} />
            </TouchableOpacity>
            <View style={{ flex: 1, position: 'relative' }}>
              <TextInput
                placeholder="Search..."
                value={searchText}
                onChangeText={setSearchText}
                style={{
                  height: 40,
                  borderColor: 'gray',
                  paddingLeft: 10,
                  paddingRight: 40,
                  fontSize: 18
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setSearchVisible(false);
                  setSearchText('');
                }}
                style={{
                  position: 'absolute',
                  right: 5,
                  top: 5,
                }}
              >
                <AntDesign name="close" size={25} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text style={{ fontSize: 20 }}>Contacts</Text>
        ),
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
          <TouchableOpacity onPress={() => {
              setSearchVisible(!searchVisible);
              setMenuVisible(false);
              setSortVisible(false); // Hide sort options when search is toggled
            }} 
            style={{ marginRight: 15 }}>
            {searchVisible ? null : (
              <FontAwesome name="search" size={20} color="#7f7f7f" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setMenuVisible(!menuVisible); // Toggle menu visibility
              setSortVisible(false); // Hide sort options when menu is toggled
            }}
          >
            <Entypo name="dots-three-vertical" size={20} color="#7f7f7f" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, searchVisible, searchText, menuVisible]);

  const handleDeleteAll = () => {
    Alert.alert(
      "Delete All",
      "Are you sure you want to delete all contacts?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => dispatch(deleteAllUsers()) }
      ]
    );
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setSortVisible(false); // Hide sort options after selecting an option
  };

  const sortedUsers = [...users.data].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === 'desc') {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter(user =>
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.surname.toLowerCase().includes(searchText.toLowerCase()) ||
    user.mobile.includes(searchText)
  );

  return (
    <TouchableWithoutFeedback onPress={() => {
      if (menuVisible || sortVisible) {
        setMenuVisible(false);
        setSortVisible(false);
      }
    }}>
      <View style={{ flex: 1 }}>
        {menuVisible && (
          <View style={{ padding: 5, position: 'absolute',zIndex:1, top: 1, right: 35, borderWidth: 1, borderRadius: 5, backgroundColor: 'white' }}>
            <TouchableOpacity
              onPress={() => setSortVisible(!sortVisible)} // Toggle sort options visibility
              style={{ padding: 5 }}>
              <Text>Sort by</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDeleteAll}
              style={{ padding: 5 }}>
              <Text>Delete All</Text>
            </TouchableOpacity>
          </View>
        )}

        {sortVisible && (
          <View style={{ padding: 5, position: 'absolute',zIndex:2, top: 20, right: 118, borderWidth: 1, borderRadius: 5, backgroundColor: 'white' }}>
            <TouchableOpacity
              onPress={() => handleSort('asc')}
              style={{ padding: 5 }}>
              <Text>A-Z</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleSort('desc')}
              style={{ padding: 5 }}>
              <Text>Z-A</Text>
            </TouchableOpacity>
          </View>
        )}

        {users.data.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <SimpleLineIcons name="social-dropbox" size={120} color="#7f7f7f" />
            <Text style={{ fontSize: 20 }}>You have no contacts yet</Text>
          </View>
        ) : (
          <FlatList
            data={filteredUsers}
            renderItem={({ item, index }) => (
              <View
                style={{
                  width: '90%',
                  padding: 10,
                  alignSelf: 'center',
                  marginTop: 20,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}
              >
                
                <TouchableOpacity onPress={()=> props.navigation.navigate("PersonDetail",{user:item})}>
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={{
                        backgroundColor: '#7b7b7b',
                        borderRadius: 60,
                        margin: 5,
                        marginRight: 20,
                      }}
                    >
                      <FontAwesome6 name="circle-user" size={50} color="white" />
                    </View>
                    <View style={{ width: '60%' }}>
                      <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={{ paddingRight: 10 }}>{item.name}</Text>
                        <Text>{item.surname}</Text>
                        
                      </View>
                      
                      <Text>{item.mobile}</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <FontAwesome name="phone" size={40} color="#08ae2d" />
                    </View>
                  </View>
                </TouchableOpacity>
                
              
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}

        <TouchableOpacity
          activeOpacity={1}
          style={{
            position: 'absolute',
            bottom: 50,
            right: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00b2ff',
            borderRadius: 50,
          }}
          onPress={() => {
            navigation.navigate('AddUser',{type:"add"});
          }}
        >
          <Icon name="pluscircleo" size={50} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute", top: 10, right: 60
  },
  menuContainer: {
    width: 120,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
  },
  menuItem: {
    padding: 5,
    fontSize: 18,
    width: '100%',
    textAlign: 'center',
  },
});

export default Users;

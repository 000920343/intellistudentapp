import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentDashboard = ({ route, navigation }) => {
  const { email } = route.params || {}; // Safely access route.params
  const userName = email ? email.split('@')[0] : 'Student'; // Fallback to 'Student' if email is missing
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch listings from AsyncStorage
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const storedListings = JSON.parse(await AsyncStorage.getItem('houseListings')) || [];
        setListings(storedListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };
    fetchListings();
  }, []);

  // Handle logout
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => navigation.navigate('Login'),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>IntelliStudent</Text>
          <Text style={styles.greeting}>Welcome, {userName}!</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="sign-out" size={24} color="#EAEBEB" />
        </TouchableOpacity>
      </View>

      {/* Dashboard Options in Grid */}
      <ScrollView contentContainerStyle={styles.gridContainer}>
        <TouchableOpacity style={styles.gridItem}>
          <Icon name="dollar" size={40} color="#2C3E50" />
          <Text style={styles.gridText}>Financial Management</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => navigation.navigate('HousingListingsScreen')}
        >
          <Icon name="home" size={40} color="#2C3E50" />
          <Text style={styles.gridText}>Housing Assistance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem}>
          <Icon name="file" size={40} color="#2C3E50" />
          <Text style={styles.gridText}>Document Tracking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem}>
          <Icon name="graduation-cap" size={40} color="#2C3E50" />
          <Text style={styles.gridText}>Academic Assistance</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 36,
    color: '#EAEBEB',
    fontFamily: 'Jacquard24',
  },
  greeting: {
    fontSize: 16,
    color: '#EAEBEB',
    marginTop: 5,
  },
  logoutButton: {
    padding: 10,
  },
  gridContainer: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  gridItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAEBEB',
    borderRadius: 15,
    width: '45%',
    height: 150,
    marginBottom: 20,
    padding: 15,
  },
  gridText: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default StudentDashboard;

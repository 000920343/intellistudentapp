import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CivilianDashboard = ({ route, navigation }) => {
  const { email } = route.params || { email: 'civilian@example.com' };
  const userName = email.split('@')[0]; // Extract the name before '@'

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => navigation.navigate('Login'),
      },
    ]);
  };

  const handleAddHouseListing = () => {
    navigation.navigate('AddListingScreen'); // Navigate to AddListingScreen
  };

  const handleManageHouseListing = () => {
    navigation.navigate('ManageHouseListingScreen'); // Navigate to ManageHouseListingScreen
  };

  const handleEditListing = () => {
    navigation.navigate('EditListingScreen'); // Navigate to EditListingScreen
  };

  const handleChatPage = () => {
    navigation.navigate('ChatScreen', { email }); // Navigate to ChatScreen with civilian's email
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>IntelliStudent</Text>
        <Text style={styles.greeting}>Welcome, {userName}!</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="sign-out" size={24} color="#EAEBEB" />
        </TouchableOpacity>
      </View>

      {/* Dashboard Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={handleAddHouseListing}>
          <Text style={styles.optionText}>Add House Listing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={handleManageHouseListing}>
          <Text style={styles.optionText}>Manage House Listing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={handleEditListing}>
          <Text style={styles.optionText}>Edit Listing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Sell Items</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Manage Items</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={handleChatPage}>
          <Text style={styles.optionText}>Chat Page</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutMainButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center', // Center-align the header
  },
  title: {
    fontSize: 32,
    color: '#EAEBEB',
    fontFamily: 'Jacquard24',
    textAlign: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#EAEBEB',
    marginTop: 5,
    textAlign: 'center',
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  optionButton: {
    backgroundColor: '#EAEBEB',
    borderRadius: 25,
    paddingVertical: 15,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  optionText: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: 'bold',
  },
  logoutMainButton: {
    backgroundColor: '#D9534F',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 20,
  },
  logoutText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default CivilianDashboard;

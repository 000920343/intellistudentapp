import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CivilianSignupScreen = ({ navigation }) => {
  // State variables for input fields
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');

  // Handle social media click
  const handleSocialClick = (url) => {
    Linking.openURL(url);
  };

  // Save the civilian data
  const handleSignup = async () => {
    if (!fullName || !address || !email || !contactNumber || !password) {
      Alert.alert('Error', 'Please fill all the fields!');
      return;
    }

    try {
      // Get existing civilians
      const existingCivilians = JSON.parse(await AsyncStorage.getItem('civilians')) || [];

      // Add the new civilian
      const newCivilian = { fullName, address, email, contactNumber, password };
      existingCivilians.push(newCivilian);

      // Save updated civilians to AsyncStorage
      await AsyncStorage.setItem('civilians', JSON.stringify(existingCivilians));

      Alert.alert('Success', 'Civilian account created successfully!');
      navigation.navigate('Login'); // Redirect to login screen
    } catch (error) {
      console.error('Error saving civilian data:', error);
      Alert.alert('Error', 'Failed to save civilian data.');
    }
  };

  return (
    <View style={styles.container}>
      {/* App Title */}
      <Text style={styles.appTitle}>IntelliStudent</Text>

      {/* Signup Heading */}
      <Text style={styles.heading}>Civilian Account</Text>

      {/* Signup Form */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#9CA3AF"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          placeholderTextColor="#9CA3AF"
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your contact number"
          keyboardType="phone-pad"
          placeholderTextColor="#9CA3AF"
          value={contactNumber}
          onChangeText={setContactNumber}
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            secureTextEntry
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
          />
          <Icon name="eye" size={20} color="#2C3E50" style={styles.eyeIcon} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign-Up</Text>
        </TouchableOpacity>
      </View>

      {/* Social Media and Footer */}
      <View style={styles.socialContainer}>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => handleSocialClick('https://facebook.com')}>
            <Icon name="facebook" size={22} color="#EAEBEB" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSocialClick('https://instagram.com')}>
            <Icon name="instagram" size={22} color="#EAEBEB" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSocialClick('https://twitter.com')}>
            <Icon name="twitter" size={22} color="#EAEBEB" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.socialText}>© 2024 IntelliStudent. All rights reserved</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  appTitle: {
    fontSize: 36,
    color: '#EAEBEB',
    fontFamily: 'Jacquard24',
    textAlign: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    color: '#EAEBEB',
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#EAEBEB',
    borderRadius: 15,
    paddingVertical: 30,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#2C3E50',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
  },
  eyeIcon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#2C3E50',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#EAEBEB',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialContainer: {
    alignItems: 'center',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    marginBottom: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  socialText: {
    color: '#EAEBEB',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default CivilianSignupScreen;

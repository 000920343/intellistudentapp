import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSocialClick = (url) => {
    Linking.openURL(url);
  };

  const handleLogin = async () => {
    try {
      // Fetch both students and civilians from AsyncStorage
      const storedStudents = JSON.parse(await AsyncStorage.getItem('students')) || [];
      const storedCivilians = JSON.parse(await AsyncStorage.getItem('civilians')) || [];

      // Check if the entered credentials match any stored student
      const matchedStudent = storedStudents.find(
        (student) => student.email === email && student.password === password
      );

      if (matchedStudent) {
        Alert.alert('Success', `Welcome, ${matchedStudent.fullName}!`);
        navigation.navigate('StudentDashboard', { email: matchedStudent.email });
        return;
      }

      // Check if the entered credentials match any stored civilian
      const matchedCivilian = storedCivilians.find(
        (civilian) => civilian.email === email && civilian.password === password
      );

      if (matchedCivilian) {
        Alert.alert('Success', `Welcome, ${matchedCivilian.fullName}!`);
        navigation.navigate('CivilianDashboard', { email: matchedCivilian.email });
        return;
      }

      // If no match is found, show error
      Alert.alert('Error', 'Invalid email or password. Please try again.');
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error', 'Failed to authenticate. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* App Title */}
      <Text style={styles.appTitle}>IntelliStudent</Text>

      {/* Login Form */}
      <View style={styles.formContainer}>
        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Icon name="envelope" size={18} color="#2C3E50" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Icon name="key" size={18} color="#2C3E50" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
          />
          <Icon name="eye" size={18} color="#2C3E50" style={styles.inputIconRight} />
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Links */}
      <TouchableOpacity onPress={() => navigation.navigate('SignupSelection')}>
        <Text style={styles.link}>New User? Sign Up!</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Social Media Links */}
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
    backgroundColor: '#2C3E50', // Navy background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  appTitle: {
    fontSize: 36,
    color: '#EAEBEB',
    fontFamily: 'Jacquard24', // Custom font
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#EAEBEB',
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    height: 50,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputIconRight: {
    position: 'absolute',
    right: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
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
  link: {
    color: '#EAEBEB',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  socialContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    marginBottom: 10,
  },
  socialText: {
    color: '#EAEBEB',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default LoginScreen;

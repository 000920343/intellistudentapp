import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentSignupScreen = ({ navigation }) => {
  // State variables for input fields
  const [fullName, setFullName] = useState('');
  const [college, setCollege] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle social media clicks
  const handleSocialClick = (url) => {
    Linking.openURL(url);
  };

  // Save the student data
  const handleSignup = async () => {
    if (!fullName || !college || !email || !password) {
      Alert.alert('Error', 'Please fill all the fields!');
      return;
    }

    try {
      // Get existing students
      const existingStudents = JSON.parse(await AsyncStorage.getItem('students')) || [];

      // Add the new student
      const newStudent = { fullName, college, email, password };
      existingStudents.push(newStudent);

      // Save updated students to AsyncStorage
      await AsyncStorage.setItem('students', JSON.stringify(existingStudents));

      Alert.alert('Success', 'Student account created successfully!');
      navigation.navigate('Login'); // Redirect to login
    } catch (error) {
      console.error('Error saving student data:', error);
      Alert.alert('Error', 'Failed to save student data.');
    }
  };

  return (
    <View style={styles.container}>
      {/* App Title */}
      <Text style={styles.appTitle}>IntelliStudent</Text>

      {/* Signup Heading */}
      <Text style={styles.heading}>Student Account</Text>

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
        <Text style={styles.label}>College/University</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your college/university"
          placeholderTextColor="#9CA3AF"
          value={college}
          onChangeText={setCollege}
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

export default StudentSignupScreen;

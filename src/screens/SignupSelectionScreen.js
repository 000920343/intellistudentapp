import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignupSelectionScreen = ({ navigation }) => {
  const handleSocialClick = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {/* App Title */}
      <Text style={styles.appTitle}>IntelliStudent</Text>

      {/* Signup Heading */}
      <Text style={styles.heading}>Sign Up</Text>

      {/* Signup Options */}
      <View style={styles.optionsContainer}>
        {/* Student Account Button */}
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('StudentSignup')}
        >
          <View style={styles.iconContainer}>
            <Icon name="user" size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.optionText}>Student Account</Text>
        </TouchableOpacity>

        {/* OR Text */}
        <Text style={styles.orText}>OR</Text>

        {/* Civilian Account Button */}
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('CivilianSignup')}
        >
          <View style={styles.iconContainer}>
            <Icon name="user" size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.optionText}>Civilian Account</Text>
        </TouchableOpacity>
      </View>

      {/* Social Media Links and Footer */}
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
  optionsContainer: {
    width: '90%',
    backgroundColor: '#EAEBEB',
    borderRadius: 15,
    paddingVertical: 30,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    alignItems: 'center',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C3E50',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 15,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#2C3E50',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  optionText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  orText: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '600',
    marginVertical: 10,
  },
  socialContainer: {
    marginTop: 30,
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
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SignupSelectionScreen;

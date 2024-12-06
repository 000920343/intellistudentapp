import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddListingScreen = ({ navigation, route }) => {
  const { email } = route.params || {}; // Get the owner's email from the navigation params
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [rent, setRent] = useState('');
  const [rooms, setRooms] = useState('');
  const [contact, setContact] = useState('');

  // Request camera and media library permissions
  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
      Alert.alert('Permissions Required', 'Camera and Media Library access are required.');
      return false;
    }

    return true;
  };

  // Pick image from gallery
  const handleImagePick = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Capture image from camera
  const handleImageCapture = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Add listing logic
  const handleAddListing = async () => {
    if (!title || !description || !address || !rent || !rooms || !contact) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      const newListing = {
        id: Date.now(), // Unique identifier
        image,
        title,
        description,
        address,
        rent: parseFloat(rent),
        rooms: parseInt(rooms, 10),
        contact,
        owner: email || 'Unknown', // Include the owner's email or fallback to "Unknown"
      };

      // Fetch existing listings
      const storedListings = JSON.parse(await AsyncStorage.getItem('houseListings')) || [];
      storedListings.push(newListing); // Add new listing
      await AsyncStorage.setItem('houseListings', JSON.stringify(storedListings)); // Save updated listings

      Alert.alert('Success', 'Listing added successfully!');
      navigation.navigate('ManageHouseListingScreen'); // Navigate to manage listing
    } catch (error) {
      console.error('Error saving listing:', error);
      Alert.alert('Error', 'Failed to save listing.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#EAEBEB" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add New Listing</Text>
      </View>

      {/* Image Picker */}
      <TouchableOpacity
        style={styles.imagePicker}
        onPress={handleImagePick}
        onLongPress={handleImageCapture}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Icon name="camera" size={50} color="#9CA3AF" />
        )}
      </TouchableOpacity>

      {/* Form */}
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#9CA3AF"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        placeholderTextColor="#9CA3AF"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#9CA3AF"
        value={address}
        onChangeText={setAddress}
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Rent"
          placeholderTextColor="#9CA3AF"
          value={rent}
          onChangeText={setRent}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Rooms"
          placeholderTextColor="#9CA3AF"
          value={rooms}
          onChangeText={setRooms}
          keyboardType="numeric"
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        placeholderTextColor="#9CA3AF"
        value={contact}
        onChangeText={setContact}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddListing}>
        <Text style={styles.buttonText}>Add Listing</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: '#EAEBEB',
    fontWeight: '600',
    marginLeft: 10,
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAEBEB',
    borderRadius: 15,
    height: 150,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  input: {
    backgroundColor: '#EAEBEB',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 15,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AddListingScreen;

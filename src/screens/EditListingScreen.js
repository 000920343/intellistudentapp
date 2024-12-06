import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditListingScreen = ({ route, navigation }) => {
  const { listing } = route.params || { listing: {} };

  const [title, setTitle] = useState(listing.title || '');
  const [description, setDescription] = useState(listing.description || '');
  const [rent, setRent] = useState(listing.rent ? listing.rent.toString() : '');
  const [status, setStatus] = useState(listing.status || 'On Sale');

  useEffect(() => {
    console.log('Editing listing:', listing);
  }, [listing]);

  const handleSave = async () => {
    if (!title || !description || !rent || !status) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (parseFloat(rent) <= 0) {
      Alert.alert('Error', 'Rent must be a positive value.');
      return;
    }

    try {
      const storedListings = JSON.parse(await AsyncStorage.getItem('houseListings')) || [];

      const updatedListings = storedListings.map((item) =>
        item.id === listing.id
          ? { ...item, title, description, rent: parseFloat(rent), status }
          : item
      );

      await AsyncStorage.setItem('houseListings', JSON.stringify(updatedListings));
      Alert.alert('Success', 'Listing updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating listing:', error);
      Alert.alert('Error', 'Failed to update listing.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Listing</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
      />
      <TextInput
        style={styles.input}
        value={rent}
        onChangeText={setRent}
        placeholder="Rent"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={status}
        onChangeText={setStatus}
        placeholder="Status (On Sale / Sold)"
      />

      {/* Real-Time Preview */}
      <View style={styles.previewContainer}>
        <Text style={styles.previewTitle}>Preview</Text>
        <View style={styles.previewCard}>
          <Text style={styles.previewText}>Title: {title}</Text>
          <Text style={styles.previewText}>Description: {description}</Text>
          <Text style={styles.previewText}>Rent: ${rent}</Text>
          <Text style={styles.previewText}>Status: {status}</Text>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
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
  title: {
    fontSize: 24,
    color: '#EAEBEB',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#EAEBEB',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    fontSize: 16,
    color: '#2C3E50',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#EAEBEB',
    borderRadius: 10,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  previewCard: {
    padding: 10,
  },
  previewText: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 5,
  },
});

export default EditListingScreen;

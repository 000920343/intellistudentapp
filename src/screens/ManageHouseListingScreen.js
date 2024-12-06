import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManageHouseListingScreen = ({ navigation }) => {
  const [listings, setListings] = useState([]);

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

  // Handle delete listing
  const handleDelete = async (id) => {
    Alert.alert('Delete Listing', 'Are you sure you want to delete this listing?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          const updatedListings = listings.filter((listing) => listing.id !== id);
          setListings(updatedListings);
          await AsyncStorage.setItem('houseListings', JSON.stringify(updatedListings));
          Alert.alert('Success', 'Listing deleted successfully!');
        },
      },
    ]);
  };

  // Handle navigation to EditListingScreen
  const handleEdit = (listing) => {
    if (listing) {
      navigation.navigate('EditListingScreen', { listing });
    } else {
      Alert.alert('Error', 'Failed to fetch listing details.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage House Listings</Text>
      {listings.length > 0 ? (
        <FlatList
          data={listings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listing}>
              {item.image && <Image source={{ uri: item.image }} style={styles.listingImage} />}
              <Text style={styles.listingTitle}>{item.title}</Text>
              <Text style={styles.listingDetails}>Description: {item.description}</Text>
              <Text style={styles.listingDetails}>Address: {item.address}</Text>
              <Text style={styles.listingDetails}>Rent: ${item.rent}</Text>
              <Text style={styles.listingDetails}>Rooms: {item.rooms}</Text>
              <Text style={styles.listingDetails}>Contact: {item.contact}</Text>
              <Text style={styles.listingDetails}>Status: {item.status || 'On Sale'}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEdit(item)} // Navigate to edit screen
                >
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)} // Delete the listing
                >
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noListingsText}>No listings available.</Text>
      )}
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
  listing: {
    backgroundColor: '#EAEBEB',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  listingImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  listingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  listingDetails: {
    fontSize: 14,
    color: '#2C3E50',
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#D9534F',
    padding: 10,
    borderRadius: 5,
  },
  actionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  noListingsText: {
    fontSize: 16,
    color: '#EAEBEB',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ManageHouseListingScreen;

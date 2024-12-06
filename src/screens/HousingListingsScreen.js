import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HousingListingsScreen = ({ navigation }) => {
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

  // Handle navigation to the chat screen
  const handleChat = (listing) => {
    navigation.navigate('ChatScreen', { listing });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Housing Listings</Text>
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listing}>
            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
            <Text style={styles.listingTitle}>{item.title}</Text>
            <Text style={styles.listingDetails}>Rent: ${item.rent}</Text>
            <Text style={styles.listingDetails}>Address: {item.address}</Text>
            <TouchableOpacity style={styles.chatButton} onPress={() => handleChat(item)}>
              <Text style={styles.chatButtonText}>Chat with Owner</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noListingsText}>No listings available.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2C3E50',
  },
  title: {
    fontSize: 24,
    color: '#EAEBEB',
    marginBottom: 20,
  },
  listing: {
    backgroundColor: '#EAEBEB',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  listingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  listingDetails: {
    fontSize: 14,
    color: '#2C3E50',
  },
  chatButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  chatButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noListingsText: {
    fontSize: 16,
    color: '#EAEBEB',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HousingListingsScreen;

import AsyncStorage from '@react-native-async-storage/async-storage';

const LISTINGS_KEY = 'listings';

/**
 * Add a new listing to storage
 * @param {Object} listing - The listing data to add
 * @returns {Promise<void>}
 */
export const addListing = async (listing) => {
  try {
    // Retrieve existing listings
    const existingListings = JSON.parse(await AsyncStorage.getItem(LISTINGS_KEY)) || [];

    // Add the new listing
    existingListings.push(listing);

    // Save updated listings to storage
    await AsyncStorage.setItem(LISTINGS_KEY, JSON.stringify(existingListings));
  } catch (error) {
    console.error('Error adding listing:', error);
    throw new Error('Failed to add listing');
  }
};

/**
 * Get all listings from storage
 * @returns {Promise<Array>} - An array of listings
 */
export const getListings = async () => {
  try {
    const listings = JSON.parse(await AsyncStorage.getItem(LISTINGS_KEY)) || [];
    return listings;
  } catch (error) {
    console.error('Error retrieving listings:', error);
    throw new Error('Failed to retrieve listings');
  }
};

/**
 * Delete a listing from storage
 * @param {string} listingId - The ID of the listing to delete
 * @returns {Promise<void>}
 */
export const deleteListing = async (listingId) => {
  try {
    // Retrieve existing listings
    const existingListings = JSON.parse(await AsyncStorage.getItem(LISTINGS_KEY)) || [];

    // Filter out the listing with the given ID
    const updatedListings = existingListings.filter((listing) => listing.id !== listingId);

    // Save updated listings to storage
    await AsyncStorage.setItem(LISTINGS_KEY, JSON.stringify(updatedListings));
  } catch (error) {
    console.error('Error deleting listing:', error);
    throw new Error('Failed to delete listing');
  }
};

/**
 * Clear all listings from storage
 * @returns {Promise<void>}
 */
export const clearAllListings = async () => {
  try {
    await AsyncStorage.removeItem(LISTINGS_KEY);
  } catch (error) {
    console.error('Error clearing listings:', error);
    throw new Error('Failed to clear listings');
  }
};

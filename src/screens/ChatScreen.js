import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ChatScreen = ({ route }) => {
  const { listing } = route.params; // Get the listing details from route params
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  // Send message function
  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { id: Date.now(), text: message }]);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat with Owner</Text>
      <Text style={styles.listingTitle}>{listing.title}</Text>
      <Text style={styles.listingDetails}>Rent: ${listing.rent}</Text>
      <Text style={styles.listingDetails}>Address: {listing.address}</Text>
      <Text style={styles.listingDetails}>Owner: {listing.owner}</Text> {/* Display owner's name or email */}

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  listingDetails: {
    fontSize: 14,
    marginBottom: 5,
  },
  messageContainer: {
    padding: 10,
    backgroundColor: '#d9f9b1',
    borderRadius: 5,
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatScreen;

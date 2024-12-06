import React from 'react';
import { ActivityIndicator, View, StyleSheet, LogBox } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

// Suppress irrelevant warnings
LogBox.ignoreLogs(['Require cycle:']); // Example warning to ignore

const App = () => {
  const [loading, setLoading] = React.useState(false); // Manage loading state

  // Display loading indicator if loading is true
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2C3E50" />
      </View>
    );
  }

  return <AppNavigator />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C3E50', // Match your app's theme
  },
});

export default App;

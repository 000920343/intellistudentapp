import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const SignupSelectionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Student Account" onPress={() => navigation.navigate('StudentSignup')} />
      <Button title="Civilian Account" onPress={() => navigation.navigate('CivilianSignup')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
});

export default SignupSelectionScreen;

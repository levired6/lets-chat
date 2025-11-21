import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  // Extract both name and color from the navigation parameters
  const { name, color } = route.params;

  // Use useEffect to set the screen title to the user's name
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [name, navigation]); // Re-run if name changes

  return (
    // Use the color prop to set the background color
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.greetingText}>
        Welcome to the Chat, {name}!
      </Text>
      <Text style={styles.placeholderText}>
        Start your conversation here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // The background color will be applied via inline style
    justifyContent: 'center',
    alignItems: 'center',
  },

  greetingText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF', // Use white text for contrast on dark backgrounds
    marginBottom: 10,
  },

  placeholderText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#FFFFFF',
    opacity: 0.8,
  }
  
});

export default Chat;
import { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    View, 
    Platform, 
    KeyboardAvoidingView 
} from 'react-native';
import { Bubble, GiftedChat, SystemMessage } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
    // 1. Extract name and color from the navigation parameters
    const { name, color } = route.params;

    // 2. State for storing messages, initialized to an empty array
    const [messages, setMessages] = useState([]);
    
    // Use useEffect to set the screen title to the user's name
    useEffect(() => {
        // Set the header title dynamically
        navigation.setOptions({ title: name });

        // 3. Add initial static messages when the component mounts
        setMessages([
            // User message (required by prompt)
            {
                _id: 1,
                text: "Hello! Ready to chat.",
                createdAt: new Date(),
                user: {
                    _id: 2, // Use a different ID for the initial user message
                    name: 'Initial User',
                },
            },
            // System message (required by prompt)
            {
                _id: 2,
                text: `Welcome, ${name}! You have entered the chat.`,
                createdAt: new Date(),
                system: true, // GiftedChat recognizes this as a System Message
            },
        ]);
    }, [name, navigation]); // Dependency array ensures it runs on mount and if name changes

    // Function to handle sending new messages
    const onSend = (newMessages = []) => {
        // Appends the new message(s) to the existing messages array
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    }

    // Custom function to render message bubbles
    const renderBubble = (props) => {
        return <Bubble
            {...props}
            // Customizes the appearance of the message bubbles
            wrapperStyle={{
                // Style for the messages the current user sends (right side)
                right: {
                    backgroundColor: "#000",
                },
                // Style for messages received from others (left side)
                left: {
                    backgroundColor: "#FFF",
                }
            }}
            // Customizes text color for better accessibility
            textStyle={{
                right: {
                    color: "#FFF", // White text on dark bubble
                },
                left: {
                    color: "#000", // Black text on white bubble
                },
            }}
        />
    }

    return (
        // Apply the chosen background color to the entire view
        <View style={[styles.container, { backgroundColor: color }]}> 
            
            {/* The main chat component */}
            <GiftedChat
                messages={messages} // Feed the messages state to the chat UI
                onSend={messages => onSend(messages)} // Function called when a message is sent
                renderBubble={renderBubble} // Apply custom bubble styling
                // Define the current user's identity
                user={{
                    _id: 1, // Current user's unique ID
                    name: name, // Current user's name
                }}
                renderSystemMessage={(props) => (
                    <SystemMessage 
                        {...props} 
                        textStyle={{ color: '#FFF', textAlign: 'center' }} // Ensures system message text is visible
                    />
                )}
            />

            {/* 6. Keyboard Avoiding View for Android to prevent input from being covered */}
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
            
            {/* 6. Keyboard Avoiding View for iOS to prevent input from being covered */}
            { Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // The background color is applied via inline style from the route params
    },
});

export default Chat;
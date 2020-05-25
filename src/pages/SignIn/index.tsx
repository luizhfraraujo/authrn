import React, { useContext } from 'react';
import {
    View, Text, Button, StyleSheet
} from 'react-native';
import { useAuth } from '../../contexts/auth.context'

const SignIn: React.FC = () => {
    const { signed, signIn } = useAuth();
    console.log(signed)
    function handleSignIn() {
        signIn();
    }

    return (
        <View style={styles.container}>
            <Button title="Sign In" onPress={handleSignIn}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 }
});

export default SignIn;
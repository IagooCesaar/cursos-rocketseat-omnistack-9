import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    SafeAreaView,
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Alert
} from 'react-native';

import api from '../services/Api';

export default function Book({ navigation}) {
    const id = navigation.getParam('id');
    const [date, setDate] = useState('');
    useEffect(() => {
        let response = null;
        try {

        } catch(error) {
            console.log('Erro ao iniciar sessão', error)
        } finally {
            console.log('Retorno da sessão ',response)
        }
    }, [])

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');
        let response = null;
        try {
            response = api.post(`/spots/${id}/bookings`,{
              date  
            }, {
                headers: { user_id }
            })

        } catch(error) {
            console.log('Erro ao iniciar sessão', error)
        } finally {
            console.log('Retorno da sessão ',response)
        }

        if (!response) {return}

        Alert.alert('Solicitação de reserva enviada')
        
        navigation.navigate('List')

    }

    function handleCancel() {
        navigation.navigate('List')
    }

    return (
        <KeyboardAvoidingView 
            enabled
            behavior="padding"
            style={styles.container}
        >
           <Text style={styles.label}>DATA DE INTERESSE *</Text>
            <TextInput 
                style={styles.input}
                placeholder="Qual data você quer reservar"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={text => setDate(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
        marginTop: 50,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    cancelButton: {
        backgroundColor: '#CCC',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
})
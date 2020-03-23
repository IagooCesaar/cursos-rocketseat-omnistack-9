import React, {useState, useEffect} from 'react';
import { 
    SafeAreaView,
    ScrollView,
    View, 
    Text,
    AsyncStorage,
    Image,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Alert
} from 'react-native';
import socketio from 'socket.io-client';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png'

export default function List({navigation}) {
    const [techs, setTechs] = useState([]);
    
    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.100.100:3333',{
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em \"${booking.spot.company}\" em \"${booking.date}\" foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
            })
        })
    }, [])

    useEffect(() => {
        AsyncStorage.getItem('techs').then(stgTechs => {
            if (!stgTechs) {return}
            const techsArray = stgTechs.split(',').map(tech => tech.trim());            
            if (techsArray) {setTechs(techsArray)};
        })
    },[])

    async function handleLogout() {
        await AsyncStorage.removeItem('user');
        navigation.navigate('Login')
    }
    
    return (
        <SafeAreaView style={styles.container}>     
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>       
            <ScrollView >
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}            
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 25,
    }, 
})
import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableNativeFeedback} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";


function HomeScreen(props) {
    const { navigation } = props;
    const [token, setToken] = useState('');

    const _checkToken = async() => {
        const token = await AsyncStorage.getItem('accessToken');
        setToken (token);
    }

    useEffect( () => {
        const unsubscribe = navigation.addListener('focus', ()=> {
            _checkToken();
        });
        return unsubscribe
    }, [navigation] );

    return(
       <React.Fragment>
        <ImageBackground style={styles.background} source={require('../assets/doc-bg.png')}>
            <View style={styles.container} >
                <View style={styles.textContainer} >
                    <Text style={styles.title} >مرحبا بك في طبيبي</Text>
                    <Text style={styles.text} >التطبيق الاول في ربط الاطباء مع المرضى</Text>
                </View>
                {token ? (
                    <React.Fragment>
                        <Button 
                            text="استعراض قائمة الاطباء"
                            onPress={()=> navigation.navigate('Doctors')}
                        />
                        <TouchableNativeFeedback
                            onPress={() => navigation.navigate('profile')}
                        >
                            <Text style={styles.labelButton} >استعراض الملف الشخصي</Text>
                        </TouchableNativeFeedback>
                    </React.Fragment>    
                ): (
                    <React.Fragment>
                        <Button 
                            text="تسجيل الدخول"
                            onPress={()=> navigation.navigate('signIn')}
                        />
                         <TouchableNativeFeedback
                            onPress={() => navigation.navigate('signUp')}
                        >
                            <Text style={styles.labelButton} >انشاء حساب جديد</Text>
                        </TouchableNativeFeedback>
                    </React.Fragment>
                )}
            </View>
        </ImageBackground>
       </React.Fragment>
    )
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%'
    },
    container : {
        backgroundColor: 'rgba(0,0,0, 0.5)',
        flex: 1,
        padding:10, 
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    textContainer: {
        marginBottom: 30
    },
    title: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 35
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20
    },
    labelButton: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
        color : '#fff'
    }
})

export default HomeScreen;
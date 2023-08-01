import React, {useEffect, useState} from "react";
import { ScrollView, KeyboardAvoidingView, View} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../config/axios";
import {SIGNIN_URL} from '../config/urls';
import Button from "../components/Button";
import ScreenTitle from "../components/ScreenTitle";
import Input from '../components/Input';
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import styles from "./styles/authStyles";


function SignInScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [alert, setAlert] = useState ({messages: null, type: ''});

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert({massages: null})
        }, 3000)

        return() => clearTimeout(timer)
    }, [alert.messages]);

    const changeEmailHandler = (value)  => {
        setEmail(value);
    }

    const changePasswordHandler = (value) => {
        setPassword(value);
    }

    const validate = () => {
        let validationErrors = [];
        let passed = true
        if(!email) {
            validationErrors.push("الرجاء ادخال الايمل");
            passed = false
        }
        if(!password) {
            validationErrors.push("الرجاء ادخال الرمز");
            passed = false
        }
    
        if (validationErrors.length > 0) {
            setAlert({messages: validationErrors, type:'danger'})
        }
        return passed;
    }

    const _signIn = () => {
        (async()=> {
            if(!validate()) return;
            setLoading(true);

            try{
                const response = await axios.post(SIGNIN_URL, {email:email.trim(), password});                
                setLoading(false);
                setEmail('');
                setPassword('');
                AsyncStorage.setItem('accessToken', response.data.accessToken);
                props.navigation.navigate('Home')
            }catch(e) {
                setLoading(false);
                setAlert({messages: e.response.data.massage, type: 'danger'})
            }
        })();
    }

    return (

            <ScrollView contentContainerStyle={{passingVertical: 40}}>
                <View style= {styles.container} >
                <Loader title= 'جاري جلب الملف الشخصي' loading={isLoading} />
                <Alert messages= {alert.messages} type={alert.type} />
                <ScreenTitle title="Sign In" icon= "md-log-in" />
                <KeyboardAvoidingView behavior="padding" enabled >
                    <Input
                        placeholder="email"
                        value={email}
                        onChangeText={changeEmailHandler}
                    />
                    <Input
                        placeholder="password"
                        value={password}
                        onChangeText={changePasswordHandler}
                        secureTextEntry
                    />
                    <Button text="enter" onPress={_signIn} />
                </KeyboardAvoidingView>
                </View>
            </ScrollView>
    )
}

export default SignInScreen;
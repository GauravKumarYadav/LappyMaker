import React, { createContext, useState } from 'react';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';

// import { oAuthIds } from '../Utils/FirebaseConfig'
export const AuthContext = createContext();

import { config } from '../Utils/FirebaseConfig'

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        await firebase.auth().signInWithEmailAndPassword(email, password);
                    } catch (e) {
                        console.log(e);
                    }
                },
                googleLogin: async () => {
                    try {
                        const result = await Google.logInAsync({
                            androidClientId: '788753377947-gh5cvtod9dj3do5rnsarkmf375gdpos2.apps.googleusercontent.com',
                            iosClientId: '788753377947-ksh8tcjlkulua5i6r109gcksinju74db.apps.googleusercontent.com',
                            scopes:['profile','email'],
                        });
                        if (result.type === "success") {
                            const { idToken, accessToken } = result;
                            const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
                            firebase.auth().signInWithCredential(credential).then(res => {
                                setUser(res);
                                // user res, create your user, do whatever you want
                            }).catch(error => {
                                console.log("firebase cred err:", error);
                            });
                        } else {
                            return { cancelled: true };
                        }
                    } catch (err) {
                        console.log("err:", err);
                    }
                },
                fbLogin: async () => {
                    try{
                        await Facebook.initializeAsync({appId:'748687212695222'});
                        const { type,token, } = await Facebook.logInWithReadPermissionsAsync({permissions:['public_profile']});
                        if(type ==="success"){
                            const credential = firebase.auth.FacebookAuthProvider.credential(token);
                            await firebase.auth().signInWithCredential(credential).then(res=>setUser(res));
                        }
                    }catch(e){
                        console.log('err : ',e);
                    }
                },
                register: async (email, password) => {
                    try {
                        await firebase.auth().createUserWithEmailAndPassword(email, password);
                    } catch (e) {
                        console.log(e);
                    }
                },
                logout: async () => {
                    try {
                        await firebase.auth().signOut();
                    } catch (e) {
                        console.log(e);
                    }
                },
            }}>
            {children}
        </AuthContext.Provider>
    );
};
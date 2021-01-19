import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, Platform, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FloatingAction } from "react-native-floating-action";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../../navigator/AuthProvider';
import * as firebase from 'firebase';
import 'firebase/firebase-firestore';
import { AirbnbRating } from 'react-native-elements';


const AddReviewScreen = () => {
    const [image, setImage] = useState(null);
    const { user } = useContext(AuthContext);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [post, setPost] = useState(null);
    const [rating, setRating] = useState(4);

    const actions = [
        {
            text: "Open Camera",
            icon: <Ionicons name="camera-outline" size={30} />,
            name: "OpenCamera",
            position: 1,
            buttonSize: 66,
            color: '#2793d1',
        },
        {
            text: "Open Gallery",
            icon: <Ionicons name="images-outline" size={24} />,
            name: "bt_accessibility",
            position: 2,
            buttonSize: 60,
            color: '#ef4769',
        },
    ];

    const ratingCompleted = (rating) => {
        setRating(rating);
    };

    const submitPost = async () => {
        const imageUrl = await uploadImage();
        // console.log('Image Url: ', imageUrl);
        // console.log('Post: ', post);

        firebase.firestore().collection('reviews').add({
            userId: user.uid,
            userImage:user.photoURL,
            userName:user.displayName,
            post: post,
            postImg: imageUrl,
            postTime: firebase.firestore.Timestamp.fromDate(new Date()),
            rating: rating,
        }).then(() => {
            // console.log('Post Added!');
            Alert.alert(
                'Post published!',
                'Your post has been published Successfully!',
            );
            setPost(null);
        }).catch((error) => {
            console.log('Something went wrong with added post to firestore.', error);
        });
    };

    const uploadImage = async () => {
        if (image == null) {
            return null;
        }
        const uploadUri = image;
        const putBlob = await (await fetch(uploadUri)).blob();
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        setUploading(true);
        setTransferred(0);
        const storageRef = firebase.storage().ref(`photos/${user.uid}/${filename}`);
        const task = storageRef.put(putBlob);

        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );

            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });

        try {
            await task;

            const url = await storageRef.getDownloadURL();

            setUploading(false);
            setImage(null);

            // Alert.alert(
            //     'Image uploaded!',
            //     'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
            // );
            return url;

        } catch (e) {
            console.log(e);
            return null;
        }

    };

    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        } else {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                // allowsEditing: true,
                // aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                // console.log(result.uri);
                setImage(result.uri);
            } else if (result.cancelled) {
                Alert.alert("Image Error", "No Photo was captured from Camera");
            }
        }
    };

    const openGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        } else {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                // allowsEditing: true,
                // aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                // console.log(result);
                setImage(result.uri);
            } else if (result.cancelled) {
                Alert.alert("Image Error", "No Image was selected from FileManager");
            }
        }
    };

    return (
        <View style={styles.container}  >
            <View style={styles.inputWrapper} >
                {
                    (image != null)
                        ? <Image style={styles.addImage} source={{ uri: image }} />
                        : <TouchableOpacity onPress={() => openGallery()} >
                            <Ionicons name="image-outline" size={100} />
                        </TouchableOpacity>
                }
                <AirbnbRating
                    onFinishRating={ratingCompleted}
                    defaultRating={4}
                />
                <TextInput
                    style={styles.inputField}
                    placeholder="Please Share your Experience with Us !"
                    multiline
                    value={post}
                    onChangeText={(content) => setPost(content)}
                />
                {
                    (uploading) ? (
                        <View style={styles.StatusWrapper}>
                            <Text>{transferred} % Completed!</Text>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    ) : (
                            <TouchableOpacity style={styles.SubmitBtn}
                                onPress={() => {
                                    post ?
                                        submitPost()
                                        : Alert.alert('Review', 'Please share your Experience with Us !');

                                }
                                } >
                                <Text style={styles.SubmitBtnText} >Post</Text>
                            </TouchableOpacity>
                        )
                }
            </View>
            <FloatingAction
                actions={actions}
                onPressItem={
                    name => {
                        (name === "OpenCamera") ? (openCamera()) : (openGallery())
                    }
                }
            />
        </View>
    );
}

export default AddReviewScreen;

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    inputWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center', width: wp('100%'), backgroundColor: '#2e64e515', },
    inputField: { justifyContent: 'center', alignItems: 'center', fontSize: hp('2%'), width: wp('90%'), textAlign: 'center' },
    addImage: { width: wp('100%'), height: hp('30%'), marginBottom: hp('5%'), resizeMode: 'contain' },
    StatusWrapper: { justifyContent: "center", alignItems: "center", },
    SubmitBtn: { flexDirection: "row", justifyContent: "center", backgroundColor: "#2e64e515", borderRadius: wp('1%'), padding: wp('2%'), width: wp('20%'), },
    SubmitBtnText: { fontSize: hp('2%'), fontWeight: "bold", color: "#2e64e5", },
});
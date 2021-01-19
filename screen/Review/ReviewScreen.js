import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Alert, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ReviewCard, { SkeletonReviewCard } from '../../components/ReviewCard';
import * as firebase from 'firebase';
import 'firebase/firebase-firestore';
import { ScrollView } from 'react-native-gesture-handler';


const Posts = [
    {
        id: 1,
        userName: 'Gaurav Kumar Yadav',
        userImage: {
            uri:
                'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
        },
        postTime: '5 hrs ago',
        postText: ' https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual - reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
        postImage: {
            uri:
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
        },
        rating: 3,
    },
    {
        id: 2,
        userName: 'Gaurav Kumar Yadav',
        userImage: {
            uri:
                'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
        },
        postTime: '5 hrs ago',
        postText: ' https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual - reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
        postImage: 'none',
        rating: 3,
    },
    {
        id: 3,
        userName: 'Gaurav Kumar Yadav',
        userImage: {
            uri:
                'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
        },
        postTime: '5 hrs ago',
        postText: ' https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual - reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
        postImage: {
            uri:
                'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
        },
        rating: 3,
    },
];

const ReviewScreen = () => {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleted, setDeleted] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        fetchPosts().then(() => { setRefreshing(false) });

    }

    const fetchPosts = async () => {
        try {
            var list = [];
            await firebase.firestore().collection('reviews').orderBy('postTime', 'desc').get()
                .then((querySnapshot) => {
                    // console.log('Total Posts: ', querySnapshot.size);

                    querySnapshot.forEach(doc => {
                        const { userId, post, postImg, postTime, rating,userImage,userName } = doc.data();
                        list.push({
                            id: doc.id,
                            userId,
                            userName: userName,
                            userImg: userImage,
                            postTime: postTime,
                            post: post,
                            postImg: postImg,
                            rating: rating,
                        });
                    })
                })

            setPosts(list);

            if (loading) {
                setLoading(false);
            }

            // console.log('Posts: ', list);

        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        fetchPosts();
        setDeleted(false);
    }, [deleted]);

    const handleDelete = (postId) => {
        Alert.alert(
            'Delete post',
            'Are you sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed!'),
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: () => deletePost(postId),
                },
            ],
            { cancelable: false }
        );
    }

    const deletePost = (postId) => {
        // console.log('Current Post Id: ', postId);

        firebase.firestore().collection('reviews')
            .doc(postId)
            .get()
            .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    const { postImg } = documentSnapshot.data();

                    if (postImg != null) {
                        const storageRef = firebase.storage().refFromURL(postImg);
                        const imageRef = firebase.storage().ref(storageRef.fullPath);

                        imageRef
                            .delete()
                            .then(() => {
                                console.log(`${postImg} has been deleted successfully.`);
                                deleteFirestoreData(postId);
                            })
                            .catch((e) => {
                                console.log('Error while deleting the image. ', e);
                            })
                        // If the post image is not available
                    } else {
                        deleteFirestoreData(postId);
                    }
                }
            })
    }

    const deleteFirestoreData = (postId) => {
        firebase.firestore().collection('reviews').doc(postId)
            .delete()
            .then(() => {
                Alert.alert(
                    'Post deleted!',
                    'Your post has been deleted successfully!',
                );
                setDeleted(true);
            })
            .catch(e => console.log('Error deleting posst.', e))
    }

    const ListHeader = () => {
        return null;
    };

    return (
        <SafeAreaView>
            {
                (loading) ?
                    (<ScrollView contentContainerStyle={{ alignItems: 'center' }} >
                        <SkeletonReviewCard />
                        <SkeletonReviewCard />
                        <SkeletonReviewCard />
                    </ScrollView>)
                    :
                    (<View style={styles.container} >
                        <FlatList
                            data={posts}
                            renderItem={({ item }) => <ReviewCard item={item} onDelete={handleDelete} />}
                            keyExtractor={item => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={ListHeader}
                            ListFooterComponent={ListHeader}
                            showsVerticalScrollIndicator={false}
                            refreshing={refreshing}
                            onRefresh={() => onRefresh()}
                        />
                    </View>)

            }
        </SafeAreaView>
    );
}

export default ReviewScreen;

const styles = StyleSheet.create({
    container: { alignItems: 'center', backgroundColor: '#fff', },
});
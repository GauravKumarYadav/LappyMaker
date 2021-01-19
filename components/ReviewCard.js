import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { AirbnbRating } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { AuthContext } from '../navigator/AuthProvider';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { ScrollView } from 'react-native';

const ReviewCard = ({ item, onDelete }) => {
    const [noOfLines, setNoOfLines] = useState(true);
    const { user, logout } = useContext(AuthContext);

    return (
        <View style={styles.container} key={item.id} >
            <View style={styles.reviewCard} >
                <View style={{ padding: wp('3%'), paddingBottom: 0 }} >
                    <View style={styles.userInfo} >
                        <Image style={styles.userImage} source={{ uri: item.userImg }} />
                        <View style={styles.userInfoText} >
                            <Text style={styles.userName} >
                                {item.userName}
                            </Text>
                            <Text style={styles.postTime} >
                                {moment(item.postTime.toDate()).fromNow()}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => setNoOfLines(!noOfLines)} >
                        <Text style={styles.postText} numberOfLines={noOfLines ? 2 : null} >
                            {item.post}
                        </Text>
                    </TouchableOpacity>
                </View>
                {
                    (item.postImage !== null) ?
                        <TouchableOpacity style={{ paddingTop: hp('1%'), marginBottom: hp('-1%') }} onPress={() => setNoOfLines(!noOfLines)} >
                            <Image style={styles.postImage} source={{ uri: item.postImg }}
                            />
                        </TouchableOpacity>
                        :
                        null
                }
                <View style={styles.interactionWrapper} >
                    <View style={styles.interaction} >
                        <AirbnbRating
                            isDisabled
                            size={30}
                            defaultRating={item.rating}
                            count={5}
                            selectedColor="orange"
                        />
                    </View>
                    {
                        user.uid == item.userId ?
                            <TouchableOpacity style={styles.interaction} onPress={() => onDelete(item.id)} >
                                <Ionicons name="md-trash-bin" size={25} />
                                <Text style={styles.interactionText}>
                                    Delete
                        </Text>
                            </TouchableOpacity>
                            : null
                    }
                </View>
            </View>
        </View>
    );
}

export const SkeletonReviewCard = () => {
    return (
        <SkeletonPlaceholder>
            <View style={{ flexDirection: "row", alignItems: "center" ,paddingTop:hp('1%')}}>
                <View style={{ width: wp(15), height: wp(15), borderRadius: wp(25/2)  }} />
                <View style={{ marginLeft: 20 }}>
                    <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                    <View
                        style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                    />
                </View>
            </View>
            <View style={{ marginTop: 10, marginBottom: 30 }} >
                <View style={{ width: wp('90%'), height: hp('5%'), borderRadius: wp(1) }} />
                <View style={{ width: wp('90%'), height: hp('30%'), borderRadius: wp(1), marginTop: wp(2) }} />
                <View />
            </View>
        </SkeletonPlaceholder>
    );
}

export default ReviewCard;

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', backgroundColor: '#fff', padding: wp('1%') },
    reviewCard: { backgroundColor: '#f8f8f8', width: wp('95%'), borderRadius: wp(5), },
    userInfo: { flexDirection: 'row', justifyContent: 'flex-start', },
    userImage: { width: wp('12%'), height: wp('12%'), borderRadius: wp('6%') },
    userName: { fontSize: hp('1.5%'), fontWeight: 'bold', color: 'black', },
    userInfoText: { flexDirection: 'column', justifyContent: 'center', marginLeft: wp(2) },
    postTime: { fontSize: hp('1.2%'), color: '#666' },
    postText: { fontSize: hp('1.5%'), },
    postImage: { width: wp('95%'), height: wp('55%'), resizeMode: 'contain', borderRadius: wp('2%'), },
    interactionWrapper: { flexDirection: 'row', justifyContent: 'space-around', },
    interaction: { justifyContent: 'center', flexDirection: 'row', borderRadius: wp('3%'), alignSelf: 'center' },
    interactionText: { fontSize: hp('1.2%'), fontWeight: 'bold', color: '#333', alignSelf: 'center' },
});
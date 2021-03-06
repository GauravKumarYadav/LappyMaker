import React from 'react';
import { Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGES = [
    {
        title: 'Lorem Ipsum Dolor',
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor",
        backgroundColor: '#0264BC',
        image: 'http://unsplash.it/400/400?image=674'
    },
    {
        title: 'Consectetur adipisicing',
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor ",
        backgroundColor: '#1abc9c',
        image: 'https://unsplash.it/400/400?image=940'
    },
    {
        title: 'Adipisicing elitt',
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor",
        backgroundColor: '#d35400',
        image: 'https://unsplash.it/400/400?image=900'
    },
    {
        title: 'sit amet',
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor",
        backgroundColor: '#34495e',
        image: 'https://unsplash.it/400/400?image=999'
    },
    {
        title: 'Sed do eiusmod',
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor",
        backgroundColor: '#127186',
        image: 'https://unsplash.it/400/400?image=1011'
    },
]

const OnboardingScreen = ({ navigation }) => {
    let state = {
        scroll: new Animated.Value(0),
    };
    const position = Animated.divide(state.scroll, PAGE_WIDTH);
    const backgroundColor = position.interpolate({
        inputRange: PAGES.map((_, i) => i),
        outputRange: PAGES.map(p => p.backgroundColor),
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor, opacity: 0.8 }]} />
            <Animated.ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: state.scroll } } }],
                    { useNativeDriver: false }
                )}>

                {PAGES.map((page, i) => (
                    <View key={i} style={styles.page}>
                        <View style={[styles.card]}>
                            <Text style={styles.title}>{page.title}</Text>
                            <Text style={styles.desc}>{page.description}</Text>
                        </View>

                        <Animated.View style={[styles.frame, styles.shadow, { transform: [{ translateX: Animated.multiply(Animated.add(position, -i), -200) }] }]}>
                            <Animated.Image
                                source={{ uri: page.image }}
                                style={styles.photo}
                            />
                        </Animated.View>
                    </View>
                ))}
            </Animated.ScrollView>
            <TouchableOpacity
                onPress={() => { navigation.replace('Login') }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>{"GET STARTED"}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: { flex: 1, },
    shadow: { elevation: 20, shadowColor: '#000000', shadowOpacity: 0.5, shadowRadius: 20, shadowOffset: { height: 12 }, },
    title: { fontSize: PAGE_WIDTH / 12, fontWeight: 'bold', color: '#fff', backgroundColor: 'transparent', textAlign: 'center' },
    desc: { fontSize: PAGE_WIDTH / 24, color: '#fff', backgroundColor: 'transparent', marginTop: 20, lineHeight: 25, textAlign: 'center' },
    page: { width: PAGE_WIDTH, },
    card: { position: 'absolute', margin: 12, marginTop: 40, left: 12, top: 0, right: 0, borderRadius: 8, paddingHorizontal: 24, paddingTop: 16, paddingBottom: 140, },
    frame: { position: 'absolute', left: 0, bottom: 160, borderRadius: (PAGE_WIDTH - 100) / 2, height: PAGE_WIDTH - 100, width: PAGE_WIDTH - 100, margin: 50, },
    button: { backgroundColor: 'rgba(0,0,0, 0.3)', position: 'absolute', margin: 12, marginTop: 40, left: (PAGE_WIDTH / 2) - 100, borderRadius: 50, alignItems: 'center', bottom: 30, },
    buttonText: { margin: 15, marginLeft: 50, marginRight: 40, color: '#fff', fontSize: 14, },
    photo: { flex: 1, borderRadius: (PAGE_WIDTH - 100) / 2, },
});

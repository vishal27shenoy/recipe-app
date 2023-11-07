import {StyleSheet, Text, View, Image} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import React, {useEffect} from 'react';
import {color} from '../constants/color';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Animated, {
  useSharedValue,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const value1 = responsiveWidth(7);
  const value2 = responsiveWidth(10);
  const innerRing = useSharedValue(0);
  const outerRing = useSharedValue(0);
  const navigation = useNavigation();
  useEffect(() => {
    SplashScreen.hide();
    innerRing.value = withSpring(value1, {duration: 500});
    outerRing.value = withSpring(value2, {duration: 800});
  }, []);
  setTimeout(() => {
    navigation.replace('Home');
  }, 1000);
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.outerOutline, {padding: outerRing}]}>
        <Animated.View style={[styles.innerOutline, {padding: innerRing}]}>
          <Image
            source={require('../../assets/images/welcome.png')}
            style={styles.imgHolder}
          />
        </Animated.View>
      </Animated.View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Foody</Text>
        <Text style={styles.tagLine}>Food is always right</Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.WELCOME_BACKGROUND,
  },
  imgHolder: {
    height: responsiveWidth(40),
    width: responsiveWidth(40),
  },
  innerOutline: {
    padding: responsiveWidth(7),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: responsiveWidth(50),
  },
  outerOutline: {
    padding: responsiveWidth(10),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: responsiveWidth(50),
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: responsiveFontSize(6),
    color: color.LIGHT,
    fontWeight: 'bold',
  },
  tagLine: {
    fontSize: responsiveFontSize(2),
    color: color.LIGHT,
    fontWeight: 'bold',
  },
});

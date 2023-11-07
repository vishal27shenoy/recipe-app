import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getRecipe} from '../component/api';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {ChevronLeftIcon as BackIcon} from 'react-native-heroicons/solid';
import Animated, {FadeIn, FadeOut, FadeInDown} from 'react-native-reanimated';
import {color} from '../constants/color';
import {SharedElement} from 'react-navigation-shared-element';
const DetailScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const route = useRoute();
  const param = route?.params;
  const {idMeal, strMeal, strMealThumb} = param?.data?.item;
  useEffect(() => {
    fetchDetail();
  }, []);
  const fetchDetail = async () => {
    const response = await getRecipe(idMeal);
    setData(response?.data?.meals[0]);
  };
  return (
    <Animated.View style={styles.container}>
      <ScrollView style={{position: 'relative'}}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <BackIcon size={responsiveHeight(3)} color={color?.LIGHT} />
        </Pressable>
        <SharedElement id={strMealThumb}>
          <Image
            source={{uri: strMealThumb}}
            style={styles.imgHolder}
            entering={FadeInDown.delay(500).springify()}
            sharedTransitionTag="sharedTag"
          />
        </SharedElement>
        <View style={{paddingHorizontal: responsiveWidth(4)}}>
          <Text style={{fontSize: responsiveFontSize(3), fontWeight: 'bold'}}>
            {data?.strArea} {data?.strCategory}
          </Text>
          <Text
            style={{
              color: color?.WELCOME_BACKGROUND,
              fontSize: responsiveFontSize(3),
              fontWeight: 'bold',
            }}>
            Instruction
          </Text>
          <Animated.Text
            style={styles.instruction}
            entering={FadeInDown.duration(500).springify()}>
            {data?.strInstructions}
          </Animated.Text>
          <Text
            style={{
              color: color?.WELCOME_BACKGROUND,
              fontSize: responsiveFontSize(3),
              fontWeight: 'bold',
            }}>
            Ingredient
          </Text>
          <Text style={styles.title}>{data?.strIngredient1}</Text>
          <Text style={styles.title}>{data?.strIngredient2}</Text>
          <Text style={styles.title}>{data?.strIngredient3}</Text>
          <Text style={styles.title}>{data?.strIngredient4}</Text>
          <Text style={styles.title}>{data?.strIngredient5}</Text>
          <Text style={styles.title}>{data?.strIngredient6}</Text>
          <Text style={styles.title}>{data?.strIngredient7}</Text>
          <Text style={styles.title}>{data?.strIngredient8}</Text>
          <Text style={styles.title}>{data?.strIngredient9}</Text>
          <Text style={styles.title}>{data?.strIngredient10}</Text>
          <Text style={styles.title}>{data?.strIngredient11}</Text>
          <Text style={styles.title}>{data?.strIngredient12}</Text>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: 'relative',
  },
  imgHolder: {
    width: responsiveWidth(100),
    height: responsiveHeight(40),
    resizeMode: 'cover',
    // borderRadius: responsiveWidth(40),
    // borderBottomLeftRadius: responsiveWidth(30),
    // borderBottomRightRadius: responsiveWidth(10),
  },
  title: {
    fontSize: responsiveFontSize(2),
    // color: color?.WELCOME_BACKGROUND,
  },
  instruction: {
    fontSize: responsiveFontSize(2),
    textAlign: 'justify',
  },
  backBtn: {
    height: responsiveWidth(7),
    width: responsiveWidth(7),
    position: 'absolute',
    backgroundColor: color.WELCOME_BACKGROUND,
    zIndex: 2,
    marginLeft: responsiveWidth(2),
    marginTop: responsiveHeight(2),
    borderRadius: responsiveWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import {StyleSheet, Text, View, FlatList, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {categoryData} from '../constants/data';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Animated, {FadeIn, FadeOut, FadeInDown} from 'react-native-reanimated';
import {color} from '../constants/color';
const Categories = ({data, searchFun}) => {
  const [active, setActive] = useState('chicken');
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <FlatList
        data={data}
        renderItem={({item}) =>
          item?.strCategory.toLowerCase() != 'beef' && (
            <CategoryCard
              item={item}
              active={active}
              setActive={setActive}
              searchFun={searchFun}
            />
          )
        }
        keyExtractor={item => item.strCategoryThumb}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Animated.View>
  );
};

export default Categories;

const CategoryCard = ({item, active, setActive, searchFun}) => {
  const {strCategoryThumb, strCategory} = item;
  return (
    <Pressable
      style={styles.cardContainer}
      onPress={() => {
        setActive(strCategory), searchFun(strCategory);
      }}>
      <View
        style={[
          {
            backgroundColor:
              active?.toLowerCase() == strCategory?.toLowerCase()
                ? color.WELCOME_BACKGROUND
                : color.LIGHT_GRAY,
          },
          styles.imgContainer,
        ]}>
        <Image style={styles.categortImg} source={{uri: strCategoryThumb}} />
      </View>
      <Text numberOfLines={1}>{strCategory}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  categortImg: {
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
  },
  cardContainer: {
    height: responsiveWidth(20),
    width: responsiveWidth(14),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: responsiveWidth(2),
  },
  imgContainer: {
    height: responsiveWidth(13),
    width: responsiveWidth(13),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(50),
  },
});

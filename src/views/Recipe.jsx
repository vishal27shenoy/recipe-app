import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, {FadeIn, FadeOut, FadeInDown} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
const Recipe = data => {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeInDown.duration(500).springify()}>
      <MasonryList
        data={data?.data}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item, i}) => <RecipeCard item={item} index={i} />}
        // refreshing={isLoadingNext}
        onRefresh={() => refetch({first: ITEM_CNT})}
        onEndReachedThreshold={0.1}
      />
    </Animated.View>
  );
};

export default Recipe;

const RecipeCard = (item, index) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{alignSelf: 'center'}}
      onPress={() => navigation.navigate('Detail', {data: item})}>
      <SharedElement id={item?.item?.strMealThumb}>
        <Image
          sharedTransitionTag="sharedTag"
          source={{uri: item?.item?.strMealThumb}}
          style={[
            styles.imgHolder,
            {
              height:
                item?.index % 3 == 0
                  ? responsiveHeight(20)
                  : responsiveHeight(30),
            },
          ]}
        />
      </SharedElement>
      <Text numberOfLines={1}>{item?.item?.strMeal}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveWidth(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgHolder: {
    width: responsiveWidth(40),
    borderRadius: responsiveWidth(5),

    resizeMode: 'contain',
  },
});

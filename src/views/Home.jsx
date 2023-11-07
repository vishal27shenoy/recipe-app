import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color} from '../constants/color';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {BellIcon as BellIcon} from 'react-native-heroicons/outline';
import {MagnifyingGlassIcon as SearchIcon} from 'react-native-heroicons/solid';
import Categories from '../component/Categories';
import {getCategory, getFilterCategory} from '../component/api';
import Recipe from './Recipe';
StatusBar.setBarStyle('dark-content');
StatusBar.setBackgroundColor(color.LIGHT);
const Home = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState('chicken');
  useEffect(() => {
    fetchCategory();
    fetchFilterCategory();
  }, []);

  const fetchCategory = async () => {
    const response = await getCategory();
    setData(response?.data?.categories);
  };

  const fetchFilterCategory = async value => {
    console.log(value, search);
    if (
      (value != undefined || search != undefined) &&
      (value?.trim().length > 0 || search?.trim().length > 0)
    ) {
      setLoad(true);
      const response = await getFilterCategory(value || search);
      console.log(response);
      setRecipe(response?.data?.meals);
      setLoad(false);
    } else {
      return;
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}>
        <View style={styles.navContainer}>
          <Image
            source={require('../../assets/images/avatar.png')}
            style={styles.imgHolder}
          />
          <BellIcon size={responsiveHeight(3)} color={color.GRAY} />
        </View>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hello User</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subText}>Make your own food,</Text>
        </View>
        <View style={styles.subtitle}>
          <Text style={styles.subTitleText}>
            Stay at <Text style={{color: color.WELCOME_BACKGROUND}}>home</Text>
          </Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="search food"
            style={styles.inputHolder}
            placeholderTextColor={color.LIGHT}
            onChangeText={text => setSearch(text)}
            onSubmitEditing={() => fetchFilterCategory()}
          />
          <Pressable
            style={styles.searchIcon}
            onPress={() => fetchFilterCategory()}>
            <SearchIcon
              size={responsiveHeight(3)}
              color={color.DARK}
              strokeWidth={3}
            />
          </Pressable>
        </View>
        <View style={styles.categoryContainer}>
          {data.length > 0 && (
            <Categories data={data} searchFun={fetchFilterCategory} />
          )}
        </View>
        <View style={styles.recipeContainer}>
          <Text style={styles.recipeText}>Recipe</Text>
        </View>
        <View>
          {recipe?.length > 0 ? (
            <Recipe data={recipe} />
          ) : (
            !load && (
              <Text
                style={{color: 'red', paddingHorizontal: responsiveWidth(4)}}>
                Not Found!
              </Text>
            )
          )}
          {load && <ActivityIndicator />}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.LIGHT,
  },
  scrollContainer: {
    marginVertical: responsiveHeight(2),
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4),
    marginBottom: responsiveHeight(2),
  },
  imgHolder: {
    height: responsiveWidth(13),
    width: responsiveWidth(13),
  },
  greetingContainer: {
    paddingHorizontal: responsiveWidth(4),
  },
  greetingText: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: 'bold',
    color: color.GRAY,
  },
  subContainer: {
    paddingHorizontal: responsiveWidth(4),
  },
  subText: {
    fontWeight: '600',
    fontSize: responsiveFontSize(4),
    color: color.GRAY,
  },
  subtitle: {
    paddingHorizontal: responsiveWidth(4),
  },
  subTitleText: {
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
  },
  searchContainer: {
    marginTop: responsiveHeight(4),
    height: responsiveHeight(6),
    width: responsiveWidth(92),
    alignSelf: 'center',
    backgroundColor: color.LIGHT_GRAY,
    borderRadius: responsiveWidth(6),
    paddingHorizontal: responsiveWidth(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputHolder: {
    height: responsiveHeight(6),
    width: responsiveWidth(70),
    color: color.LIGHT,
  },
  searchIcon: {
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    backgroundColor: color.LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContainer: {
    paddingHorizontal: responsiveWidth(4),
    marginTop: responsiveHeight(2),
  },
  recipeContainer: {
    paddingHorizontal: responsiveWidth(4),
  },
  recipeText: {
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
  },
});

import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import ScreenLoading from "../components/ScreenLoading";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";
import Search from "../components/Search"
import { map } from "lodash";
import colors from "../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { Icon } from 'react-native-elements'
import { getCategoriesApi } from "../api/category"


export default function Categories() {

  const navigation = useNavigation();

  const [categories, setCategories] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setCategories(null);
      (async () => {
        const response = await getCategoriesApi();
        setCategories(response);
      })();
    }, [],
    )
  );

  const goToCategory = (category_name) => {
    navigation.navigate("category", { category_name })
  }

  return (
    <>
      <Search />

      {!categories ? (
        <ScreenLoading/>
      ) : (
        <View style={styles.container}>
          <Text style={styles.containerTitle}>LISTADO DE CATEGORIAS:</Text>

          {map(categories, (category) => (
            <TouchableWithoutFeedback
              key={category.id}
              onPress={() => goToCategory(category.name)}
            >
              <View style={styles.category}>
                <Text style={styles.textCategory}>{category.name}</Text>
                <Icon
                  raised
                  name='chevron-right'
                  type='font-awesome'
                  size={18}
                  color={colors.fontPrice}
                  onPress={() => goToCategory(category.name)}
                />
              </View>
            </TouchableWithoutFeedback>
          ))}

        </View>
      )
      }

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    paddingBottom: 120
  },
  containerTitle: {
    paddingBottom: 10,
    fontSize: 18,
  },
  category: {
    borderRadius: 5,
    backgroundColor: colors.bgwhite,
    marginBottom: 15,
    padding: 3,
    paddingLeft: 20,
    paddingRight: 15,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textCategory: {
    fontSize: 16
  },
  blockLine: {
    flexDirection: "row",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  containTitle: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.bgGray,
    padding: 10,
    backgroundColor: colors.bgGray,
    alignContent: "center"
  },
  containData: {
    padding: 10
  },
  Directions: {
    color: colors.dark,
    fontSize: 16,
    paddingBottom: 10
  }
});

import React, {useState} from "react";
import { StyleSheet, View, Text, Pressable, Modal} from "react-native";
import { Divider, Title, TextInput } from "react-native-paper"
import { useNavigation } from "@react-navigation/native";
import colors from "../../styles/colors"
import SelectDropdown from 'react-native-select-dropdown'
import AwesomeIcon from "react-native-vector-icons/FontAwesome"


export default function SearchFilter(props) {

    const { search, min_price, max_price, index_category, index_brand } = props;

    const [modalVisible, setModalVisible] = useState(false);

    const [selectCategory, setSelectCategory] = useState("seleccionar");
    const [selectBrand, setSelectBrand] = useState("seleccionar");
    const [selectIndexCategory, setSelectIndexCategory] = useState(index_category?index_category:0);
    const [selectIndexBrand, setSelectIndexBrand] = useState(index_brand?index_brand:0);
    const [selectMin, setSelectMin] = useState(min_price?min_price:"");
    const [selectMax, setSelectMax] = useState(max_price?max_price:"");

    const navigation = useNavigation();

    const renderIcon = () => {
      return (
        <AwesomeIcon size={22} name="angle-down" type="font-awesome" />
      )
    }

    const onSearchFilter = async () => {
      setModalVisible(false);

      navigation.navigate("search", {
        search_filter: search,
        min_price: selectMin,
        max_price: selectMax,
        category_name: selectCategory,
        brand_name: selectBrand,
        index_category:selectIndexCategory,
        index_brand:selectIndexBrand,
      });
    }

    const onCleanFilter = async () => {
      setSelectIndexCategory(0);
      setSelectIndexBrand(0);
      setSelectMin("");
      setSelectMax("");
    }

    return(
        <View>
            
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>FILTRAR BÚSQUEDA</Text>
            </Pressable>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.flexDirectionRow}>

                          <Title>Filtrar por:</Title>

                          <Pressable
                              style={[styles.buttonClean]}
                              onPress={() => onCleanFilter()}
                          >
                              <Text style={{color:colors.primary, textAlign: "center"}}>LIMPIAR FILTROS</Text>
                          </Pressable>

                        </View>

                        <Divider/>
                        
                        <Text>Rango de precio:</Text>

                        <View style={styles.flexDirectionRow}>
                        <TextInput
                            label="Minimo"
                            style={{width:100, marginRight: 40}}
                            maxLength={3}
                            onChangeText={(text) => setSelectMin(text)}
                            value={selectMin}
                        />
                        <TextInput
                            label="Máximo"
                            style={{width:100, marginLeft: 40}}
                            maxLength={5}
                            onChangeText={(text) => setSelectMax(text)}
                            value={selectMax}
                        />
                        </View>

                        <Divider/>

                        <Text>Elegir por categoría:</Text>

                        <SelectDropdown                        
                            defaultValueByIndex={selectIndexCategory}
                            renderDropdownIcon={renderIcon}
                            data={[
                                "Seleccionar",
                                "Productos de madera",
                                "Productos textiles",
                                "Productos de barro",
                                "Artesanias de palma",
                                "Instrumentos musicales",
                                "Hogar y muebles"]}
                            buttonStyle={[styles.buttonDropDown, styles.button]}
                            rowTextStyle={styles.buttonTextStyle}
                            rowStyle={styles.dropDownPicker}
                            buttonTextStyle={styles.buttonTextStyle}
                            dropDownStyle={styles.dropDownPicker}
                            onSelect={(selectedItem, index) => {
                                setSelectCategory(selectedItem);
                                setSelectIndexCategory(index);
                            }}
                        />

                        <Divider/>

                        <Text>Elegir por marca:</Text>

                        <SelectDropdown
                            defaultValueByIndex={selectIndexBrand}
                            renderDropdownIcon={renderIcon}
                            data={[
                                "Seleccionar",
                                "tenetur",
                                "mollitia",
                                "repudiandae",
                                "ut",
                                "nesciunt",
                                "consequatur",
                                "ex",
                                "ducimus",
                                "non",
                                "ea",
                                "mollitia",
                                "est",
                                "dicta",
                                "laboriosam",
                                "minima",
                                "molestias",
                                "doloribus",
                                "doloribus",
                                "sequi",
                                "et"]}
                            buttonStyle={[styles.buttonDropDown, styles.button]}
                            rowTextStyle={styles.buttonTextStyle}
                            rowStyle={styles.dropDownPicker}
                            buttonTextStyle={styles.buttonTextStyle}
                            dropDownStyle={styles.dropDownPicker}
                            onSelect={(selectedItem, index) => {
                                setSelectBrand(selectedItem);
                                setSelectIndexBrand(index);
                            }}
                        />

                        <View style={styles.flexDirectionRow}>
                            <Pressable
                                style={[styles.button, styles.buttonAply]}
                                onPress={() => onSearchFilter()}
                            >
                                <Text style={styles.textStyle}>APLICAR CAMBIOS</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>CANCELAR</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )

}

const styles = StyleSheet.create({
    
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    padding: 10,
    borderColor: colors.bgGray
  },
  buttonAply:{
    backgroundColor: colors.primary,
    marginRight: 40
  },
  buttonOpen: {
    backgroundColor: colors.fontBlack,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginHorizontal: 10,
    padding: 10
  },
  buttonClean:{
    marginLeft: 60,
    padding: 10,
    borderRadius: 5
  },
  buttonClose: {
    backgroundColor: colors.fontBlack,
    marginLeft: 40
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  flexDirectionRow:{
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 5
  },
  itemStyle: {
    justifyContent: "flex-start",
  },
  dropDownPicker: {
    backgroundColor: colors.bgGray,
    borderWidth: 1,
    borderColor: colors.bgGray
  },
  labelStyle: {
    color: colors.fontBlack,
  },
  buttonTextStyle: {
    color: colors.fontBlack,
    fontSize: 16
  },
  buttonDropDown:{
    marginBottom: 25,
    marginTop: 5,
    paddingLeft: 15,
    width: 300
  },
})
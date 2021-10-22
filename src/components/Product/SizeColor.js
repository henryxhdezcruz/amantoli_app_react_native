import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import AwesomeIcon from "react-native-vector-icons/FontAwesome"
import colors from "../../styles/colors";
import { map } from "lodash"
import SelectDropdown from 'react-native-select-dropdown'
import { getColorSizeProduct } from "../../api/product";

export default function Size(props) {
  const { productSize } = props;

  const arrSize = map(productSize, "name");
  const arrIdSize = map(productSize, "id");
  
  const [arrSizeColor, setArrSizecolor] = useState([]);

  const renderIcon = () => {
    return (
      <AwesomeIcon size={22} name="angle-down" type="font-awesome" />
    )
  }

  useEffect(() => {
    (async () => {
        const ColorSize = await getColorSizeProduct(arrIdSize[0]);
        setArrSizecolor(map(ColorSize, "name"));
    })();
  }, []);

  return (
    <View>
      <View style={[styles.row, styles.center]}>
        <Text>Talla:  </Text>
        <SelectDropdown
          defaultValueByIndex={0}
          renderDropdownIcon={renderIcon}
          data={arrSize}
          buttonStyle={styles.button1}
          rowTextStyle={styles.buttonTextStyle}
          rowStyle={styles.dropDownPicker}
          buttonTextStyle={styles.buttonTextStyle}
          dropDownStyle={styles.dropDownPicker}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
        />
      </View>
      
      <View style={[styles.row, styles.center]}>
        <Text>Color:  </Text>
        <SelectDropdown
          defaultValueByIndex={0}
          renderDropdownIcon={renderIcon}
          data={arrSizeColor}
          buttonStyle={styles.button2}
          rowTextStyle={styles.buttonTextStyle}
          rowStyle={styles.dropDownPicker}
          buttonTextStyle={styles.buttonTextStyle}
          dropDownStyle={styles.dropDownPicker}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  textTitle: {
    fontSize: 18,
    marginBottom: 5
  },
  row: {
    marginTop: 10,
    flexDirection: "row",
  },
  center: {
    alignItems: "center",
    alignSelf: "center",
  },
  button1: {
    borderRadius: 5,
    width: 200,
    paddingLeft: 15,
    borderWidth: 3,
    borderColor: colors.bgGray
  },
  button2: {
    borderRadius: 5,
    width: 250,
    paddingLeft: 15,
    borderWidth: 3,
    borderColor: colors.bgGray
  }
});

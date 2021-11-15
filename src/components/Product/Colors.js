import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import AwesomeIcon from "react-native-vector-icons/FontAwesome"
import colors from "../../styles/colors";
import { map } from "lodash"
import SelectDropdown from 'react-native-select-dropdown'

export default function Colors(props) {
  const { productColors, setSelectionColor } = props;
 
  const arr = map(productColors, "name");

  const renderIcon = () => {
    return (
      <AwesomeIcon size={22} name="angle-down" type="font-awesome" />
    )
  }

  return (
    <View>
      <SelectDropdown
        defaultValueByIndex={0}
        renderDropdownIcon={renderIcon}
        data={arr}
        buttonStyle={styles.button}
        rowTextStyle={styles.buttonTextStyle}
        rowStyle={styles.dropDownPicker}
        buttonTextStyle={styles.buttonTextStyle}
        dropDownStyle={styles.dropDownPicker}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index)
          setSelectionColor(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          return item
        }}
      />

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
    fontSize: 16
  },
  button: {
    borderRadius: 5,
    paddingLeft: 15,
    borderWidth: 3,
    borderColor: colors.bgGray
  }
});

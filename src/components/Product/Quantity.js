import color from "color";
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AwesomeIcon from "react-native-vector-icons/FontAwesome"
import colors from "../../styles/colors";
import SelectDropdown from 'react-native-select-dropdown'

export default function Quantity(props) {
  const { stock, setSelectionQuantity } = props;

  function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx);
  }
  stockint = parseInt(stock);
  var arr = range(1, stockint);

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
          setSelectionQuantity(selectedItem);
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
  containerStyle: {
    height: 40,
    width: 60,
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
  },
  button: {
    borderRadius: 5,
    width: 100,
    paddingLeft: 15,
    borderWidth: 3,
    borderColor: colors.bgGray
  }
});

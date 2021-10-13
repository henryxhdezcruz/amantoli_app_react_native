import color from "color";
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AwesomeIcon from "react-native-vector-icons/FontAwesome"
import colors from "../../styles/colors";
import SelectDropdown from 'react-native-select-dropdown'

export default function Quantity(props) {
  const { quantity, setQuantity } = props;
  const countries = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

  const renderIcon = () => {
    return (
      <AwesomeIcon size={22} name="angle-down" type="font-awesome" />
    )
  }

  return (
    <View /*style={{ zIndex: 2 }}*/ >
      {/* <DropDownPicker
        items={[
          {
            label: "1",
            value: 1,
          },
          {
            label: "2",
            value: 2,
          },
          {
            label: "3",
            value: 3,
          },
        ]}
        defaultValue={quantity}
        containerStyle={styles.containerStyle}
        itemStyle={styles.itemStyle}
        dropDownStyle={styles.dropDownPicker}
        style={styles.dropDownPicker}
        labelStyle={styles.labelStyle}
        onChangeItem={(item) => setQuantity(item.value)}
      /> */}

      <SelectDropdown
        defaultValueByIndex={0}
        renderDropdownIcon={renderIcon}
        data={countries}
        buttonStyle={styles.button}
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
    //backgroundColor: colors.bgwhite,
    borderRadius: 5,
    width: 100,
    paddingLeft: 15,
    borderWidth: 3,
    borderColor: colors.bgGray
  }
});

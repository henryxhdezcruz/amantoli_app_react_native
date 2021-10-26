import React from 'react'
import { StatusBar, SafeAreaView } from 'react-native'
import { color } from 'react-native-elements/dist/helpers';
import colors from '../styles/colors'

export default function StatusBarCustom(props) {

    const { backgroundColor, ...rest } = props;

    return (
        <>
            <StatusBar backgroundColor={colors.bgDark} {...rest} />
            <SafeAreaView
                style={{
                    flex: 0,
                    backgroundColor: colors.bgDark,
                }}
            />
        </>
    )
}

import React, { useState, useMemo, useEffect } from 'react';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from "react-native-paper"
import jwtDecode from 'jwt-decode';
import AppNavigation from "./src/navigation/AppNavigation"
import DrawerNavigation from './src/navigation/DrawerNavigation';
import DrawerNavigationDesign from './src/navigation/DrawerNavigationDesign';
import AuthScreen from "./src/screens/Auth"
import AuthContext from "./src/context/AuthContext"
import { setTokenApi, getTokenApi, removeTokenApi } from "./src/api/token"
import { ToastProvider } from 'react-native-fast-toast'
import Toast from 'react-native-toast-message';
import AuthStack from './src/navigation/AuthStack';

export default function App() {

  const [auth, setAuth] = useState(undefined)

  useEffect(() => {
    (async () => {
      const token = await getTokenApi();
      if (token) {
        setAuth({
          token,
          idUser: token,
        });
      } else {
        setAuth(null);
      }
    })()
  }, []);

  const login = (user) => {
    setTokenApi(user.id);
    setAuth({
      token: user.id,
      idUser: user.id
    })
  }
  
  const logout = () => {
    if (auth) {
      removeTokenApi();
      setAuth(null);
    }
  }

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  const fontConfig = {
    web: {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'sans-serif-light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'sans-serif-thin',
        fontWeight: 'normal',
      },
    },
    ios: {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'sans-serif-light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'sans-serif-thin',
        fontWeight: 'normal',
      },
    },
    android: {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'sans-serif-light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'sans-serif-thin',
        fontWeight: 'normal',
      },
    }
  };

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#404040',
      secondary: '#404040',
      accent: '#F97316',
    },
    fonts: configureFonts(fontConfig),
  };

  return (
    <ToastProvider>
      <AuthContext.Provider value={authData}>
        <PaperProvider theme={theme}>
          {auth ? <DrawerNavigationDesign /> : <AuthStack/>}
        </PaperProvider>
      </AuthContext.Provider>
    </ToastProvider>
  );
}
/*AuthScreen*/
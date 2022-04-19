import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Logo, LogoutItem } from "./src/components";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Colors } from "./src/shared/constants/colors";
import {
  Home,
  Bets,
  Account,
  Login,
  ChangePassword,
  Register,
  ResetPassword,
} from "./src/screens";
import { createStackNavigator } from "@react-navigation/stack";
import { IStackScreenProps } from "./src/shared/interfaces/NavigationProps";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, {
  cartActions,
  gamesActions,
  loginActions,
} from "./src/shared/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { IRootState } from "./src/shared/interfaces";
import AppLoading from "expo-app-loading";
import { RootSiblingParent } from "react-native-root-siblings";
import { AppStyle } from "./AppStyle";

function Root() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isLogged = useSelector((state: IRootState) => state.login.isLogin);
  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();

  const DrawerNavigation: React.FunctionComponent<IStackScreenProps> = ({
    navigation,
  }) => {
    async function logout() {
      navigation.navigate("Login");
      await AsyncStorage.removeItem("token");
      dispatch(loginActions.isLoginHandler());
      dispatch(loginActions.clearToken());
      dispatch(cartActions.clearCart());
      dispatch(gamesActions.clearData());
    }

    return (
      <Drawer.Navigator
        screenOptions={{
          headerStyle: AppStyle.header,
          headerTintColor: Colors.green400,
          headerTitleAlign: "left",
          headerTitleStyle: { color: Colors.gray800 },
          headerRight: () => <Logo />,
          headerRightContainerStyle: AppStyle.rightHeaderConainer,
          drawerActiveTintColor: Colors.green500,
        }}
        drawerContent={(props) => (
          <View style={AppStyle.drawerConainer}>
            <View>
              <DrawerItemList {...props} />
            </View>
            <LogoutItem onPress={logout} />
          </View>
        )}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            drawerIcon: ({ color, size }) => (
              <SimpleLineIcons name="home" size={size} color={color} />
            ),
            drawerLabelStyle: { fontWeight: "bold", fontSize: 16 },
            drawerStyle: { paddingVertical: 30 },
          }}
        />
        <Drawer.Screen
          name="Bets"
          component={Bets}
          options={{
            drawerIcon: ({ color, size }) => (
              <SimpleLineIcons
                name="game-controller"
                size={size}
                color={color}
              />
            ),
            drawerLabelStyle: { fontWeight: "bold", fontSize: 16 },
            drawerStyle: { paddingVertical: 30 },
          }}
        />
        <Drawer.Screen
          name="Account"
          component={Account}
          options={{
            drawerIcon: ({ color, size }) => (
              <SimpleLineIcons name="user" size={size} color={color} />
            ),
            drawerLabelStyle: { fontWeight: "bold", fontSize: 16 },
            drawerStyle: { paddingVertical: 30 },
          }}
        />
      </Drawer.Navigator>
    );
  };

  useEffect(() => {
    async function getToken() {
      const haveToken = await AsyncStorage.getItem("token");
      if (haveToken) {
        dispatch(loginActions.setToken({ token: haveToken }));
        dispatch(loginActions.isLoginHandler());
      }
      setIsLoading(false);
    }
    getToken();
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isLogged ? "Drawer" : "Login"}
      >
        <Stack.Screen name="Login">
          {(props) => <Login {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Register">
          {(props) => <Register {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ResetPassword">
          {(props) => <ResetPassword {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ChangePassword">
          {(props) => <ChangePassword {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Drawer">
          {(props) => <DrawerNavigation {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <RootSiblingParent>
        <Provider store={store}>
          <Root />
        </Provider>
      </RootSiblingParent>
    </>
  );
}


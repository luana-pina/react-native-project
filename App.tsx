import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Logo from "./components/Header/Logo";
import { SimpleLineIcons } from "@expo/vector-icons";
import LogoutItem from "./components/UI/LogoutItem";
import { Colors } from "./src/shared/constants/colors";
import {
  Home,
  Bets,
  Account,
  Login,
  ChangePassword,
  Register,
} from "./src/screens";
import { createStackNavigator } from "@react-navigation/stack";
import { IStackScreenProps } from "./src/shared/interfaces/NavigationProps";

export default function App() {
  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();

  const DrawerNavigation: React.FunctionComponent<IStackScreenProps> = () => (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: Colors.green400,
        headerTitleAlign: "left",
        headerTitleStyle: { color: Colors.gray800 },
        headerRight: () => <Logo />,
        headerRightContainerStyle: styles.rightHeaderConainer,
        drawerActiveTintColor: Colors.green500,
      }}
      drawerContent={(props) => (
        <View style={styles.drawerConainer}>
          <View>
            <DrawerItemList {...props} />
          </View>
          <LogoutItem />
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
            <SimpleLineIcons name="game-controller" size={size} color={color} />
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

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login">
            {(props) => <Login {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Register">
            {(props) => <Register {...props} />}
          </Stack.Screen>
          <Stack.Screen name="ChangePassword">
            {(props) => <ChangePassword {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Drawer" options={{ headerShown: false }}>
            {(props) => <DrawerNavigation {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.background400,
    height: 110,
  },
  rightHeaderConainer: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  drawerConainer: {
    flex: 1,
    marginTop: 70,
    marginBottom: 30,
    height: "100%",
    justifyContent: "space-between",
  },
});

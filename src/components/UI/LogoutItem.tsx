import { DrawerItem } from "@react-navigation/drawer";
import { SimpleLineIcons } from "@expo/vector-icons";

function LogoutItem(props: { onPress: () => void }) {
  return (
    <DrawerItem
      icon={({ color, size }) => (
        <SimpleLineIcons name="logout" size={size} color={color} />
      )}
      label="Logout"
      onPress={props.onPress}
    />
  );
}

export default LogoutItem;

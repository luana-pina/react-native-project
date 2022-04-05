import { DrawerItem } from "@react-navigation/drawer";
import { SimpleLineIcons } from "@expo/vector-icons";

function LogoutItem() {
  return (
    <DrawerItem
      icon={({ color, size }) => (
        <SimpleLineIcons name="logout" size={size} color={color} />
      )}
      label="Logout"
      onPress={() => {}}
    />
  );
}

export default LogoutItem;

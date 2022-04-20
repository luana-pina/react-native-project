import { Text, View } from "react-native";
import {
  AuthButton,
  Card,
  NoGames,
  PressableFeedback,
  Title,
} from "@components/index";
import { FlatList } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@constants/colors";
import { useSelector } from "react-redux";
import { IRootState } from "@interfaces/index";
import { convertToReal, gameCardRender } from "@utils/index";
import { cartStyle } from "./styles";

const Cart: React.FC<{ onClose: Function; onSave: Function }> = ({
  onClose,
  onSave,
}) => {
  const cartGames = useSelector((state: IRootState) => state.cart.cardGames);
  const totalCart = useSelector((state: IRootState) => state.cart.totalAmound);

  return (
    <>
      <Card
        style={[cartStyle.modalView, { backgroundColor: Colors.white }]}
        borderRadiusBottomNone
      >
        <View style={cartStyle.titleCartView}>
          <PressableFeedback
            onPress={() => {
              onClose();
            }}
          >
            <MaterialCommunityIcons
              name="close"
              size={25}
              color={Colors.green500}
            />
          </PressableFeedback>
          <Title text="CART" size={18} />
        </View>
        {cartGames.length > 0 ? (
          <FlatList
            listKey="cardBets"
            data={cartGames}
            keyExtractor={(item) => String(item.id)}
            renderItem={(itemData) => gameCardRender(itemData, true)}
            style={cartStyle.betsContainer}
          />
        ) : (
          <NoGames />
        )}
        <View style={{ flexDirection: "row", width: "100%" }}>
          <Title text="CART" size={18} />
          <Text style={cartStyle.totalCart}>
            TOTAL: R${convertToReal(totalCart)}
          </Text>
        </View>
      </Card>
      <Card
        style={[cartStyle.modalView, cartStyle.saveCartButton]}
        borderRadiusTopNone
      >
        <AuthButton
          text="Save"
          onPress={() => {
            onSave();
          }}
          color={Colors.green500}
        />
      </Card>
    </>
  );
};

export default Cart;

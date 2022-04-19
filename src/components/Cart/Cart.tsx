import { StyleSheet, Text, View } from "react-native";
import {
  AuthButton,
  Card,
  NoGames,
  PressableFeedback,
  Title,
} from "../../components/index";
import { FlatList } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../shared/constants/colors";
import { useSelector } from "react-redux";
import { IRootState } from "../../shared/interfaces";
import { convertToReal, gameCardRender } from "../../shared/utils";

const Cart: React.FC<{ onClose: Function; onSave: Function }> = ({
  onClose,
  onSave,
}) => {
  const cartGames = useSelector((state: IRootState) => state.cart.cardGames);
  const totalCart = useSelector((state: IRootState) => state.cart.totalAmound);

  return (
    <>
      <Card
        style={[styles.modalView, { backgroundColor: Colors.white }]}
        borderRadiusBottomNone
      >
        <View style={styles.titleCartView}>
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
            style={styles.betsContainer}
          />
        ) : (
          <NoGames />
        )}
        <View style={{ flexDirection: "row", width: "100%" }}>
          <Title text="CART" size={18} />
          <Text style={styles.totalCart}>
            TOTAL: R${convertToReal(totalCart)}
          </Text>
        </View>
      </Card>
      <Card
        style={[styles.modalView, styles.saveCartButton]}
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

const styles = StyleSheet.create({
  totalCart: {
    fontSize: 18,
    fontStyle: "italic",
    color: Colors.gray800,
    marginLeft: 4,
  },
  modalView: {
    width: 300,
    paddingHorizontal: 20,
  },
  saveCartButton: {
    backgroundColor: Colors.background500,
    borderTopColor: Colors.background700,
    borderTopWidth: 1,
    paddingBottom: 30,
  },
  titleCartView: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  betsContainer: {
    marginVertical: 20,
    maxHeight: 300,
    width: "100%",
  },
});

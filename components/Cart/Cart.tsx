import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { DUMMY_BETS } from "../../src/shared/providers/data";
import { gameCardRender } from "../../src/shared/utils/gameCartRender";
import PressableFeedback from "../PressableFeedback";
import AuthButton from "../UI/Butons/AuthButton";
import Card from "../UI/Card";
import Title from "../UI/Title";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../src/shared/constants/colors";

const Cart: React.FC<{ onClose: Function; onSave: Function }> = ({
  onClose,
  onSave,
}) => {
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
        <FlatList
          listKey="cardBets"
          data={DUMMY_BETS}
          keyExtractor={(item) => String(item.id)}
          renderItem={(itemData) => gameCardRender(itemData, true)}
          style={styles.betsContainer}
        />
        <View style={{ flexDirection: "row", width: "100%" }}>
          <Title text="CART" size={18} />
          <Text style={styles.totalCart}>TOTAL: R${"7,00"}</Text>
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
    maxWidth: 255,
  },
});

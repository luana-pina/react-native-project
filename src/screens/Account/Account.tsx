import {
  FlatList,
  Image,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInputEndEditingEventData,
  View,
} from "react-native";
import Base from "../../../components/Base/Base";
import Card from "../../../components/UI/Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../shared/constants/colors";
import Input from "../../../components/Input/Input";
import { useState } from "react";
import { DUMMY_BETS } from "../../shared/providers/data";
import { stringToArray } from "../../shared/utils/stringToArray";
import GameCard from "../../../components/GameCard/Gamecard";
import { convertDate } from "../../shared/utils/convertData";
import { ScrollView } from "react-native-gesture-handler";
import Title from "../../../components/UI/Title";

const Account: React.FC = () => {
  const [userName, setUserName] = useState("Luana Pina");
  const [userEmail, setUserEmail] = useState("luanagpina@gmail.com");
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [isdisabled, setIsdisabled] = useState<boolean>(true);

  function gameCardRender(itemData: any) {
    const convertFormat = {
      ...itemData.item,
      choosen_numbers: stringToArray(itemData.item.choosen_numbers),
    };
    return (
      <GameCard
        item={convertFormat}
        key={itemData.item.id}
        createAt={convertDate(itemData.item.created_at)}
      />
    );
  }

  return (
    <Base>
      <Card>
        <View style={styles.editIconContainer}>
          {isdisabled ? (
            <Pressable onPress={() => setIsdisabled(false)}>
              <MaterialCommunityIcons
                name="account-edit-outline"
                size={24}
                color={Colors.gray700}
              />
            </Pressable>
          ) : (
            <>
              <Pressable onPress={() => setIsdisabled(true)}>
                <MaterialCommunityIcons
                  name="cancel"
                  size={24}
                  color={Colors.error500}
                />
              </Pressable>
              <Pressable onPress={() => setIsdisabled(true)}>
                <MaterialCommunityIcons
                  name="content-save-edit-outline"
                  size={24}
                  color={Colors.green500}
                  style={{ marginLeft: 10 }}
                />
              </Pressable>
            </>
          )}
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/user.png")}
            style={styles.userImage}
          />
        </View>
        <View style={styles.inputsContainer}>
          <Input
            label="Name:"
            value={userName}
            isInvalid={isInvalid}
            onUpdateValue={(e) => console.log(e)}
            labelSize={17}
            disabled={isdisabled}
          />
          <Input
            label="Email:"
            value={userEmail}
            isInvalid={false}
            keyboardType="email-address"
            onUpdateValue={(e) => setUserEmail(String(e))}
            labelSize={17}
            disabled={isdisabled}
          />
        </View>
        <Title text="Recent Games:" size={18} style={styles.betsTitle} />
        <ScrollView style={styles.betsContainer}>
          <FlatList
            listKey="bets"
            data={DUMMY_BETS}
            keyExtractor={(item) => String(item.id)}
            renderItem={gameCardRender}
          />
        </ScrollView>
      </Card>
    </Base>
  );
};

export default Account;

const styles = StyleSheet.create({
  imageContainer: { width: 150, height: 150, overflow: "hidden" },
  editIconContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
  },
  userImage: {
    width: "100%",
    height: "100%",
  },
  inputsContainer: {
    paddingTop: 15,
    width: "100%",
  },
  betsContainer: {
    marginTop: 10,
    maxHeight: 250,
  },
  betsTitle: {
    width: "90.5%",
    marginTop: 20,
  },
});

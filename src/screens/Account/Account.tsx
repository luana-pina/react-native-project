import { FlatList, Image, StyleSheet, View } from "react-native";
import Base from "../../../components/Base/Base";
import Card from "../../../components/UI/Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../shared/constants/colors";
import Input from "../../../components/Input/Input";
import { useState } from "react";
import { DUMMY_BETS } from "../../shared/providers/data";
import { ScrollView } from "react-native-gesture-handler";
import Title from "../../../components/UI/Title";
import PressableFeedback from "../../../components/UI/PressableFeedback";
import { gameCardRender } from "../../shared/utils/gameCartRender";
import { isValidInputs } from "../../shared/utils/isValidInpus";

const Account: React.FC = () => {
  const [defaultValue, setDefaultValue] = useState({
    name: "Luana Pina",
    email: "luanagpina@gmail.com",
  });
  const [userName, setUserName] = useState({
    value: defaultValue.name,
    isValid: true,
    invalidText: "",
  });
  const [userEmail, setUserEmail] = useState({
    value: defaultValue.email,
    isValid: true,
    invalidText: "",
  });
  const [isdisabled, setIsdisabled] = useState<boolean>(true);

  function onSaveHandler() {
    const isValidName = isValidInputs({ value: userName.value, type: "name" });
    const isValidEmail = isValidInputs({
      value: userEmail.value,
      type: "email",
    });

    if (isValidEmail.isValid && isValidName.isValid) {
      setDefaultValue({ name: userName.value, email: userEmail.value });
      setIsdisabled(true);
    } else {
      setUserEmail((curEmail) => {
        return {
          value: curEmail.value,
          isValid: isValidEmail.isValid,
          invalidText: isValidEmail.text,
        };
      });
      setUserName((curName) => {
        return {
          value: curName.value,
          isValid: isValidName.isValid,
          invalidText: isValidName.text,
        };
      });
    }
  }

  function onCancelHandler() {
    setUserEmail({
      value: defaultValue.email,
      isValid: true,
      invalidText: "",
    });
    setUserName({
      value: defaultValue.name,
      isValid: true,
      invalidText: "",
    });
    setIsdisabled(true);
  }

  return (
    <Base>
      <Card>
        <View style={styles.editIconContainer}>
          {isdisabled ? (
            <PressableFeedback onPress={() => setIsdisabled(false)}>
              <MaterialCommunityIcons
                name="account-edit-outline"
                size={24}
                color={Colors.gray700}
              />
            </PressableFeedback>
          ) : (
            <>
              <PressableFeedback onPress={onCancelHandler}>
                <MaterialCommunityIcons
                  name="cancel"
                  size={24}
                  color={Colors.error500}
                />
              </PressableFeedback>
              <PressableFeedback onPress={onSaveHandler}>
                <MaterialCommunityIcons
                  name="content-save-edit-outline"
                  size={24}
                  color={Colors.green500}
                  style={{ marginLeft: 10 }}
                />
              </PressableFeedback>
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
            value={userName.value}
            isInvalid={!userName.isValid}
            invalidText={userName.invalidText}
            onUpdateValue={(e) =>
              setUserName({
                value: e,
                isValid: true,
                invalidText: "",
              })
            }
            labelSize={17}
            disabled={isdisabled}
            bottomLine={!isdisabled}
          />
          <Input
            label="Email:"
            value={userEmail.value}
            isInvalid={!userEmail.isValid}
            invalidText={userEmail.invalidText}
            keyboardType="email-address"
            onUpdateValue={(e) =>
              setUserEmail({
                value: e,
                isValid: true,
                invalidText: "",
              })
            }
            labelSize={17}
            disabled={isdisabled}
            bottomLine={!isdisabled}
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

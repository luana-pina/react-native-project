import { FlatList, Image, StyleSheet, View } from "react-native";
import Base from "../../../components/Base/Base";
import Card from "../../../components/UI/Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../shared/constants/colors";
import Input from "../../../components/Input/Input";
import { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Title from "../../../components/UI/Title";
import PressableFeedback from "../../../components/UI/PressableFeedback";
import { gameCardRender } from "../../shared/utils/gameCartRender";
import { isValidInputs } from "../../shared/utils/isValidInpus";
import { useDispatch } from "react-redux";
import { user } from "../../shared/providers";
import { ICardRecentsGames } from "../../shared/interfaces";
import NoGames from "../../../components/NoGames/NoGames";
import { useFocusEffect } from "@react-navigation/native";
import { showToast } from "../../shared/utils/showToast";
import Toast from "react-native-root-toast";

const Account: React.FC = () => {
  const [defaultValue, setDefaultValue] = useState({
    name: "",
    email: "",
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
  const [recentGames, setRecentGames] = useState<ICardRecentsGames[]>([]);
  const { getAccount, updateUser } = user();

  async function onSaveHandler() {
    const isValidName = isValidInputs({ value: userName.value, type: "name" });
    const isValidEmail = isValidInputs({
      value: userEmail.value,
      type: "email",
    });

    if (isValidEmail.isValid && isValidName.isValid) {
      const toast = Toast.show("Loading...", {
        position: 60,
        duration: 100000,
        animation: true,
        backgroundColor: Colors.background700,
        textColor: Colors.gray800,
        textStyle: { fontWeight: "bold" },
      });
      await updateUser({ name: userName.value, email: userEmail.value })
        .then((res) => {
          Toast.hide(toast);
          showToast("User updated successfully", "success");
          setDefaultValue({ name: userName.value, email: userEmail.value });
          setIsdisabled(true);
        })
        .catch((err) => {
          Toast.hide(toast);
          showToast(err.message, "error");
        });
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

  useFocusEffect(
    useCallback(() => {
      async function getAccountData() {
        await getAccount()
          .then(({ data }) => {
            setDefaultValue({ email: data.email, name: data.name });
            setUserName({
              value: data.name,
              isValid: true,
              invalidText: "",
            });
            setUserEmail({
              value: data.email,
              isValid: true,
              invalidText: "",
            });
            const bets: ICardRecentsGames[] = [];
            data.bets.forEach((item: any) => {
              bets.push({ ...item, type: { id: item.game_id } });
            });
            setRecentGames(bets);
          })
          .catch((err) => {
            showToast(err.message, "error");
          });
      }
      getAccountData();
    }, [])
  );

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
        {recentGames.length > 0 ? (
          <ScrollView style={styles.betsContainer}>
            <FlatList
              listKey="bets"
              data={recentGames}
              keyExtractor={(item) => String(item.id)}
              renderItem={gameCardRender}
            />
          </ScrollView>
        ) : (
          <NoGames />
        )}
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

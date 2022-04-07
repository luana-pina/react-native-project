import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { IGame } from "../../../../src/shared/interfaces/Games";

const GameButton: React.FunctionComponent<{
  game: IGame;
  gamePage?: boolean;
  onPress: Function;
}> = ({ game, gamePage, onPress }) => {
  const [pressStyle, setPressStyle] = useState<{
    text: Object;
    container: Object;
  }>({
    text: { color: game.color },
    container: { backgroundColor: Colors.white, borderColor: game.color },
  });
  const [isPressed, setIsPressed] = useState<boolean>(false);

  function pressHandler() {
    setIsPressed(!isPressed);
    onPress();
  }

  useEffect(() => {
    console.log(game.color);
    if (!gamePage) {
      if (isPressed) {
        setPressStyle({
          text: { color: Colors.white },
          container: { backgroundColor: game.color, borderColor: game.color },
        });
      } else {
        setPressStyle({
          text: { color: game.color },
          container: { backgroundColor: Colors.white, borderColor: game.color },
        });
      }
    }
  }, [isPressed]);

  return (
    <Pressable
      onPress={() => {
        pressHandler();
      }}
    >
      <View style={[styles.buttonContainer, pressStyle.container]}>
        <Text style={[styles.buttonText, pressStyle.text]}>{game.type}</Text>
      </View>
    </Pressable>
  );
};

export default GameButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: 100,
    height: 35,
    borderWidth: 3,
    borderRadius: 50,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
  },
});

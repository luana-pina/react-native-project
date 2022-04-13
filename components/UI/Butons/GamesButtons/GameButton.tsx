import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../src/shared/interfaces";
import { IGame } from "../../../../src/shared/interfaces/Games";

const GameButton: React.FunctionComponent<{
  game: IGame;
  gamePage?: boolean;
  options?: number[];
  onPress: Function;
}> = ({ game, gamePage, onPress, options }) => {
  const [pressStyle, setPressStyle] = useState<{
    text: Object;
    container: Object;
  }>({
    text: { color: game.color },
    container: { backgroundColor: Colors.white, borderColor: game.color },
  });
  const gameSelectedId = useSelector(
    (state: IRootState) => state.games.gameSelected.id
  );

  function pressHandler() {
    onPress(game.id);
  }

  useEffect(() => {
    if (!gamePage) {
      if (options?.some((item) => item === game.id)) {
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
    } else {
      if (gameSelectedId === game.id) {
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
  }, [options]);

  return (
    <View style={[styles.buttonContainer, pressStyle.container]}>
      <Pressable
        onPress={() => {
          pressHandler();
        }}
        android_ripple={{ color: game.color }}
        style={({ pressed }) => (pressed ? { opacity: 0.5 } : {})}
      >
        <View style={styles.container}>
          <Text style={[styles.buttonText, pressStyle.text]}>{game.type}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default GameButton;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 35,
    justifyContent: "center",
    borderRadius: 50,
  },
  buttonContainer: {
    borderWidth: 3,
    overflow: "hidden",
    borderRadius: 50,
    marginRight: 20,
    marginTop: 5,
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
  },
});

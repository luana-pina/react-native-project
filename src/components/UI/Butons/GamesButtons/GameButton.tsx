import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../shared/interfaces";
import { IGame } from "../../../../shared/interfaces/Games";
import { gameButtonStyle } from "./styles";

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
    <View style={[gameButtonStyle.buttonContainer, pressStyle.container]}>
      <Pressable
        onPress={() => {
          pressHandler();
        }}
        android_ripple={{ color: game.color }}
        style={({ pressed }) => (pressed ? { opacity: 0.5 } : {})}
      >
        <View style={gameButtonStyle.container}>
          <Text style={[gameButtonStyle.buttonText, pressStyle.text]}>
            {game.type}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default GameButton;

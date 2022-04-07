import { StyleSheet, Text, View } from "react-native";
import Base from "../../../components/Base/Base";
import GamesButtons from "../../../components/UI/Butons/GamesButtons/GamesButtons";
import Title from "../../../components/UI/Title";

const Home: React.FC = () => {
  return (
    <Base>
      <Title text="RECENT GAMES" size={20} />
      <GamesButtons onPress={() => {}} />
    </Base>
  );
};

export default Home;

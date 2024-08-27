import { Pressable } from "react-native";
import { FullArrowLeftSvg } from "~/assets/svg";
import { dsColor } from "~/designSystem";
import { useMainNavigation } from "~/hooks";

export const BackButton = ({ style = {}, ...props }) => {
  const { goBack } = useMainNavigation();

  return (
    <Pressable
      hitSlop={20}
      onPress={() => goBack()}
      style={[{}, style]}
      {...props}
    >
      <FullArrowLeftSvg width={20} height={20} fill={dsColor.BLACK} />
    </Pressable>
  );
};

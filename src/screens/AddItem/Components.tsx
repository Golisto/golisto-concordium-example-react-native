import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  Layout,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import { BackButton } from "~/components/NavigationComponents";
import {
  cssLikePadding,
  dsColor,
  DsColorName,
  DsFormFieldError,
  DsText,
  DsTypoName,
} from "~/designSystem";
import { contentWidth, defaultMargin } from "~/styles/sizes";

interface ListItemProps {
  icon?: React.ReactNode;
  category: string;
  description?: string | React.ReactNode;
  value?: string | React.ReactNode;
  onPress: (category: string) => void;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({
  icon,
  value,
  category,
  description,
  onPress,
  children,
  style,
}) => {
  return (
    <>
      <RectButton
        onPress={() => onPress(category)}
        style={[
          {
            minHeight: 57,
            paddingVertical: 16,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: defaultMargin,
          },
          style,
        ]}
      >
        {icon}
        {!!(category || description) && (
          <View style={{ marginRight: 48, flex: 1 }}>
            {!!category && (
              <DsText variant={DsTypoName.LABEL}>{category}</DsText>
            )}
            {!!description && typeof description === "string" && (
              <DsText gray variant={DsTypoName.SMALL_1}>
                {description}
              </DsText>
            )}
            {!!description && typeof description !== "string" && description}
          </View>
        )}
        {!!value && (
          <View style={{ marginRight: 12 }}>
            {typeof value === "string" ? <DsText>{value}</DsText> : value}
          </View>
        )}
        {children}
      </RectButton>
      <View
        style={{
          borderBottomColor: dsColor.GRAY_40,
          borderBottomWidth: 1,
          width: contentWidth,
          marginLeft: defaultMargin,
        }}
      ></View>
    </>
  );
};

export const ListNavigationItem: React.FC<ListItemProps> = (props) => {
  return (
    <ListItem {...props}>
      <Ionicons name="chevron-forward" size={24} color={dsColor.GRAY_70} />
    </ListItem>
  );
};

export const ListSelectItem: React.FC<
  ListItemProps & { selected: boolean }
> = ({ selected, ...props }) => {
  return (
    <ListItem {...props}>
      <View
        style={{
          height: 24,
          width: 24,
          borderRadius: 12,
          borderColor: selected ? dsColor.PRIMARY : dsColor.GRAY_70,
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!!selected && (
          <Animated.View
            entering={ZoomIn}
            exiting={ZoomOut}
            style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderColor: dsColor.PRIMARY,
              borderWidth: 1,
              backgroundColor: dsColor.PRIMARY,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Animated.View
              entering={ZoomIn.delay(100)}
              exiting={ZoomOut}
              style={{
                width: 9,
                height: 9,
                borderRadius: 6,
                backgroundColor: "white",
              }}
            ></Animated.View>
          </Animated.View>
        )}
      </View>
    </ListItem>
  );
};

export const AddItemHeader = ({ title }) => {
  return (
    <View
      style={{
        marginTop: 24,
        marginHorizontal: 24,
      }}
    >
      <BackButton style={{ marginBottom: 12 }} />
      <DsText variant={DsTypoName.HEADING_5}>{title}</DsText>
    </View>
  );
};

export const AddDetailButton: React.FC<{
  onPress: () => void;
  isEmpty?: boolean;
  errorObject?: any;
  children: ReactNode;
}> = ({ isEmpty = false, children, onPress, errorObject }) => {
  return (
    <>
      <RectButton
        onPress={onPress}
        style={{
          borderColor: dsColor.GRAY_70,
          borderWidth: 1,
          borderRadius: 4,
          height: 40,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 12,
        }}
      >
        <DsText variant={DsTypoName.LABEL} gray={isEmpty}>
          {children}
        </DsText>
        <Ionicons
          name="chevron-forward"
          size={24}
          color={dsColor.GRAY}
        ></Ionicons>
      </RectButton>
      <View
        style={[
          {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "baseline",
            ...cssLikePadding(0, 8),
          },
        ]}
      >
        <DsFormFieldError error={errorObject} />
      </View>
    </>
  );
};

export const ItemSection = ({ title, children }) => {
  return (
    <Animated.View
      layout={Layout}
      style={{
        marginBottom: 24,
      }}
    >
      <DsText
        variant={DsTypoName.LABEL}
        style={{ marginBottom: 8, marginLeft: 12 }}
      >
        {title}
      </DsText>
      {children}
    </Animated.View>
  );
};

export const ItemDetailField: React.FC<{
  label: string;
  value?: string | null;
  onPress: () => void;
  onDelete?: () => void;
}> = ({ label, value, onDelete, onPress }) => {
  if (!label) {
    return null;
  }
  return (
    <Animated.View layout={Layout} entering={FadeIn}>
      <RectButton
        onPress={onPress}
        style={{
          borderColor: dsColor.GRAY_70,
          borderWidth: 1,
          borderRadius: 10,
          height: 40,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 12,
          marginBottom: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {onDelete ? (
            <TouchableOpacity onPress={onDelete} style={{ marginRight: 8 }}>
              <Ionicons name="remove-circle" size={24} color={dsColor.RED} />
            </TouchableOpacity>
          ) : (
            <Ionicons
              name="add-circle"
              size={24}
              color={dsColor.GREEN}
              style={{ marginRight: 8 }}
            />
          )}
          <DsText variant={DsTypoName.LABEL}>{label}</DsText>
        </View>
        <DsText
          numberOfLines={1}
          style={{ flex: 1, marginLeft: 12, textAlign: "right" }}
          variant={DsTypoName.LABEL}
        >
          {value}
        </DsText>
      </RectButton>
    </Animated.View>
  );
};

export const Pill: React.FC<{
  label: string;
  active?: boolean;
  children?: ReactNode;
}> = ({ children, label, active }) => {
  return (
    <Animated.View
      layout={Layout}
      style={{
        paddingVertical: 7,
        paddingHorizontal: 16,
        backgroundColor: active ? dsColor.YELLOW_40 : dsColor.GRAY_30,
        flexDirection: "row",
        borderRadius: 20,
        marginRight: 12,
        marginBottom: 12,
      }}
    >
      <DsText
        colorName={active ? DsColorName.YELLOW : DsColorName.GRAY}
        semiBold
      >
        {label}
      </DsText>

      {children}
    </Animated.View>
  );
};

export const TagPill: React.FC<{
  label: string;
  onDelete?: () => void;
}> = ({ label, onDelete }) => {
  return (
    <Pill label={label} active>
      {!!onDelete && (
        <TouchableOpacity onPress={onDelete} style={{ marginLeft: 16 }}>
          <Ionicons name="remove" size={24} color={dsColor.YELLOW} />
        </TouchableOpacity>
      )}
    </Pill>
  );
};

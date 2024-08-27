import React from "react";
import { View } from "react-native";
import { DsTypoName, DsColorName, dsColor } from "../../01-quarks";
import { DsText, DsTextProps } from "../DsText";

export interface DsListProps extends Omit<DsTextProps, "variant"> {
  /** List text items. */
  items: string[];
}

/** Plain text component. */
export const DsList: React.FC<DsListProps> = ({ items, style, ...props }) => {
  return (
    <View style={style}>
      {items.map((s, idx) => (
        <View
          key={idx}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 4,
              height: 4,
              borderRadius: 4,
              backgroundColor: dsColor[DsColorName.GRAY],
              marginHorizontal: 12,
            }}
          />
          <DsText
            variant={DsTypoName.BODY}
            colorName={DsColorName.GRAY}
            {...props}
          >
            {s}
          </DsText>
        </View>
      ))}
    </View>
  );
};

import { DsColorName } from "./DsColor.constants";

export const dsColor = Object.freeze<{ [key in DsColorName]: string }>({
  // Primary
  [DsColorName.PRIMARY]: "#ceb063",
  [DsColorName.PRIMARY_70]: "#dcc791",
  [DsColorName.PRIMARY_40]: "#ebdfc1",
  [DsColorName.HEADER_COLOR]: "rgb(250,248,244)",
  // Green
  [DsColorName.GREEN]: "#77ce63",
  [DsColorName.GREEN_10]: "#77ce631a",
  [DsColorName.GREEN_70]: "#96d398",
  [DsColorName.GREEN_40]: "#c3e6c4",
  // Red
  [DsColorName.RED]: "#d14444",
  [DsColorName.RED_70]: "#de7c7c",
  [DsColorName.RED_40]: "#edb4b4",
  [DsColorName.RED_10]: "#ce63631a",
  // yellow
  [DsColorName.YELLOW]: "#ceb063",
  [DsColorName.YELLOW_40]: "#faf8f4",
  // Gray
  [DsColorName.GRAY]: "#aaaaaa",
  [DsColorName.GRAY_80]: "rgba(170, 170, 170, 0.8)",
  [DsColorName.GRAY_70]: "#dddddd",
  [DsColorName.GRAY_40]: "#f5f5f5",
  [DsColorName.GRAY_30]: "#f8f8f8",
  // Black
  [DsColorName.BLACK]: "#2a2a2a",
  [DsColorName.BLACK_70]: "#646464",
  [DsColorName.BLACK_40]: "#a7a7a7",
  [DsColorName.BLACK_TRUE]: "#000000",
  // White
  [DsColorName.WHITE]: "#ffffff",
  [DsColorName.WHITE_DIRTY]: "#faf8f4",
  [DsColorName.WHITE_DIRTIER]: "#ebebeb",
  // 3rd party
  [DsColorName.FACEBOOK]: "#3b5998",
  [DsColorName.GOOGLE_PLUS]: "#dd4b39",
  [DsColorName.TWITTER]: "#4099ff",
  [DsColorName.PINTEREST]: "#bd081c",
  [DsColorName.MESSENGER]: "#027fff",
});

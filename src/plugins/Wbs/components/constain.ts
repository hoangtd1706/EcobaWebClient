const getTextColor = (color: string) => `color: ${color};`;
const getBgColor = (color: string) => `background: ${color};`;

export type colorStyleProps = {
  bgColor?: "primary" | "secondary" | "success" | "danger" | "info";
  color?: "primary" | "secondary" | "success" | "danger" | "info";
};

export type textStyleProps = {
  textAlign?: "center" | "left" | "right";
  fontWeight?: "bold" | 400 | 600 | 700 | 900;
};

export const backgroundColor = (bgColor: string): string =>
  bgColor == "primary"
    ? `${getBgColor("#377ed7")}`
    : bgColor == "secondary"
    ? `${getBgColor("#f1f1f1")}`
    : bgColor == "success"
    ? `${getBgColor("#056341cc")}`
    : `${getBgColor("black")}`;

export const textColor = (color: string): string =>
  color == "primary"
    ? `${getTextColor("#377ed7")}`
    : color == "secondary"
    ? `${getTextColor("#414141")}`
    : color == "success"
    ? `${getTextColor("#ffffff")}`
    : `${getTextColor("black")}`;

import React from "react";
import { TypoStyle, TypoStyleProps } from "./typoType";

export type TypoProps = TypoStyleProps & {
    children: string | JSX.Element;
};

export default function Typography({ children, color, fontWeight, justifyContent, size, letterCase }: TypoProps): JSX.Element {
    return (
        <TypoStyle fontWeight={fontWeight} color={color} justifyContent={justifyContent} size={size} letterCase={letterCase}>
            {children}
        </TypoStyle>
    )
}
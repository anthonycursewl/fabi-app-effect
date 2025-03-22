import { Text, Animated } from "react-native";

type TextWithColorProps = {
    children: any;
    color?: string;
    style?: any
    isAnimated?: boolean
}

export default function TextWithColor({ children, color = 'black', style, isAnimated = false }: TextWithColorProps) {
    if (isAnimated) {
        return (
            <Animated.Text style={[{ fontFamily: 'OnestRegular', color: color }, style]}>{children}</Animated.Text>
        )
    }

    return (
        <Text style={{ fontFamily: 'OnestRegular', color: color, ...style }}>{children}</Text>
    )
}
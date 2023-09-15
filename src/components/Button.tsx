import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends Omit<TouchableOpacityProps, "children"> {
  text: string;
  textStyle?: StyleProp<TextStyle>;
}

const Button = ({ textStyle, text, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity {...props}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

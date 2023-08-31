import React, { useEffect, useRef, useState } from "react";
import { TextInput, TextInputProps } from "react-native";

const AutoExpandingTextInput = ({ style, ...props }: TextInputProps) => {
  const [height, setHeight] = useState(8);
  const [lineCount, setLineCount] = useState(0);

  return (
    <TextInput
      {...props}
      multiline={true}
      onContentSizeChange={(event) => {
        event.persist();
        if (
          !props.numberOfLines ||
          lineCount < props.numberOfLines ||
          (event.nativeEvent && event.nativeEvent.contentSize.height < height)
        ) {
          setHeight(event.nativeEvent.contentSize.height);
          setLineCount((prev) =>
            event.nativeEvent.contentSize.height < height ? prev - 1 : prev + 1
          );
        }
      }}
      style={[style, { height: height }]}
    />
  );
};

export default AutoExpandingTextInput;

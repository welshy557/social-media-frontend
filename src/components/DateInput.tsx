import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
interface DateInputProps {
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
}

const DateInput = ({ date, setDate }: DateInputProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (date?: Date) => {
    if (date) setDate(date);
    setShowDatePicker(false);
  };

  const onOpenDatePicker = () => {
    if (!date) setDate(new Date());
    setShowDatePicker(true);
  };

  return (
    <View style={styles.dateDisplayContainer}>
      <TouchableOpacity style={styles.input} onPress={() => onOpenDatePicker()}>
        <TextInput
          placeholder="Date of Birth"
          placeholderTextColor="grey"
          style={styles.dateInput}
          value={date?.toLocaleDateString() ?? ""}
          editable={false}
          selectTextOnFocus={false}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.clearDateButton}
        onPress={() => setDate(null)}
        disabled={date === null}
      >
        <MaterialIcons name="clear" size={24} color={date ? "white" : "grey"} />
      </TouchableOpacity>
      {showDatePicker && date && (
        <RNDateTimePicker
          value={date}
          onChange={(_, date) => onDateChange(date)}
          display="spinner"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateDisplayContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  dateInput: {
    color: "white",
  },

  clearDateButton: {
    position: "absolute",
    right: 10,
  },
  input: {
    flex: 1,
    color: "white",
    minWidth: "65%",
    maxWidth: "65%",
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "grey",
    padding: 8,
  },
});

export default DateInput;

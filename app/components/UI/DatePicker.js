import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.dateContainer}>
      <TouchableOpacity style={styles.dateBtn} onPress={showDatePickerModal}>
        <Text style={styles.textDateBtn}>Data de nascimento</Text>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "calendar"}
            onChange={onDateChange}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  dateContainer: {
    width: 315,
    padding: 20,
  },
  dateBtn: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 100,
    padding: 10,
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },
  textDateBtn: {
    fontSize: 20,
    color: "#787373",
  },
});

import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = (props) => {
  const strDate = {
    day: `${props.state.getDate()}`.padStart(2, "0"),
    month: `${props.state.getMonth() + 1}`.padStart(2, "0"),
    year: `${props.state.getFullYear()} `,
  };

  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    props.setState(currentDate);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.dateContainer}>
      <Text
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: 16,
          marginBottom: 10,
        }}
      >
        Data de nascimento
      </Text>
      <Button
        mode="text"
        icon="calendar"
        contentStyle={{
          borderRadius: 100,
          backgroundColor: "white",
          width: 250,
        }}
        onPress={showDatePickerModal}
      >
        {`${strDate.day}/${strDate.month}/${strDate.year}`}
        {/* <Text
          style={styles.textDateBtn}
        >{`${strDate.day}/${strDate.month}/${strDate.year}`}</Text> */}
      </Button>
      {showDatePicker && (
        <DateTimePicker
          value={props.state}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "calendar"}
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  dateContainer: {
    marginTop: 20,
    width: 315,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  textDateBtn: {
    fontSize: 18,
    color: "black",
    fontWeight: "normal",
  },
});

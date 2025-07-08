import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, SafeAreaView } from 'react-native';

// --- Props Interface ---
interface ModernDatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  style?: object;
  buttonStyle?: object;
  buttonTextStyle?: object;
  placeholder?: string;
  locale?: string; // e.g., 'es-ES', 'en-US'
  accentColor?: string; // e.g., '#007AFF', '#FF6347'
}

// --- Constants for Styling ---
const COLORS = {
  primary: '#007AFF', // Default accent color (Apple Blue)
  textPrimary: '#1C1C1E',
  textSecondary: '#8A8A8E',
  background: '#F2F2F7',
  white: '#FFFFFF',
  separator: '#E5E5EA',
  disabled: '#C7C7CC',
};

const ModernDatePicker: React.FC<ModernDatePickerProps> = ({
  selectedDate = new Date(),
  onDateChange,
  minimumDate,
  maximumDate,
  style,
  buttonStyle,
  buttonTextStyle,
  placeholder = 'Seleccionar fecha',
  locale = 'es-ES',
  accentColor = COLORS.primary,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  // We use a temporary date state for the picker to not update the parent state until confirmation
  const [pickerDate, setPickerDate] = useState<Date>(selectedDate || new Date());

  useEffect(() => {
    // Sync picker date if the external selectedDate changes
    setPickerDate(selectedDate || new Date());
  }, [selectedDate]);
  
  const currentMonth = pickerDate.getMonth();
  const currentYear = pickerDate.getFullYear();

  // Memoize calendar data to avoid recalculations on every render
  const calendarData = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Internationalization for month and weekday names
    const monthName = new Intl.DateTimeFormat(locale, { month: 'long' }).format(pickerDate);
    const weekdays = [...Array(7).keys()].map(dayIndex => 
      new Intl.DateTimeFormat(locale, { weekday: 'narrow' }).format(new Date(2023, 0, dayIndex + 1))
    );

    return { firstDayOfMonth, daysInMonth, monthName, weekdays };
  }, [currentMonth, currentYear, locale]);

  const isDateDisabled = (date: Date): boolean => {
    const startOfDay = (d: Date) => new Date(d.setHours(0, 0, 0, 0));
    const endOfDay = (d: Date) => new Date(d.setHours(23, 59, 59, 999));
    
    if (minimumDate && date < startOfDay(minimumDate)) return true;
    if (maximumDate && date > endOfDay(maximumDate)) return true;
    return false;
  };
  
  const handleDaySelect = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    if (!isDateDisabled(newDate)) {
      setPickerDate(newDate);
    }
  };

  const changeMonth = (increment: number) => {
    const newDate = new Date(pickerDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setPickerDate(newDate);
  };

  const handleConfirm = () => {
    onDateChange(pickerDate);
    setModalVisible(false);
  };
  
  const handleCancel = () => {
    // Reset picker date to the original selected date
    setPickerDate(selectedDate || new Date());
    setModalVisible(false);
  };

  const renderDays = () => {
    const days = [];
    // Empty cells for padding
    for (let i = 0; i < calendarData.firstDayOfMonth; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }
    // Day cells
    for (let day = 1; day <= calendarData.daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isSelected = day === pickerDate.getDate();
      const isDisabled = isDateDisabled(date);

      days.push(
        <TouchableOpacity
          key={day}
          style={styles.dayCell}
          onPress={() => handleDaySelect(day)}
          disabled={isDisabled}
        >
          <View style={[
              styles.dayTextContainer,
              isSelected && { backgroundColor: accentColor },
          ]}>
            <Text style={[
              styles.dayText,
              isDisabled && styles.disabledDayText,
              isSelected && styles.selectedDayText,
            ]}>
              {day}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return days;
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return placeholder;
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <View style={style}>
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.buttonText, buttonTextStyle]}>
          🗓️ {formatDate(selectedDate)}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
        statusBarTranslucent={true}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={handleCancel} />
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.grabber} />

            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.navButton}>
                <Text style={[styles.navButtonText, { color: accentColor }]}>‹</Text>
              </TouchableOpacity>
              <Text style={styles.monthYear}>
                {calendarData.monthName.charAt(0).toUpperCase() + calendarData.monthName.slice(1)} {currentYear}
              </Text>
              <TouchableOpacity onPress={() => changeMonth(1)} style={styles.navButton}>
                <Text style={[styles.navButtonText, { color: accentColor }]}>›</Text>
              </TouchableOpacity>
            </View>
            
            {/* Weekday Headers */}
            <View style={styles.daysHeader}>
              {calendarData.weekdays.map((day, index) => (
                <Text key={index} style={styles.dayHeader}>
                  {day}
                </Text>
              ))}
            </View>
            
            {/* Calendar Grid */}
            <View style={styles.daysContainer}>
              {renderDays()}
            </View>
            
            {/* Footer Buttons */}
            <View style={styles.footer}>
              <TouchableOpacity style={styles.footerButton} onPress={handleCancel}>
                <Text style={[styles.footerButtonText, { color: accentColor }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.footerButton, styles.confirmButton, { backgroundColor: accentColor }]} onPress={handleConfirm}>
                <Text style={[styles.footerButtonText, styles.confirmButtonText]}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // --- Trigger Button ---
  button: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.separator,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  // --- Modal ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  grabber: {
    width: 40,
    height: 5,
    backgroundColor: COLORS.separator,
    borderRadius: 2.5,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  // --- Calendar Header ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  navButton: {
    padding: 10,
  },
  navButtonText: {
    fontSize: 32,
    fontWeight: '300',
  },
  monthYear: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  // --- Calendar Grid ---
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.separator,
  },
  dayHeader: {
    width: '14.28%',
    textAlign: 'center',
    fontWeight: '500',
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 10,
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayTextContainer: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  dayText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  selectedDayText: {
    color: COLORS.white,
    fontWeight: '700',
  },
  disabledDayText: {
    color: COLORS.disabled,
  },
  // --- Footer ---
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.separator,
    gap: 12,
  },
  footerButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 17,
    fontWeight: '600',
  },
  confirmButton: {
    // backgroundColor is set inline via accentColor
  },
  confirmButtonText: {
    color: COLORS.white,
  },
});

export default ModernDatePicker;
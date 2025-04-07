import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  Easing,
  Image,
} from 'react-native';
import TextWithColor from './TextWithColor';

// Obtener el ancho de la pantalla para hacerlo adaptable (opcional)
const SCREEN_WIDTH = Dimensions.get('window').width;

const DEFAULT_HEIGHT = 45;
const DEFAULT_WIDTH_PERCENTAGE = 0.9; // 90% del ancho de pantalla
const DEFAULT_THUMB_SIZE = 58; // Ligeramente menor que la altura

interface SlideButtonProps {
  title?: string; // Texto dentro del track (e.g., "Desliza para confirmar")
  thumbIcon?: React.ReactNode;
  onSlideSuccess: () => void; // Función a llamar cuando se completa el deslizamiento
  height?: number;
  width?: number;
  thumbSize?: number;
  trackColor?: string;
  thumbColor?: string;
  textColor?: string;
  successThresholdPercent?: number; // Qué % debe deslizar para éxito (0 a 1)
  disabled?: boolean;
}

const SlideButton: React.FC<SlideButtonProps> = ({
  title = 'Deslizar',
  thumbIcon = <TextWithColor style={styles.thumbText}>{'>'}</TextWithColor>,
  onSlideSuccess,
  height = DEFAULT_HEIGHT,
  width = SCREEN_WIDTH * DEFAULT_WIDTH_PERCENTAGE,
  thumbSize = DEFAULT_THUMB_SIZE,
  trackColor = '#e0e0e0',
  thumbColor = 'rgb(155, 128, 255)',
  textColor = 'rgb(80, 80, 80)',
  successThresholdPercent = 0.7,
  disabled = false,
}) => {
  const [slideComplete, setSlideComplete] = useState(false);
  const viewWidth = useRef(width);
  const movableAreaWidth = useRef(0); 

  const translateX = useRef(new Animated.Value(0)).current;

  const resetSlider = useCallback(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => setSlideComplete(false));
  }, [translateX]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return !disabled && !slideComplete && Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 5;
      },
      onPanResponderGrant: () => {
      },
      onPanResponderMove: (_, gestureState) => {
        if (disabled || slideComplete) return;

        const newX = Math.max(0, Math.min(gestureState.dx, movableAreaWidth.current));
        translateX.setValue(newX);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (disabled || slideComplete) return;

        const endX = gestureState.dx;
        const threshold = movableAreaWidth.current * successThresholdPercent;

        if (endX >= threshold) {
          setSlideComplete(true);
          Animated.timing(translateX, {
            toValue: movableAreaWidth.current,
            duration: 150,
            easing: Easing.ease,
            useNativeDriver: false,
          }).start(() => {
            onSlideSuccess();
          });
        } else {
          Animated.spring(translateX, {
            toValue: 0, 
            bounciness: 5,
            useNativeDriver: false,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
         if (!slideComplete) {
           resetSlider();
         }
      }
    })
  ).current;

  const handleLayout = (event: any) => {
    const { width: measuredWidth } = event.nativeEvent.layout;
    viewWidth.current = measuredWidth; 
    movableAreaWidth.current = measuredWidth - thumbSize;
  };

  const animatedThumbStyle = {
    transform: [{ translateX: translateX }],
    backgroundColor: disabled ? '#aaa' : thumbColor,
  };

  const animatedTextStyle = {
     opacity: disabled ? 0.5 : translateX.interpolate({
         inputRange: [0, movableAreaWidth.current * 0.5], 
         outputRange: [1, 0],
         extrapolate: 'clamp', 
     }),
  };

  return (
    <View
      style={[
        styles.track,
        {
          height,
          width,
          backgroundColor: trackColor,
          opacity: disabled ? 0.6 : 1,
        },
      ]}
      onLayout={handleLayout}
    >

      {/* Texto dentro del track (detrás del pulgar) */}
      <TextWithColor style={[styles.trackText, { color: textColor }, animatedTextStyle]} isAnimated>
        {title}
      </TextWithColor>

      {/* Pulgar deslizable */}
      <Animated.View
        style={[
          styles.thumb,
          { height: thumbSize, width: thumbSize, borderRadius: 12 },
          animatedThumbStyle,
        ]}
        {...panResponder.panHandlers}
      >
        {thumbIcon}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    borderRadius: DEFAULT_HEIGHT / 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  trackText: {
    position: 'absolute', 
    fontSize: 14,
    color: 'rgb(255, 255, 255)',
  },
  thumb: {
    position: 'absolute',
    left: 0, 
    top: (DEFAULT_HEIGHT - DEFAULT_THUMB_SIZE) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  thumbText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SlideButton;
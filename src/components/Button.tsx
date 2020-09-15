import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

type ButtonProps = {
  label: string
  variant: "default" | "primary"
  onPress: () => void
}

const Button: React.FC<ButtonProps> = ({ variant, label, onPress }) => {
  const backgroundColor = variant === 'primary' ? '#2CB9B0' : 'rgba(12, 13, 52, 0.05)'; 
  const color = variant === 'primary' ? 'white' : '#0C0D34'; 

  return (
    <RectButton 
      style={[styles.container, { backgroundColor } ]}
      {...{onPress}}  
    >
      <View>
        <Text style={[styles.label, { color } ]}>{label}</Text>
      </View>
    </RectButton>
  )
}

Button.defaultProps = {
  variant: 'default'
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25, 
    height: 50, 
    width: 245,
    alignItems: 'center', 
    justifyContent: 'center'
  }, 
  label: {
    fontSize: 15, 
    fontFamily: "SFProText-Regular", 
    textAlign: 'center'
  }
})

export default Button; 

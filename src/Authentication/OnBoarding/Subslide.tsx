import React from 'react';
import { Text, View, StyleSheet } from 'react-native'; 

//components import 
import Button from '../../components/Button'; 

type SubslideProps = {
  subtitle: string;
  description: string;
  last?: boolean;
  onPress: () => void
}

const Subslide: React.FC<SubslideProps> = ({description, subtitle, last, onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.description}>{description}</Text>
      <Button 
        label={last ? `Let's get started` : `Next`}
        variant={last ? 'primary' : 'default'}
        {...{onPress}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 44
  }, 
  subtitle: {
    fontFamily: 'SFProText-Semibold',
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 12,
    color: '#0C0D34',
    textAlign: 'center'
  }, 
  description: {
    fontFamily: 'SFProText-Regular',
    fontSize: 16, 
    lineHeight: 26,
    color: '#0C0D34',
    textAlign: 'center', 
    marginBottom: 46
  }
})

export default Subslide; 
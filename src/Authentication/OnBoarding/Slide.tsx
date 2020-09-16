import React from 'react'; 
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';

interface SlideProps {
  title: string
  right?: boolean
  picture: string
}

const { width, height } = Dimensions.get('window')
export const SLIDE_HEIGHT = 0.61 * height


const Slide: React.FC<SlideProps> = ({ title, right, picture }) => {
  const transform = [
    { translateY: (SLIDE_HEIGHT - 100)/2 },
    { translateX: right ? (width / 2 - 50) : (-width / 2 + 50) },
    { rotate: right ? '-90deg' : '90deg' }
  ]

  return (
    <View style={ styles.container }> 
      <View style={styles.underlay}>
        <Image source={picture} style={styles.picture} />
      </View>
      <View style={ [styles.titleContainer, { transform }]}>
        <Text style={ styles.title }>
          { title }
        </Text> 
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width, 

  },
  titleContainer: {
    height: 100,
    justifyContent: 'center', 
  },
  title: {
    fontSize: 70, 
    lineHeight: 70,
    fontFamily: 'SFProText-Bold', 
    color: 'white',
    textAlign: 'center'
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined, 
    height: undefined
  }
})

export default Slide; 
import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import {Animated as AnimatedTS} from 'react-native-reanimated'; 

import Slide, { SLIDE_HEIGHT } from './Slide';
import Subslide from './Subslide';

const { width } = Dimensions.get('window')

interface ComponentNameProps {};

const BORDER_RADIUS = 75;
const slides = [
  { 
    title: 'Relaxed', 
    subtitle: 'Find Your Outfist', 
    description: `Confused about your outfit? Don't worry! Find the best outfit here!`, 
    color: '#BFEAF5' 
  }, 
  { 
    title: 'Playful',  
    subtitle: `Here it First, Where it first`, 
    description: `Heting the clothes in your wardrobe? Explore hundreds of outfit ideas`,
    color: '#BEECC4' 
  },
  { 
    title: 'Excentric', 
    subtitle: 'Your Style, Your Way', 
    description: `Create your individual & unique style and look amazing everyday`,
    color: '#FFE4D9' 
  },
  { 
    title: 'Funky',  
    subtitle: `Look Good, Feel Good`, 
    description: `Discover the latest trands in fashion and explore your personality`, 
    color: '#FFDDDD' 
  },
]

const OnBoarding: React.FC<ComponentNameProps> = () => {
  const scroll = useRef<AnimatedTS.ScrollView>(null); 
  const x = useRef(new Animated.Value(0)).current; 
  const onScroll = Animated.event([{ 
    nativeEvent: {
      contentOffset: {
        x: x
      }
    }
  }])

  const backgroundColor = x.interpolate({
    inputRange: slides.map((_, i) => i * width), 
    outputRange: slides.map(({ color }) => color),
  }); 

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <Animated.ScrollView 
          ref={scroll}
          horizontal 
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          onScroll={onScroll}
        >
          {
            slides.map(({ title }, index) => (
              <Slide key={index} {...{ title }} right={!!(index % 2)} />
            ))
          }
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View 
          style={{ ...StyleSheet.absoluteFillObject, backgroundColor }} 
        />
        <Animated.View style={
          [
            styles.footerContent, 
            { 
              width: width * slides.length, 
              flex: 1,
              transform: [{ translateX: Animated.multiply(x, -1) }]
            }
          ]
        }>
          {
            slides.map(({ subtitle, description }, index) => (
              <Subslide 
                key={index}
                last={index === slides.length - 1}
                onPress={() => {
                  if (scroll.current) {
                    scroll.current.getNode().scrollTo({ x: width * (index + 1), animated: true })
                  }
                }}
                {...{ subtitle, description }}
              />
            ))
          }
        </Animated.View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS
  },
  footer: {
    flex: 1,
  }, 
  footerContent: {
    flex: 1, 
    flexDirection: 'row', 
    backgroundColor: 'white', 
    borderTopLeftRadius: BORDER_RADIUS,
  }
})

export default OnBoarding;
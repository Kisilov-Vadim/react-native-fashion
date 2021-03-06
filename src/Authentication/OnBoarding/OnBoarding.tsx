import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { divide } from "react-native-reanimated"
import { interpolateColor, onScrollEvent, useValue } from 'react-native-redash/lib/module/v1'; 

import Slide, { SLIDE_HEIGHT } from './Slide';
import Subslide from './Subslide';
import Dot from '../../components/Dot';

const { width } = Dimensions.get('window')

interface ComponentNameProps {};

const BORDER_RADIUS = 75;
const slides = [
  { 
    title: 'Relaxed', 
    subtitle: 'Find Your Outfist', 
    description: `Confused about your outfit? Don't worry! Find the best outfit here!`, 
    color: '#BFEAF5', 
    picture: require('../../../assets/1.png')
  }, 
  { 
    title: 'Playful',  
    subtitle: `Here it First, Where it first`, 
    description: `Heting the clothes in your wardrobe? Explore hundreds of outfit ideas`,
    color: '#BEECC4', 
    picture: require('../../../assets/2.png')
  },
  { 
    title: 'Excentric', 
    subtitle: 'Your Style, Your Way', 
    description: `Create your individual & unique style and look amazing everyday`,
    color: '#FFE4D9', 
    picture: require('../../../assets/3.png') 
  },
  { 
    title: 'Funky',  
    subtitle: `Look Good, Feel Good`, 
    description: `Discover the latest trands in fashion and explore your personality`, 
    color: '#FFDDDD', 
    picture: require('../../../assets/4.png')
  },
]

const OnBoarding: React.FC<ComponentNameProps> = () => {
  const scroll = useRef<Animated.ScrollView>(null); 
  const x = useValue(0); 
  const onScroll = onScrollEvent({ x })

  const backgroundColor = interpolateColor(x, {
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
            slides.map(({ title, picture }, index) => (
              <Slide key={index} {...{ title, picture }} right={!!(index % 2)} />
            ))
          }
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View 
          style={{ ...StyleSheet.absoluteFillObject, backgroundColor }} 
        />
        <View style={styles.footerContent}>
          <View style={styles.pagination}>
            {
              slides.map((_, index) => <Dot key={index} currentIndex={divide(x, width)} {...{index}} />)
            }
          </View>
          <Animated.View style={{ 
              width: width * slides.length, 
              flex: 1,
              flexDirection: 'row',
              transform: [{ translateX: Animated.multiply(x, -1) }]
            }}
          >
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
    borderBottomRightRadius: BORDER_RADIUS,
    overflow: 'hidden'
  },
  footer: {
    flex: 1,
  }, 
  footerContent: {
    flex: 1,
    backgroundColor: 'white', 
    borderTopLeftRadius: BORDER_RADIUS,
  }, 
  pagination: {
    ...StyleSheet.absoluteFillObject, 
    height: BORDER_RADIUS, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    width
  }
})

export default OnBoarding;
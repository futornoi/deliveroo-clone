import React from 'react'
import { SafeAreaView } from 'react-native'
import { COLOR } from '../constants'
import { Image as AnimImage, Text as AnimText } from 'react-native-animatable'
import { Circle } from 'react-native-progress'

const PreparingOrderScreen = () => (
  <SafeAreaView
    className="flex-1 justify-center items-center"
    style={{ backgroundColor: COLOR.green }}
  >
    <AnimImage
      source={require('../../assets/orderLoading.gif')}
      animation="slideInUp"
      iterationCount={1}
      className="h-96 w-96"
    />
    <AnimText
      className="text-lg px-5 my-10 text-white font-bold text-center"
      iterationCount={1}
      animation="slideInUp"
    >
      Waiting for Restaurant to accept your order!
    </AnimText>
    <Circle size={60} indeterminate={true} color="white" />
  </SafeAreaView>
)

export default PreparingOrderScreen

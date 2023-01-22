import React from 'react'
import { SafeAreaView } from 'react-native'
import { CircleSnail } from 'react-native-progress'
import { COLOR } from '../../constants'

const Preloader = () => (
  <SafeAreaView className="flex-row h-full justify-center items-center">
    <CircleSnail size={60} color={COLOR.green} indeterminate />
  </SafeAreaView>
)

export default Preloader

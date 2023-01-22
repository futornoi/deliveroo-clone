import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { formatToGBP } from '../helpers'
import { COLOR } from '../constants'
import { useBasket } from '../provider/BasketProvider'
import { useNavigation } from '@react-navigation/native'

const BasketButton = () => {
  const navigation = useNavigation()
  const { getAllItems, getBasketTotalPrice } = useBasket()
  const totalCount = getAllItems.length

  if (totalCount < 1) {
    return null
  }

  const goToBasket = () => navigation.navigate('Basket')

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={goToBasket}
        activeOpacity={0.8}
        className="mx-5 p-4 rounded-lg flex-row items-center space-x-1"
        style={{ backgroundColor: COLOR.green }}
      >
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">
          {totalCount}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">View Basket</Text>
        <Text className="text-lg text-white font-extrabold">
          {formatToGBP(getBasketTotalPrice)}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default BasketButton

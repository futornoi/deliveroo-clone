import React, { useCallback, useEffect, useState } from 'react'
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { COLOR } from '../constants'
import { XCircleIcon } from 'react-native-heroicons/mini'
import { useBasket } from '../provider/BasketProvider'
import { useNavigation } from '@react-navigation/native'
import DefaultImage from '../components/ui/DefaultImage'
import { formatToGBP } from '../helpers'
import { getRestaurantsById } from '../api/queries'
import Preloader from '../components/ui/Preloader'

const Basket = () => {
  const { getBasketByRestaurant, getBasketTotalPrice, removeFromBasket } = useBasket()
  const { goBack, navigate } = useNavigation()
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const deliveryPrice = 5.99

  const onRemoveProduct = id => () => removeFromBasket(id)
  const goToOrderScreen = () => navigate('Delivery', { data: restaurants })

  const getRestaurantsInfo = async ids => {
    try {
      const data = await getRestaurantsById(ids)
      setRestaurants(data)
    } catch (error) {
      Alert.alert('Error: ', error.message)
    } finally {
      setLoading(false)
    }
  }

  const getRestaurantNameById = useCallback(
    id => restaurants?.find(restaurant => restaurant.id === id).name,
    [restaurants.length],
  )

  useEffect(() => {
    getRestaurantsInfo(Object.keys(getBasketByRestaurant))
  }, [])

  if (loading) return <Preloader />

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b bg-white shadow-xs" style={{ borderColor: COLOR.green }}>
          <Text className="text-lg font-bold text-center">Basket</Text>
          <TouchableOpacity
            onPress={goBack}
            className="rounded-full bg-gray-100 absolute top-4 right-5"
          >
            <XCircleIcon color={COLOR.green} size={35} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <DefaultImage classNames="h-7 w-7 bg-gray-300 p-4 rounded-full" />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text style={{ color: COLOR.green }}>Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="divide-y divide-gray-100">
          {Object.entries(getBasketByRestaurant)?.map(([id, products]) => (
            <View key={id}>
              <View className="bg-white py-2">
                <Text className="text-gray-500 text-center text-lg">
                  {getRestaurantNameById(id)}
                </Text>
              </View>
              {Object.entries(products)?.map(([id, items]) => (
                <View key={id} className="flex-row items-center space-x-3 bg-white py-2 px-5">
                  <Text className="mr-3" style={{ color: COLOR.green }}>
                    {items.length} x
                  </Text>
                  <DefaultImage image={items[0].image} classNames="h-12 w-12 rounded-full" />
                  <Text className="flex-1">{items[0].name}</Text>
                  <Text className="text-gray-600">{formatToGBP(items[0].price)}</Text>
                  <TouchableOpacity onPress={onRemoveProduct(id)}>
                    <Text className="text-xs" style={{ color: COLOR.green }}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">{formatToGBP(getBasketTotalPrice)}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Free</Text>
            <Text className="text-gray-400">{formatToGBP(deliveryPrice)}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">
              {formatToGBP(getBasketTotalPrice + deliveryPrice)}
            </Text>
          </View>

          <TouchableOpacity
            onPress={goToOrderScreen}
            className="rounded-lg p-4"
            style={{ backgroundColor: COLOR.green }}
          >
            <Text className="text-center text-white text-lg font-bold">Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Basket

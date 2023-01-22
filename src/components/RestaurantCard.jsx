import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StarIcon } from 'react-native-heroicons/mini'
import { MapPinIcon } from 'react-native-heroicons/outline'
import DefaultImage from './ui/DefaultImage'

const RestaurantCard = ({ id, imgUrl, title, rating, genre, address }) => {
  const navigation = useNavigation()

  const goToRestaurantPage = () => navigation.navigate('Restaurant', { id })

  return (
    <TouchableOpacity onPress={goToRestaurantPage} className="mr-3 shadow">
      <DefaultImage classNames="h-36 w-64 rounded-sm" image={imgUrl} />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text> • {genre}
          </Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <MapPinIcon color="gray" opacity={0.4} size={22} />
          <Text className="text-xs text-gray-500">Nearby • {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default RestaurantCard

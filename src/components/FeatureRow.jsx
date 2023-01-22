import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import { COLOR } from '../constants'

const FeatureRow = ({ title, description, restaurants }) => (
  <View>
    <View className="mt-4 flex-row items-center justify-between px-4">
      <Text className="font-bold text-lg">{title}</Text>
      <ArrowRightIcon color={COLOR.green} />
    </View>
    <Text className="text-xs text-gray-500 px-4">{description}</Text>

    <ScrollView
      className="pt-4"
      horizontal
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      showsHorizontalScrollIndicator={false}
    >
      {restaurants?.map(restaurant => (
        <RestaurantCard
          key={restaurant.id}
          id={restaurant.id}
          imgUrl={restaurant.image}
          title={restaurant.name}
          rating={restaurant.rating}
          genre={restaurant.type.name}
          address={restaurant.address}
        />
      ))}
    </ScrollView>
  </View>
)

export default FeatureRow

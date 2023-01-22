import { SafeAreaView, ScrollView, StatusBar, Text, TextInput, View } from 'react-native'
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeatureRow from '../components/FeatureRow'
import { useEffect, useState } from 'react'
import { getAllCategories, getAllFeatured } from '../api/queries'
import { COLOR } from '../constants'
import DefaultImage from '../components/ui/DefaultImage'

const HomeScreen = () => {
  const [featuredCards, setFeaturedCards] = useState([])
  const [categoryCards, setCategoryCards] = useState([])

  const getFeaturedCategories = async () => {
    const [featured, categories] = await Promise.all([getAllFeatured(), getAllCategories()])
    setFeaturedCards(featured)
    setCategoryCards(categories)
  }

  useEffect(() => {
    getFeaturedCategories()
  }, [])

  return (
    <SafeAreaView className="bg-white">
      <View className="pt-3">
        {/* HEADER */}
        <View className="flex-row pb-3 items-center mx-4 space-x-2">
          <DefaultImage classNames="h-7 w-7 rounded-full" />
          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">Delivery Now!</Text>
            <Text className="font-bold text-xl">
              Current Location
              <ChevronDownIcon size={20} color={COLOR.green} />
            </Text>
          </View>
          <UserIcon size={30} color={COLOR.green} />
        </View>
        {/*SEARCH*/}
        <View className="flex-row items-center space-x-2 pb-2 mx-4">
          <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
            <MagnifyingGlassIcon color={COLOR.green} />
            <TextInput placeholder="Restaurants and cuisines" keyboardType="default" />
          </View>
          <AdjustmentsVerticalIcon color={COLOR.green} />
        </View>
      </View>
      {/*BODY*/}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/*CATEGORIES*/}
        <Categories categories={categoryCards} />
        {/*FEATURED*/}
        {featuredCards?.map(category => (
          <FeatureRow
            key={category.id}
            restaurants={category.restaurants}
            description={category.shortDescription}
            title={category.name}
          />
        ))}
      </ScrollView>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  )
}

export default HomeScreen

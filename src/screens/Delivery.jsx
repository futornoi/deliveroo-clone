import React, { useEffect, useMemo, useState } from 'react'
import { Alert, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { COLOR } from '../constants'
import { XCircleIcon } from 'react-native-heroicons/mini'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Bar } from 'react-native-progress'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_API_KEY } from '@env'
import * as Location from 'expo-location'
import PreparingOrderScreen from './PreparingOrderScreen'
import DefaultImage from '../components/ui/DefaultImage'

import riderImage from '../../assets/rider.jpeg'

const Delivery = () => {
  const { navigate } = useNavigation()
  const { params } = useRoute()
  const [currLocation, setCurrLocation] = useState(null)
  const restaurants = params.data

  const restaurantNames = useMemo(
    () => params.data.map(restaurant => restaurant.name).join(', '),
    [restaurants.length],
  )

  const mapOrigin = { latitude: restaurants[0].lat, longitude: restaurants[0].long }
  const mapWaypoints = restaurants
    .slice(1)
    .map(restaurant => ({ latitude: restaurant.lat, longitude: restaurant.long }))

  const goToHome = () => navigate('Home')

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied')
      goToHome()
      return
    }

    const location = await Location.getCurrentPositionAsync({})
    setCurrLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    })
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  if (!currLocation) return <PreparingOrderScreen />

  return (
    <View className="flex-1" style={{ backgroundColor: COLOR.green }}>
      <SafeAreaView className="z-10">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={goToHome}>
            <XCircleIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help</Text>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6 z-10 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimate Arrival</Text>
              <Text className="text-3xl font-bold">45-55 Minutes</Text>
            </View>
            <Image source={{ uri: 'https://links.papareact.com/fls' }} className="h-20 w-20" />
          </View>
          <Bar size={30} color={COLOR.green} indeterminate={true} />
          <Text className="mt-3 text-gray-500">
            Your {restaurants.length === 1 ? 'order' : 'orders'} at {restaurantNames} is being
            prepared
          </Text>
        </View>
      </SafeAreaView>

      {currLocation && (
        <MapView
          initialRegion={{
            ...currLocation,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          className="flex-1 -mt-10 z-0"
          mapType="mutedStandard"
          zoomEnabled
        >
          {restaurants.map(restaurant => (
            <Marker
              key={restaurant.id}
              coordinate={{ latitude: restaurant.lat, longitude: restaurant.long }}
              title={restaurant.name}
              description={restaurant.shortDescription}
              identifier={restaurant.name}
              pinColor={COLOR.green}
            />
          ))}
          <Marker coordinate={currLocation} title="You" identifier="You" pinColor="#FC6A03" />
          <MapViewDirections
            apikey={GOOGLE_API_KEY}
            origin={mapOrigin}
            waypoints={mapWaypoints}
            destination={currLocation}
            strokeWidth={3}
            strokeColor={COLOR.green}
          />
        </MapView>
      )}

      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <DefaultImage
          defaultImage={riderImage}
          classNames="h-12 w-12 bg-gray-500 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Maksim Futornoi</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>
        <Text className="text-lg mr-5 font-bold" style={{ color: COLOR.green }}>
          Call
        </Text>
      </SafeAreaView>
    </View>
  )
}

export default Delivery

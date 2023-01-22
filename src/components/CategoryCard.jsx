import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'
import { urlFor } from '../api/sanity'

import categoryImage from '../../assets/wallpaper_pink.jpeg'

const exampleImageUri = Image.resolveAssetSource(categoryImage).uri

const CategoryCard = ({ imgUrl, title }) => (
  <TouchableOpacity className="relative mr-2">
    <Image
      className="w-20 h-20 rounded"
      source={{ uri: imgUrl ? urlFor(imgUrl).width(200).url() : exampleImageUri }}
    />
    <Text className="absolute left-1 bottom-1 text-white font-bold">{title}</Text>
  </TouchableOpacity>
)

export default CategoryCard

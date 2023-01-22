import React from 'react'
import { Image } from 'react-native'
import { urlFor } from '../../api/sanity'

import categoryImage from '../../../assets/defaultAvatar.jpeg'

const DefaultImage = ({ classNames, image, defaultImage }) => {
  const exampleImageUri = Image.resolveAssetSource(defaultImage ?? categoryImage).uri

  return (
    <Image
      className={classNames ?? ''}
      source={{ uri: image ? urlFor(image).url() : exampleImageUri }}
    />
  )
}

export default DefaultImage

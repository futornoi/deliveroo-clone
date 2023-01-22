import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import DefaultImage from './ui/DefaultImage'
import { formatToGBP } from '../helpers'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { COLOR } from '../constants'
import { useBasket } from '../provider/BasketProvider'

const DishRow = props => {
  const { name, description, price, image, id, restaurantId } = props
  const [isPressed, setIsPressed] = useState(false)
  const { getAllItemsById, addToBasket, removeFromBasket } = useBasket()

  const gridItemsInCard = getAllItemsById(id).length
  const hasInCard = gridItemsInCard > 0

  const handleOnPress = () => setIsPressed(prev => !prev)

  const onIncrementBasket = () => addToBasket({ ...props, restaurantId })
  const onDecrementBasket = () => {
    if (gridItemsInCard === 0) setIsPressed(false)
    if (!hasInCard) return

    removeFromBasket(id)
  }

  return (
    <>
      <TouchableOpacity
        onPress={handleOnPress}
        className={`bg-white border p-4 border-gray-200 ${
          (isPressed || hasInCard) && 'border-b-0'
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">{formatToGBP(price)}</Text>
          </View>
          <View>
            <DefaultImage
              classNames="h-20 w-20 bg-gray-300 p-4 border border-[#F3F3F4]"
              image={image}
            />
          </View>
        </View>
      </TouchableOpacity>

      {(isPressed || hasInCard) && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity onPress={onDecrementBasket}>
              <MinusCircleIcon color={hasInCard ? COLOR.green : 'gray'} size={40} />
            </TouchableOpacity>
            <Text>{gridItemsInCard}</Text>
            <TouchableOpacity onPress={onIncrementBasket}>
              <PlusCircleIcon color={COLOR.green} size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  )
}

export default DishRow

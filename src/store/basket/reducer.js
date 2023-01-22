const BasketActions = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
}

export const basketReducer = (state, action) => {
  switch (action.type) {
    case BasketActions.ADD:
      return {
        ...state,
        items: [...state.items, action.payload],
      }
    case BasketActions.REMOVE:
      const index = state.items.findIndex(item => item.id === action.payload.id)

      let newBasket = [...state.items]

      if (index !== -1) {
        newBasket.splice(index, 1)
      } else {
        console.warn(`Cant remove product (id: ${action.payload.id}) as its not in basket!`)
      }

      return {
        ...state,
        items: newBasket,
      }
    default:
      return state
  }
}

export const selectBasketItems = state => state.items
export const selectBasketItemsById = (state, id) => state.items.filter(item => item.id === id)
export const selectBasketTotal = state =>
  state.items.reduce((total, item) => (total += item.price), 0)
export const selectBasketByRestaurant = state =>
  state.items.reduce((acc, currItem) => {
    const restaurantGroup = currItem.restaurantId
    const idGroup = currItem.id
    acc[restaurantGroup] = acc[restaurantGroup] || {}
    acc[restaurantGroup][idGroup] = acc[restaurantGroup][idGroup] || []
    acc[restaurantGroup][idGroup].push(currItem)
    return acc
  }, {})

export const addToBasketAction = item => ({ type: BasketActions.ADD, payload: item })
export const removeFromBasketAction = id => ({ type: BasketActions.REMOVE, payload: { id } })

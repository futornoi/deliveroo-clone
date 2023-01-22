import { createContext, useCallback, useContext, useMemo, useReducer } from 'react'
import {
  addToBasketAction,
  basketReducer,
  removeFromBasketAction,
  selectBasketByRestaurant,
  selectBasketItems,
  selectBasketItemsById,
  selectBasketTotal,
} from '../store/basket/reducer'

const initialBasketState = {
  items: [],
}

const BasketContext = createContext()

export const BasketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(basketReducer, initialBasketState)

  const getAllItems = useMemo(() => selectBasketItems(state), [state.items])

  const getAllItemsById = useCallback(id => selectBasketItemsById(state, id), [state.items])

  const getBasketTotalPrice = useMemo(() => selectBasketTotal(state), [state.items])

  const getBasketByRestaurant = useMemo(() => selectBasketByRestaurant(state), [state.items])

  const actions = {
    getAllItems,
    getAllItemsById,
    getBasketTotalPrice,
    getBasketByRestaurant,
    addToBasket: item => dispatch(addToBasketAction(item)),
    removeFromBasket: id => dispatch(removeFromBasketAction(id)),
  }

  return <BasketContext.Provider value={actions}>{children}</BasketContext.Provider>
}

export const useBasket = () => useContext(BasketContext)

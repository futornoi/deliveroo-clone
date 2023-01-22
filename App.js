import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Basket, Delivery, HomeScreen, RestaurantScreen } from './src/screens'
import { BasketProvider } from './src/provider/BasketProvider'

const Stack = createNativeStackNavigator()

const App = () => (
  <BasketProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Restaurant" component={RestaurantScreen} />
        <Stack.Screen name="Basket" options={{ presentation: 'modal' }} component={Basket} />
        <Stack.Screen
          name="Delivery"
          options={{ presentation: 'fullScreenModal' }}
          component={Delivery}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </BasketProvider>
)

export default App

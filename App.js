import React, {useState} from 'react'
import {View, StatusBar} from 'react-native'
import {NavigationContainer, DefaultTheme} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack'
import HomeScreen from './src/screen/HomeScreen'
import ProfileScreen from './src/screen/ProfileScreen'
import LoginScreen from './src/screen/LoginScreen'
import http from './src/lib/http'
import openApi from './src/config/openApi'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

export default function App() {
  let [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    // 获取临时token
    http
      .post(
        '/token',
        http.stringify({
          client_id: openApi.cilentId,
          client_secret: openApi.clientSecret,
          grant_type: 'client_credentials'
        })
      )
      .then(res => {
        global._token1 = res.data.access_token
        setIsLoading(false)
      })

    return <View />
  }

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: 'white'
          }
        }}>
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }}>
          <Stack.Screen name="首页" component={Root} />
          <Stack.Screen name="Login" options={{title: '登录'}} component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

/**
 * Tab栏
 */
function Root({navigation: stackNavigation}) {
  const tabPressListener = title => {
    stackNavigation.setOptions({
      title
    })
  }

  const tabs = [
    {name: 'Home', title: '首页', component: HomeScreen},
    {name: 'Profile', title: '我的', component: ProfileScreen}
  ]

  return (
    <Tab.Navigator>
      {tabs.map(item => {
        return (
          <Tab.Screen
            key={item.name}
            name={item.name}
            options={{title: item.title}}
            component={item.component}
            listeners={{tabPress: () => tabPressListener(item.title)}}
          />
        )
      })}
    </Tab.Navigator>
  )
}

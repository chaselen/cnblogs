import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import ItemSeparator from '../component/ItemSeparator'

export default function ProfileScreen() {
  const items = [
    {
      id: '1',
      title: '我的收藏'
    },
    {
      id: '2',
      title: '我的文摘'
    }
  ]

  const _renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <Text>{item.title}</Text>
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>
      <FlatList data={items} renderItem={_renderItem} scrollEnabled={false} ItemSeparatorComponent={ItemSeparator} />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    height: 44,
    justifyContent: 'center',
    paddingHorizontal: 12
  }
})

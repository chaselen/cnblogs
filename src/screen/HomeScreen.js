import React, {Component} from 'react'
import {Text, StyleSheet, View, FlatList, Image, Pressable} from 'react-native'
import http from '../lib/http'
import ItemSeparator from '../component/ItemSeparator'
import Skeleton from '../component/Skeleton'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isRefreshing: false,
      dataList: [],
      page: 1,
      size: 20
    }
  }

  componentDidMount() {
    this._getList(1)
  }

  async _getList(p) {
    console.log(`首页获取列表：${p}`)
    this.setState({
      isRefreshing: p === 1
    })

    const res = await http.get(`/api/blogposts/@sitehome?pageIndex=${p}&pageSize=${this.state.size}`)
    this.setState({
      isLoading: false,
      isRefreshing: false,
      dataList: (p !== 1 ? this.state.dataList : []).concat(res.data),
      page: p
    })
  }

  _keyExtractor = (item, index) => index + ''

  _renderItem = ({item}) => (
    <Pressable style={styles.item} onPress={() => this._onPressItem(item)}>
      <View style={styles.itemHeader}>
        <Image style={styles.itemAvatar} source={{uri: item.Avatar}} />
        <Text style={styles.itemNickname}>{item.Author}</Text>
      </View>
      <Text style={styles.itemTitle} numberOfLines={2} ellipsizeMode="tail">
        {item.Title}
      </Text>
      <Text style={styles.itemDesc} numberOfLines={3} ellipsizeMode="tail">
        {item.Description}
      </Text>
    </Pressable>
  )

  _onPressItem = item => {
    this.props.navigation.push('BlogPostDetail', {
      id: item.Id
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.isLoading ? (
          <Skeleton />
        ) : (
          <FlatList
            refreshing={this.state.isRefreshing}
            onRefresh={() => this._getList(1)}
            onEndReached={() => this._getList(this.state.page + 1)}
            data={this.state.dataList}
            keyExtractor={this._keyExtractor}
            onEndReachedThreshold={0.1}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={this._renderItem}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'center'
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10
  },
  itemNickname: {
    fontSize: 14,
    color: '#000'
  },
  itemTitle: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  itemDesc: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666'
  }
})

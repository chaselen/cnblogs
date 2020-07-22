import React, {Component} from 'react'
import {Text, StyleSheet, View, FlatList} from 'react-native'
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
    console.log(`getList：${p}`)
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

  _keyExtractor = (item, index) => item.Id + '_' + index

  _renderItem = ({item}) => (
    <View style={styles.item} key={item.id}>
      <Text>{item.Title}</Text>
    </View>
  )

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
            onEndReachedThreshold={0.01}
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
    height: 60,
    paddingHorizontal: 12,
    justifyContent: 'center'
  }
})

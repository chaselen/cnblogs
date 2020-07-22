import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'

export default class ItemSeparator extends Component {
  render() {
    return <View style={{...styles.line, marginHorizontal: this.props.margin || 12}} />
  }
}

const styles = StyleSheet.create({
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ececec'
  }
})

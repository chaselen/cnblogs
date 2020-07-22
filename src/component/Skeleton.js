import React from 'react'
import {View, StyleSheet} from 'react-native'

/**
 * 骨架屏
 * @param {} props 配置项
 */
export default function Skeleton(props) {
  const itemCount = props.itemCount || 4
  const row = props.row || 3

  // TODO: 动画
  return (
    <View>
      {Array(itemCount)
        .fill(0)
        .map((_, i) => (
          <View style={styles.item} key={`${i}`}>
            <View style={styles.itemTitle} />
            {Array(row)
              .fill(0)
              .map((_2, j) => (
                <View
                  key={`${i}_${j}`}
                  style={{
                    ...styles.itemRow,
                    ...(j === 0 ? {marginTop: 20} : {}),
                    ...(j === row - 1 ? {width: '60%'} : {})
                  }}
                />
              ))}
            {i !== itemCount - 1 ? <View style={styles.itemDivider} /> : null}
          </View>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    margin: 12
  },
  itemTitle: {
    height: 16,
    backgroundColor: '#f2f3f5',
    width: '40%'
  },
  itemRow: {
    height: 16,
    backgroundColor: '#f2f3f5',
    width: '100%',
    marginTop: 12
  },
  itemDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ececec',
    marginTop: 20
  }
})

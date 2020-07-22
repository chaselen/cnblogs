import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import {WebView} from 'react-native-webview'
import openApi from '../config/openApi'
import http from '../lib/http'

export default class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authUrl: `https://oauth.cnblogs.com/connect/authorize?client_id=${
        openApi.cilentId
      }&scope=openid profile CnBlogsApi&response_type=code id_token&redirect_uri=https://oauth.cnblogs.com/auth/callback&state=cnblogs.com&nonce=cnblogs.com`
    }
  }

  render() {
    return (
      <View style={styles.webView}>
        <WebView source={{uri: this.state.authUrl}} incognito={true} onLoad={this.webViewLoad} />
      </View>
    )
  }

  webViewLoad = e => {
    const url = e.nativeEvent.url
    if (/callback#code=/.test(url)) {
      const code = url.match(/code=(.*?)&/)[1]
      http
        .post(
          'https://oauth.cnblogs.com/connect/token',
          http.stringify({
            client_id: openApi.cilentId,
            client_secret: openApi.clientSecret,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'https://oauth.cnblogs.com/auth/callback'
          })
        )
        .then(res => {
          console.log('获取到的用户token：', res.data)
          this.props.navigation.pop()
        })
    }
    return true
  }
}

const styles = StyleSheet.create({
  webView: {
    width: '100%',
    height: '100%'
  }
})

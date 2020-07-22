import React, {Component} from 'react'
import {View} from 'react-native'
import http from '../lib/http'
import WebView from 'react-native-webview'

export default class BlogPostDetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blogHtml: ''
    }
  }

  componentDidMount() {
    const {id} = this.props.route.params
    console.log(`博文详情：${id}`)
    http.get(`https://api.cnblogs.com/api/blogposts/${id}/body`).then(res => {
      this.setState({
        blogHtml: res.data
      })
    })
  }

  _wrapHtml(html) {
    const template = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Document</title>
        <style>
          img {
            max-width: 100%;
          }
        </style>
      </head>
      <body>
        <div>
          {{html}}
        </div>
      </body>
    </html>
    `
    return template.replace('{{html}}', html)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <WebView source={{html: this._wrapHtml(this.state.blogHtml)}} />
      </View>
    )
  }
}

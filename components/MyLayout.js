import Header from './Header'
import Footer from './Footer'
import { initGA, logPageView } from '../utils/analytics'
import React, { Component } from "react"

const layoutStyle = {
  // margin: 20,
  // padding: 20,
  // border: '1px solid #DDD'
}

export default class Layout extends Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }

  render() {
    return (
      <div style={layoutStyle} >
        <Header backdrop={this.props.backdrop || "light"} />
        {this.props.children}
        {this.props.footer == true &&
          <Footer backdrop={this.props.backdrop || "light"} ></Footer>
        }
      </div>
    )
  }
}

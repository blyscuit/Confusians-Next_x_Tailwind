"use client";

import Header from "./Header";
import Footer from "./Footer";
import { initGA, logPageView } from "../utils/analytics";
import React, { Component } from "react";
import Head from "next/head";
import { modeBackground, modeBackdrop } from "../js/useDarkMode";

import "../styles/index.css";
import "../styles/materialize-color.css";
import "../styles/font.css";

const layoutStyle = {
  // margin: 20,
  // padding: 20,
  // border: '1px solid #DDD'
};

export default class Layout extends Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
    const backgroundColor = this.props.item?.backgroundColor || modeBackground(this.props.backdrop);
    // document.body.className = backgroundColor;
    document.documentElement.className = backgroundColor;
  }

  componentDidUpdate(prevProps) {
    const previousBackground = prevProps.item?.backgroundColor || modeBackground(prevProps.backdrop);
    const backgroundColor = this.props.item?.backgroundColor || modeBackground(this.props.backdrop);

    if (previousBackground !== backgroundColor) {
      // document.body.className = backgroundColor;
      document.documentElement.className = backgroundColor;
    }
  }

  render() {

    return (
      <div className={this.props.item?.backgroundColor ? this.props.item.backgroundColor : modeBackground(this.props.backdrop)}>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="manifest" href="/manifest.json" />
        </Head>

        <Header backdrop={this.props.backdrop || "light"} />
        {this.props.children}
        {this.props.footer == true && (
          <Footer backdrop={this.props.backdrop || "light"}></Footer>
        )}
      </div>
    );
  }
}

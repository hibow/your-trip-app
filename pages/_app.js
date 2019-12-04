import {Provider} from 'react-redux';
import withRedux from "next-redux-wrapper";
import React from 'react';
import initStore from "../store/index";

import App, { Container } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../lib/theme';
import Layout from '../components/layout'
import Header from '../components/header';
import Footer from '../components/Footer';



class MyApp extends App {

  static async getInitialProps({ Component, ctx}) {
    return {
      pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx): {}
    };
  }
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Head>
          <title>MyFootPrint</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
        <Provider store={store}>
          <Header {...pageProps} />
          <Layout>
          <Component {...pageProps} />
          </Layout>
          <Footer {...pageProps}/>
        </Provider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withRedux(initStore)(MyApp);

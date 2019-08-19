import List from './list';
import React, { Component } from 'react';

import data from '../db/data';

//add css
class Listcard extends Component {
  // static propTypes = {
  //   url: PropTypes.string.isRequired,
  //   author: PropTypes.string.isRequired,
  //   perPage: PropTypes.number.isRequired,
  // };


  render() {

    return (
      <div style={{ height: '70vh'}}>
        <List/>
        </div>
    );
  }
}

export default Listcard;
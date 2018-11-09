
// const moment = require('moment')
import moment from 'moment'

import * as contracts from './contracts';

const filters = {

  truncate: function(value, limit) {
      if (value && value.length > limit) {
          value = value.substring(0, (limit - 3)) + '...';
      }
      return value
  },

  action(value) {
    switch (value) {
      case 1:
        return 'Add'
      case 2:
        return 'Less'
      default:
        return '';
    }
  },

  progress: function (value = 0) {
    return Math.round(value * 100);
  },

  formatdate: function (value) {
    return (new Date(value)).toLocaleString();
  },

  round: function(value, accuracy, keep) {
    if (typeof value !== 'number') return value;
  
    let fixed = value.toFixed(accuracy);
  
    return keep ? fixed : +fixed;
  },

  parseround: function(value, accuracy, keep) {

    let fixed = parseFloat(value).toFixed(accuracy);
  
    return keep ? fixed : +fixed;
  },

  weitoether: function(value = 0, accuracy) {
    // let result = value / Math.pow(10, 18);
    let result = contracts.WeiToEther(value);
    return accuracy ? result.toFixed(accuracy) : result;
  },

  ethertowei: function(value = 0, accuracy) {
    // let result = value / Math.pow(10, 18);
    let result = contracts.EtherToWei(value);
    return accuracy ? result.toFixed(accuracy) : result;
  },

  mstoformat: function(value, format = 'HH:mm:ss') {
    return moment.utc(moment.duration(value, "milliseconds").asMilliseconds()).format(format);
  },

  bydefault: function(value, defaultValue) {
    return value ? value : defaultValue;
  }
  
}

export default {
  install: function (Vue, options) {
    Object.entries(filters).forEach(([key, func]) => Vue.filter(key, func))
  }
}
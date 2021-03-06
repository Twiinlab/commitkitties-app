
const env = process.env.NODE_ENV;

const defaultConfig = {

}

const custom = {
  development: {
    firebase: {
      apiKey: "AIzaSyAneLpLkRE7lLi2tFasaQHXs18FuLBz1IY",
      authDomain: "commitkitties-geth.firebaseapp.com",
      databaseURL: "https://commitkitties-geth.firebaseio.com",
      projectId: "commitkitties-geth",
      storageBucket: "commitkitties-geth.appspot.com",
      messagingSenderId: "908015484677"
    },
    api: {
      endpoint: 'http://localhost:8080',
      base: '/api'
    },
    network:{
      http: "http://35.243.198.50:8545", //http: "http://localhost:8545",
      ws: "ws://35.243.198.50:8545", //ws: "ws://localhost:8545",
      account: {
        address: "0x4aaa4e3ce8e9d8a6533b75db54da017e2cf811c8",
        key: "0xbb73e8a2733d614b215c1a651dd3884cabf1149a6dc847f1b6ce20c9d2f682ce"
      },
      mnemonic: "cargo little forum bring connect ready old matter accident ability never thumb"
    } 
  },
  production: {
    firebase: {
      apiKey: "AIzaSyAneLpLkRE7lLi2tFasaQHXs18FuLBz1IY",
      authDomain: "commitkitties-geth.firebaseapp.com",
      databaseURL: "https://commitkitties-geth.firebaseio.com",
      projectId: "commitkitties-geth",
      storageBucket: "commitkitties-geth.appspot.com",
      messagingSenderId: "908015484677"
    },
    api: {
      endpoint: 'https://pre-dot-commitkitties-api.appspot.com',
      base: '/api'
    },
    network:{
      http: "http://35.243.198.50:8545",
      ws: "ws://35.243.198.50:8545",
      account: {
        address: "0x4aaa4e3ce8e9d8a6533b75db54da017e2cf811c8",
        key: "0xbb73e8a2733d614b215c1a651dd3884cabf1149a6dc847f1b6ce20c9d2f682ce"
      },
      mnemonic: "cargo little forum bring connect ready old matter accident ability never thumb"
    } 
  },
  pro: {
    firebase: {
      apiKey: "AIzaSyAQxPhK8Hag2-C0HUWS0HSkfSmmsrDMoW8",
      authDomain: "commitkitties.firebaseapp.com",
      databaseURL: "https://commitkitties.firebaseio.com",
      projectId: "commitkitties",
      storageBucket: "commitkitties.appspot.com",
      messagingSenderId: "1020750963599"
    },
    api: {
      endpoint: 'https://pro-dot-commitkitties-api.appspot.com', //'http://localhost:8080',//'https://commitkitties-api.appspot.com',
      base: '/api'
    },
    network: {
      http:  "https://mainnet.infura.io/v3/365492c4737f413c9bccb6a52e72c356", //"https://rinkeby.infura.io/v3/b97d8303c3d84cf8bb43c325612ae8a7", //"https://rinkeby.infura.io/2nluVzjZVelxFadFKD0f",
      ws: "wss://rinkeby.infura.io/_ws", //"wss://rinkeby.infura.io/v3/b97d8303c3d84cf8bb43c325612ae8a7", //"wss://rinkeby.infura.io/2nluVzjZVelxFadFKD0f",
      account: {
          address: "0x8420AaB0b1a42c26089e696FBeF3e35ec9Da2849", //"0x359247c938ea24Aef9e30fDD8eaa0F39DCbB2249",
          key: "0x79A2227E181F91A2CFE1C89394A2BF0D530B83952A83928770F3ABB2070A5F30" //"0x92EAE2BCD7BCF17BF9FA0E82DE08393BF5D67AB9203C704A95CC793F25A1E37C"
      }
    }
  }
};

export default Object.assign( defaultConfig, custom[env ? env : 'pro']);

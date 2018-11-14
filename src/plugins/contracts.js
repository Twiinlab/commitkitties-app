import Web3 from 'web3';
import Tx from 'ethereumjs-tx';


// import config  from '@/config';
const fb = require('../firebaseConfig.js')
const store = require('../store/index')
import config from '@/config';


let web3 = undefined;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    //https://rinkeby.infura.io/2nluVzjZVelxFadFKD0f
    // "http://localhost:8545"
    // web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/2nluVzjZVelxFadFKD0f"));
    // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    web3 = new Web3(new Web3.providers.WebsocketProvider(`${config.network.ws}`));
}

export const web3Connection = web3;

// db.settings({ timestampsInSnapshots: true});
export const createAccount = function() {
    return web3.eth.accounts.create();
}

export const EtherToWei = function(etherValue = 0){
    return parseFloat(web3.utils.toWei(etherValue.toString()));
}

export const WeiToEther = function(weiValue = 0){
    return parseFloat(web3.utils.fromWei(weiValue.toString(), 'ether'))
}

export const getContract = async (contractName) => {
    const metaContract = await fb.db.collection('contracts').doc(contractName).get();
    if (!metaContract.exists) {
        throw new Error(`${contractName} does not exists`);
    }
    return {
        contract: new web3.eth.Contract(metaContract.data().abi, metaContract.data().address),
        abi: metaContract.data().abi,
        address: metaContract.data().address
    }
}

export const getKittiesById = async (id) => {
  const { contract } = await getContract('KittyCore');
  try {
      return contract.methods.getKitty(id).call();
  } catch (error) {
      console.log(error);
  }
}

export const callMethod = async (methodName, argumens, options = null) => {
    const { contract } = await getContract('KittyCore');
    return contract.methods[methodName](...argumens).call(options)
}

export const invokeMethod = async (methodName, argumens, wallet) => {

    const { contract, address } = await getContract('KittyCore');
    var gasPrice = await web3.eth.getGasPrice(); //1; //2;//or get with web3.eth.gasPrice
    var gasLimit = 3000000;

    const functionAbi = contract.methods[methodName](...argumens).encodeABI()

    // let estimatedGas
    // contract.methods.myFunctionNAme(myArgument).estimateGas({
    // from: account,
    // }).then((gasAmount) => {
    // estimatedGas = gasAmount.toString(16)
    // })

    var nonce = await web3.eth.getTransactionCount(wallet.address); //211;

    var rawTransaction = {
        "from": wallet.address,
        "nonce": web3.utils.toHex(nonce),
        "gasPrice": web3.utils.toHex(gasPrice), // '0x' + estimatedGas,
        "gasLimit": web3.utils.toHex(gasLimit),
        // "value": 0,
        "to": address,
        "data": functionAbi,
        // "chainId": 4 //rinkeby //remember to change this
      };

    var tx = new Tx(rawTransaction);
    tx.sign(new Buffer(wallet.privateKey.substring(2), 'hex'));
    var serializedTx = tx.serialize();

    return await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));

}

// SaleClockAuction.at("0x62f29d2be20c5b179a82b7977f7160c8b0b56e3a").then(function(instance){ return instance.bid("1",{from: "0x6999e1d9ec10d0b0d06c657e289f55a2e17dea64", value:"100"});}).then(function(result){console.log(result);})

export const bidAuction = async (tokenId, price, wallet) => {

  const { contract, address } = await getContract('SaleClockAuction');
  var gasPrice = await web3.eth.getGasPrice(); //1; //2;//or get with web3.eth.gasPrice
  var gasLimit = 3000000;

  const functionAbi = contract.methods.bid(tokenId).encodeABI()

  var nonce = await web3.eth.getTransactionCount(wallet.address); //211;

  var rawTransaction = {
      "from": wallet.address,
      "nonce": web3.utils.toHex(nonce),
      "gasPrice": web3.utils.toHex(gasPrice), // '0x' + estimatedGas,
      "gasLimit": web3.utils.toHex(gasLimit),
      "value": web3.utils.toHex(price),//web3.utils.toHex(web3.utils.fromWei(price, 'ether')),
      "to": address,
      "data": functionAbi,
      // "chainId": 4 //rinkeby //remember to change this
    };

  var tx = new Tx(rawTransaction);
  tx.sign(new Buffer(wallet.privateKey.substring(2), 'hex'));
  var serializedTx = tx.serialize();

  return await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));

}

async function dispatchUpdateUserBalanceEvent(event, address){
  if (!event) return
  console.log(`Listen Event ${JSON.stringify(event)}`);
  store.default.dispatch('users/updateBalanceProfile')
//   const newBalance = await web3.eth.getBalance(address);
//   store.default.commit(`users/setUserBalance`, web3.utils.fromWei(newBalance, 'ether'));
}

export const watchUserEvents = async ( address ) => {

  const { contract } = await getContract('KittyCore');

  contract.events.Transfer({ filter: { _from: address }, fromBlock: 'latest' }, async (error, event) => {
    if (error) { 
      console.log(error)
      return
    }
    dispatchUpdateUserBalanceEvent(event, address);
    return
  })

  contract.events.Transfer({ filter: { _to: address }, fromBlock: 'latest' }, async (error, event) => {
    if (error) { 
      console.log(error)
      return
    }
    dispatchUpdateUserBalanceEvent(event, address);
    return
  })
}



const {
  NonceTxMiddleware, SignedTxMiddleware, Client,
  Contract, Address, LocalAddress, CryptoUtils
} = require('loom-js')

const { MapEntry } = require('./helloworld_pb')

/**
 * Creates a new `Contract` instance that can be used to interact with a smart contract.
 * @param privateKey Private key that will be used to sign transactions sent to the contract.
 * @param publicKey Public key that corresponds to the private key.
 * @returns `Contract` instance.
 */
async function getContract(privateKey, publicKey) {
  const client = new Client(
    'default',
    'ws://127.0.0.1:46657/websocket',
    'ws://127.0.0.1:9999/queryws'
  )
  // required middleware
  client.txMiddleware = [
    new NonceTxMiddleware(publicKey, client),
    new SignedTxMiddleware(privateKey)
  ]

  const contractAddr = await client.getContractAddressAsync('BluePrint')
  const callerAddr = new Address(client.chainId, LocalAddress.fromPublicKey(publicKey))

  return new Contract({
    contractAddr,
    callerAddr,
    client
  })
}

(async function () {
  const privateKey = CryptoUtils.generatePrivateKey()
  const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

  const contract = await getContract(privateKey, publicKey)
  await store(contract, '123', 'hello!')
  const value = await load(contract, '123')
  console.log('Value: ' + value)
})()

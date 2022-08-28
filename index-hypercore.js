import Client from '@hyperspace/client'
const { corestore, replicate } = new Client()
const store = corestore()

const KEY = process.env.HYPERCORE_KEY
const core = store.get({ key: KEY, valueEncoding: 'json' })

await core.ready()
console.log('core is ready')
await replicate(core)
console.log(`core is replicated. it has a length of ${core.length}`)
export const getAllImages = async function * () {
  let index = core.length -1
  while(index >= 0) {
    console.log(`Getting image with index ${index}`)
    const image = (await core.get(index)).images.ascii
    index--
    yield image
  }
}

export const getImageByIndex = async (index) => {
  return (await core.get(index)).images.ascii
}

export const closeCore = async () => {
  await core.close()
  await store.close()
}
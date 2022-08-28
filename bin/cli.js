#!/usr/bin/env node
import yargs from 'yargs'
import  { hideBin } from 'yargs/helpers'
const argv = yargs(hideBin(process.argv)).argv

let module
if(argv['hypercore-key']) {
  if(typeof argv['hypercore-key'] !== 'string') {
    throw new Error('hypercore-key is required')
  }
  process.env.HYPERCORE_KEY = argv['hypercore-key']
  module = await import('../index-hypercore.js')
} else {
  if(typeof argv['api-url'] !== 'string') {
    throw new Error('api-url is required')
  }
  process.env.API_URL = argv['api-url']
  // kinda sucks that dynamic imports need the extension
  module = await import('../index.js')
}

if(argv.all) {
  for await (const image of module.getAllImages()) {
    console.log(image)
    await timeout(argv.timeout)
  }
} else if(argv.single) {
  if(typeof argv.single !== 'string' && typeof argv.single !== 'number') {
    throw new Error('A value is needed for single image mode')
  }
  try {
    const image = await module.getImageByIndex(argv.single)
    console.log(image)
  } catch (error) {
    console.log('An error ocurred, probably bad index')
  }
}

if(argv['hypercore-key']) {
  await module.closeCore()
  // not sure why it's keeping a PipeWrap as active resource, it should cleanup...
  process.exit(0)
}



function timeout(delay) {
  return new Promise(function(resolve) {
      setTimeout(resolve, delay)
  })
}
export const getAllImages = async function * (startFrom) {
  let index
  if(!startFrom) {
    index = (await getLatestImage()).index
  } else {
    index = startFrom
  }
  while(index >= 0) {
    console.log(`Getting image with index ${index}`)
    const image = await getImageByIndex(index)
    index--
    yield image
  }
}

export const getLatestImage = async () => {
  const response = await fetch(`${process.env.API_URL}/termrover/latest`)
  const json = await response.json()
  return json
}

export const getImageById = async (id) => {
  const response = await fetch(`${process.env.API_URL}/termrover/${id}`)
  const json = await response.json()
  console.log(response.statusCode, 'ssfadfalkj', json.images.ascii)
}

export const getImageByIndex = async (index) => {
  const response = await fetch(`${process.env.API_URL}/termrover/${index}`)
  const json = await response.json()
  return json.images.ascii
}
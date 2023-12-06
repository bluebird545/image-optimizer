import * as imageRequest from './request.js';
import * as imageHandler from './handler.js'

export default async(file, query) => {
  try {
    const imageRequestInfo = await imageRequest.setup(file, query)
    const processedRequest = await imageHandler.processMultipleImages(imageRequestInfo)
    return processedRequest
  } catch (error) {
    throw new Error('Something went wrong')
  }
}
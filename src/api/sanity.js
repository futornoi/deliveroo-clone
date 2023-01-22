import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import {REACT_APP_SANITY_TOKEN, REACT_APP_SANITY_DATASET, REACT_APP_SANITY_PROJECT_ID} from '@env'

const client = sanityClient({
  projectId: REACT_APP_SANITY_PROJECT_ID,
  dataset: REACT_APP_SANITY_DATASET,
  token: REACT_APP_SANITY_TOKEN,
  useCdn: true,
  apiVersion: '2021-10-21',
})

const builder = imageUrlBuilder(client)

export const urlFor = source => builder.image(source)

export default client

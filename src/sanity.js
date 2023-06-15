import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'tp2qi923',
  dataset: 'production',
  useCdn: process.env.NODE_ENV === 'production',
})
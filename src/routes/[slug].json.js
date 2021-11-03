/* eslint-disable import/prefer-default-export */
import database from '$lib/data/database.json'

export function get({ params }) {
  const { slug } = params
  const pageData = database.find(({ id }) => id === slug)
  if (pageData) {
    return {
      body: pageData,
    }
  }
  // Returning nothing is equivalent to an explicit 404 response.
  return undefined
}

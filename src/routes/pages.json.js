/* eslint-disable import/prefer-default-export */
import _ from 'lodash/fp'
import database from '$lib/data/database.json'

export function get() {
  return {
    body: database
      .filter(_.flow(_.get('collection'), _.eq('pages')))
      .map(_.pick(['id', 'title'])),
  }
}

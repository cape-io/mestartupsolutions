import _ from 'lodash/fp.js'
import matter from 'gray-matter'
import { globby } from 'globby'
import pathParse from 'path-parse'
import fs from 'fs-extra'

// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-transformer-remark/src/extend-node-type.js

const pathParams = _.curry((levels, path) => {
  const parts = _.trimCharsStart('/', path).split('/')
  const result = _.zipObject(levels, parts.slice(0, levels.length))
  result.path = path
  const filename = parts.slice(levels.length).join('/')
  const { dir, name, ext } = pathParse(filename)
  if (dir) {
    result.dir = dir
    result.filename = filename
  }
  result.ext = ext.slice(1)
  result.id = name
  return result
})

const CWD = './'

function addContent(info) {
  const { data, content, excerpt } = matter.read(CWD + info.path, { excerpt: true })
  return {
    ...info, ...data, content, excerpt,
  }
}
globby('content/**/*.(md|yml)', { cwd: CWD })
  .then(_.map(pathParams(['baseDir', 'collection'])))
  // .then(_.slice(0, 2))
  .then((x) => {
    console.log(x)
    return x
  })
  .then(_.map(addContent))
  .then((data) => fs.outputJSON('./src/lib/data/database.json', data))
  .then(() => console.log('DONE'))

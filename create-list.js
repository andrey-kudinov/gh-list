import { Octokit } from '@octokit/rest'
import fs from 'fs'
import dotenv from 'dotenv'
import path from 'path';

dotenv.config()

const octokit = new Octokit({
  auth: process.env.TOKEN
})

const PAGES = [1, 2, 3, 4, 5]
const BASE = 'lists'

const getPage = async ({ page }) => {
  const { data } = await octokit.request(
    'GET /user/followers{?per_page,page}',
    { page }
  )
  return data
}

const getList = async () => {
  const list = []
  for (const page of PAGES) {
    const listOnPage = await getPage({ page })
    list.push(...listOnPage)
  }
  return list
}

const writeFile = ({ path, list }) => {
  fs.writeFile(
    path,
    JSON.stringify(list),
    function (e, result) {
      if (e) console.error(e)
    }
  )
}

let index = 1
const write = ({ name, list }) => {
  const n = `${name}-${index}.json`

  const dir = path.join('.', BASE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const p = path.join(dir, `${name}.json`)

  if (!fs.existsSync(p)) {
    writeFile({ path: p, list })
  } else {
    const n = `${name}-${index}.json`
    const p = path.join(dir, `${name}-${index}.json`)

    if (!fs.existsSync(p)) {
      writeFile({ path: p, list })
    } else {
      index++
      const n = `${name}-${index}.json`
      const p = path.join(dir, `${name}-${index}.json`)

      if (!fs.existsSync(p)) {
        writeFile({ path: p, list })
      } else {
        write({ name, list })
      }
    }
  }
}

const start = async () => {
  const list = await getList()
  const shortList = list.map(l => l.login)
  const date = new Intl.DateTimeFormat('ru-RU').format(new Date())
  
  write({ name: `long-list_${date}`, list })
  write({ name: `short-list_${date}`, list: shortList })
}

start()

import { Octokit } from '@octokit/rest'
import fs from 'fs'
import dotenv from 'dotenv';

dotenv.config();

const octokit = new Octokit({
  auth: process.env.TOKEN
})

const PAGES = [1, 2, 3, 4, 5]

const getPage = async ({ page }) => {
  const { data } = await octokit.request('GET /user/followers{?per_page,page}', { page })
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

const write = async () => {
  const list = await getList()
  const date = new Intl.DateTimeFormat('ru-RU').format(new Date())
  const shortList = list.map(l => l.login)
  fs.writeFile(
    `long-list_${date}.json`,
    JSON.stringify(list),
    function(e, result) { if(e) console.error(e) }
  );
  fs.writeFile(
    `short-list_${date}.json`,
    JSON.stringify(shortList),
    function(e, result) { if(e) console.error(e) }
  );
}

write()

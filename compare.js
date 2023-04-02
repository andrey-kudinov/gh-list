import fs from 'fs'
import path from 'path';

const FIRST_TITLE = 'short-list_23.02.2023.json'
const SECOND_TITLE = 'short-list_02.04.2023.json'

const firstList = JSON.parse(fs.readFileSync(path.join('.', 'lists', FIRST_TITLE)))
const secondList = JSON.parse(fs.readFileSync(path.join('.', 'lists', SECOND_TITLE)))

const getDiff = ({ firstList, secondList }) =>
  firstList
    .filter(x => !secondList.includes(x))
    .concat(secondList.filter(x => !firstList.includes(x)))

const diff = getDiff({ firstList, secondList })
console.log(diff.length ? diff : 'There is no diff!' );

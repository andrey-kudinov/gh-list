import fs from 'fs'

const FIRST_TITLE = 'short-list_20.12.2022.json'
const SECOND_TITLE = 'short-list_21.12.2022.json'

const firstList = JSON.parse(fs.readFileSync(FIRST_TITLE))
const secondList = JSON.parse(fs.readFileSync(SECOND_TITLE))

const getDiff = ({ firstList, secondList }) =>
  firstList
    .filter(x => !secondList.includes(x))
    .concat(secondList.filter(x => !firstList.includes(x)))

console.log(getDiff({ firstList, secondList }));

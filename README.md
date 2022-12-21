# gh-list
One hour project just for fun and curiosity a bit

## Install
```bash
yarn
```
Also you need GitHub Token

## Create lists
You can get your GH followers
```bash
node create-list.js
```
or
```bash
yarn get
```
Files will be added to `./lists`
### List types:
- long (e.g. `long-list_21.12.2022.json`)
- short (e.g. `short-list_21.12.2022.json`)

If you creat a few files at one date, names will be with index (e.g short-list_21.12.2022`-1`.json)

## Compare lists
```bash
node compare.js
```
or
```bash
yarn diff
```
Result will be in console.log() inside your Terminal

//import readfile and writefile methods in fs as promises
const { readFile, writeFile } = require('fs').promises;
const path = require('path');

//write a class with helper methods to use in routers. ${filename} will be db.json by I don't wanna hard code it. In apiRoutes file, noteTaking will store db.json.
class Store {
  constructor(filename) {
    this.path = path.join(__dirname, `${filename}.json`);
  }
  // it will read the db.json file, then parse JSON file into JS readable objects.
  //utf-8 is called encoding option which will be passed to readFile to ensure our returned date is a string.
  getAll() {
    return readFile(this.path, 'utf-8').then(data => JSON.parse(data));
  }

  write(data) {
    return writeFile(this.path, JSON.stringify(data));
  }
  //push method is used for POST router. it gets all data first then convert date into JSON format. the "..." is a shorthand spread syntax to create a new array in db.JSON.
  //basically, the "item" will be the new note and it will be pushed into original array "...data", then return the whole thing as a new array.
  push(item) {
    return this.getAll().then(data => this.write([...data, item]));
  }

  clear() {
    return this.write([]);
  }
}
//noteTaking will use the Store class and the file name will be db.
const noteTaking = new Store('db');

module.exports = noteTaking;

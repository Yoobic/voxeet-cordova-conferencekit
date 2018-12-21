const version = require('../package.json').version;
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const builder = new xml2js.Builder()
const fs = require('fs');
const path = require('path');
const params = {encoding:'utf8'};

const cordovaPatch = async function () {
  let name = 'plugin.xml';
  let dir = './'  
  
  console.log('version ', version)
  // get path to the config folder
  if (arguments[0] != null) {
    dir = arguments[0];
  }

  let file = path.join (__dirname, dir, name);
  if (!fs.existsSync(file)) {
      throw new Error ('could not find file: '+ file)
  }
  try {
    let data = fs.readFileSync(file, params); 
    let config = await new Promise((resolve, reject) => parser.parseString(data, (err, result) => {
        if (err) {reject(err) }
        else resolve(result);
    }));
    
    config.plugin.$.version = version;
    let newConfig = builder.buildObject(config);
    fs.writeFileSync(file, newConfig, params);  
  } catch (e) {
      throw new Error (e)
  }

  return version;

};

cordovaPatch('../', version);
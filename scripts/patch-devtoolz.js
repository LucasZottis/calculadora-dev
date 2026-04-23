'use strict';
const fs = require('fs');
const path = require('path');

const lib = path.join(__dirname, '../node_modules/devtoolz-library/dist/converters');

function patch(filePath, search, replacement) {
  if (!fs.existsSync(filePath)) {
    console.warn('[patch-devtoolz] Not found:', filePath);
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes(search)) {
    console.log('[patch-devtoolz] Already patched:', path.basename(filePath));
    return;
  }
  fs.writeFileSync(filePath, content.replace(search, replacement), 'utf8');
  console.log('[patch-devtoolz] Patched:', path.basename(filePath));
}

// unit-converter: volume, weight-mass, length, temperature, energy, area, power, speed, pressure, angle, data, time
patch(
  path.join(lib, 'unit-converter/unit.converter.factory.js'),
  'const module = require("./services/" + service.id + "/" + service.id + ".converter");',
  `const _s = {
            'volume':       require('./services/volume/volume.converter'),
            'weight-mass':  require('./services/weight-mass/weight-mass.converter'),
            'length':       require('./services/length/length.converter'),
            'temperature':  require('./services/temperature/temperature.converter'),
            'energy':       require('./services/energy/energy.converter'),
            'area':         require('./services/area/area.converter'),
            'power':        require('./services/power/power.converter'),
            'speed':        require('./services/speed/speed.converter'),
            'pressure':     require('./services/pressure/pressure.converter'),
            'angle':        require('./services/angle/angle.converter'),
            'data':         require('./services/data/data.converter'),
            'time':         require('./services/time/time.converter'),
        };
        const module = _s[service.id];`
);

// numeric-systems: binary, octadecimal, decimal, hexadecimal, roman
patch(
  path.join(lib, 'numeric-systems/numericSystem.converter.factory.js'),
  'const module = require("./services/" + service.id + "/" + service.id + ".converter");',
  `const _s = {
            'binary':      require('./services/binary/binary.converter'),
            'octadecimal': require('./services/octadecimal/octadecimal.converter'),
            'decimal':     require('./services/decimal/decimal.converter'),
            'hexadecimal': require('./services/hexadecimal/hexadecimal.converter'),
            'roman':       require('./services/roman/roman.converter'),
        };
        const module = _s[service.id];`
);

// serialization: csv, json
patch(
  path.join(lib, 'serialization/serialization.converter.factory.js'),
  'const module = require("./services/" + service.id + "/" + service.id + ".converter");',
  `const _s = {
            'csv':  require('./services/csv/csv.converter'),
            'json': require('./services/json/json.converter'),
        };
        const module = _s[service.id];`
);

// text-format: text, morse, binary  (uses "{id}-format.converter" pattern)
patch(
  path.join(lib, 'text-format/textFormatConverter.converter.factory.js'),
  'const module = require("./services/" + service.id + "/" + service.id + "-format" + ".converter");',
  `const _s = {
            'text':   require('./services/text/text-format.converter'),
            'morse':  require('./services/morse/morse-format.converter'),
            'binary': require('./services/binary/binary-format.converter'),
        };
        const module = _s[service.id];`
);

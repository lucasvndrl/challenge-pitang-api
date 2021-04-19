const moment = require('moment');

function validateElderly(dateString) {
  const yearsFromNow = moment(new Date(dateString), 'DDMMYYYY').fromNow();
  if (
    parseInt(yearsFromNow.split(' ')[0]) >= 60 &&
    yearsFromNow.split(' ')[1] === 'years'
  )
    return true;
  return false;
}

module.exports = validateElderly;

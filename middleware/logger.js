const moment = require('moment')

const logger = (req,res,next) =>
{
    //Getting the whole URL along with timestamp using moment module 
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}:${moment().format()}`)
    next()
}

module.exports = logger
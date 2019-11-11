const Configstore=require('configstore');
const packageJson = require('../package.json');

const config = new Configstore(packageJson.name, {'email': 'undefined', 'id':'undefined'});
const link=new Configstore('link',{link:'undefined'})

const storeDetails=(email,id)=>
{
    config.set('email', email);
    config.set('id',id);
}


module.exports={
    storeDetails,
    config,
    link
};
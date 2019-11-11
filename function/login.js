const axios=require('axios');
const { storeDetails, config }=require('../config/store');
const chalk=require('chalk');

const loginDetails=(details)=>
{
    const { email, password }=details;
    axios.post('http://localhost:4000/cli/login',{ email, password })
    .then((res)=>
    {
        if(res.data.code=='200')
        {
            const id=res.data.id;
            storeDetails(email,id);
        }
        else
        {
            console.info(chalk.green('*****Login Again*****'));
        }
    })
    .catch((err)=>
    {
        console.info(chalk.red('Something Error'));
    })
}



module.exports={
    loginDetails
}
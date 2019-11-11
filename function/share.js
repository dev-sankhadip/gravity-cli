const { config, link }=require('../config/store');
const fetch=require('node-fetch');
const axios=require('axios');


const shareURL=(recieverEmail)=>
{
    const senderEmail=config.get('email');
    const shareURL=link.get('link');
    axios.post("http://localhost:4000/cli/share/url",{ recieverEmail, shareURL, senderEmail })
    .then((res)=>
    {
        console.info(res.data.message);
    })
    .catch((err)=>
    {
        console.error(err);
    })
}



module.exports={
    shareURL
}


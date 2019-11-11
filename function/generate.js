const { config, link }=require('../config/store')
const fetch=require('node-fetch');
const chalk=require('chalk');
var QRCode = require('qrcode')


const arr=['image', 'audio', 'video', 'docs'];

const generateURL=(type, fileId)=>
{
    const email=config.get('email');
    const id=config.get('id');
    const fileType=arr[type];
    fetch(`http://localhost:4000/cli/url/generate/${fileType}/${fileId}`,{
        headers:{
            email,
            id
        }
    })
    .then((res)=>
    {
        return res.json();
    })
    .then((res)=>
    {
        if(res.code==200)
        {
            console.info('Sharable Public Link: '+chalk.blue(res.link));
            // QRCode.toString(res.link,{type:'utf8', width:30}, function (err, url) {
            //     console.log(url)
            //   })
            link.set('link',res.link);
        }
        else if(res.code==400)
        {
            console.info(chalk.red(res.message));
        }
    })
    .catch((err)=>
    {
        console.info(chalk.red('Something Error'));
    })
}


module.exports={
    generateURL
}
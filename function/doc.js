const request=require('request');
const fs=require('fs');
const chalk=require('chalk');
const { config }=require('../config/store')


const docUpload=(path)=>
{
    if(fs.existsSync(path))
    {
        console.log(path);
        const email=config.get('email');
        const id=config.get('id');
        if(email!='undefined')
        {
            var formData = {
                file: fs.createReadStream(path),
            };
            request.post(
                {
                    url:'http://localhost:4000/cli/doc/fileupload',
                    formData: formData,
                    headers:{
                        email,
                        id
                    },
                }, function optionalCallback(err, httpResponse, body) {
                    if (err) {
                        return console.error('upload failed:', err);
                    }
                    console.info('Upload successful!', body);
            });
        }
        else
        {
            console.log(chalk.green('*****Login Again*****'));
        }
    }
    else
    {
        console.info(chalk.red('Path does not exist'));
    }
}


module.exports={
    docUpload
}
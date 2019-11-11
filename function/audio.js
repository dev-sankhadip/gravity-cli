const request=require('request');
const fs=require('fs');
const chalk=require('chalk');
const { config }=require('../config/store')


const audioUpload=(path)=>
{
    if(fs.existsSync(path))
    {
        const email=config.get('email');
        const id=config.get('id');
        if(email!='undefined')
        {
            var formData = {
                file: fs.createReadStream(path),
            };
            request.post(
                {
                    url:'http://localhost:4000/cli/audio/fileupload',
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
    audioUpload
}
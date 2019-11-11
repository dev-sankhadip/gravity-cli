const request=require('request');
const fs=require('fs');
const chalk=require('chalk');


const publicUpload=(paths)=>
{
    const formData={
        attachments:[
            
        ]
    }
    var f=0;
    for(let i=0;i<paths.length;i++)
    {
        if(fs.existsSync(paths[i]))
        {
            formData.attachments.push(fs.createReadStream(`${paths[i]}`));
        }
        else
        {
            f=1;
            console.info(chalk.red(`${paths[i]} does not exist`));
            break;
        }
    }
    if(f==0)
    {
        request.post(
            {
                url:'http://localhost:4000/cli/public/multiple/fileupload',
                formData: formData,
            }, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error('upload failed:', err);
                }
                console.info('Upload successful!', 'your files id id:- ', chalk.green(body));
        })
    }
}

const publicSingleFileUpload=(path)=>
{
    if(fs.existsSync(path))
    {
        var formData = {
            file: fs.createReadStream(path),
        };
        request.post(
            {
                url:'http://localhost:4000/cli/public/single/fileupload',
                formData: formData
            }, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error('upload failed:', err);
                }
                console.info('Upload successful!', body);
        });
    }
    else
    {
        console.info(chalk.red('Path does not exist'));
    }
}

const formData={
        attachments:[
            
        ]
    }
const publicDirUpload=(path)=>
{
    fs.readdir(path,(err, list)=>
    {
        if(err)
        {
            console.log(err)
        }
        for(let i=0;i<list.length;i++)
        {
            if(fs.lstatSync(path+'/'+list[i]).isDirectory())
            {
                // console.log(list[i]+" is a dir");
                var realpath=path+'/'+list[i];
                publicDirUpload(realpath);
            }
            else if(fs.lstatSync(path+'/'+list[i]).isFile())
            {
                formData.attachments.push(fs.createReadStream(`${path}/${list[i]}`));
            }
        }
        request.post(
            {
                url:'http://localhost:4000/cli/public/multiple/fileupload',
                formData: formData,
            }, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error('upload failed:', err);
                }
                console.info('Upload successful!', 'your files id id:- ', chalk.green(body));
        })

    })
}


module.exports={
    publicUpload,
    publicSingleFileUpload,
    publicDirUpload
}
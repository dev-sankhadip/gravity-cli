const request=require('request');
const fs=require('fs');
const chalk=require('chalk');
const { join }=require('path');
const { readdir, stat }=require('fs-extra')

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
                url:'http://18.191.222.246:4000/cli/public/multiple/fileupload',
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
                url:'http://127.0.0.1:4000/cli/public/single/fileupload',
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



const publicDirUpload=async (path)=>
{
    let allFiles=[];
    const formData={
        attachments:[
            
        ]
    }
    allFiles= await readUploadDir(path, allFiles)
    var f=0;
    for(let i=0;i<allFiles.length;i++)
    {
        if(fs.existsSync(allFiles[i]))
        {
            if((await stat(allFiles[i])).isDirectory()){

            }
            else
            {
                formData.attachments.push(fs.createReadStream(`${allFiles[i]}`));
            }
        }
        else
        {
            f=1;
            console.info(chalk.red(`${allFiles[i]} does not exist`));
            break;
        }
    }
    if(f==0)
    {
        request.post(
            {
                url:'http://127.0.0.1:4000/cli/public/multiple/fileupload',
                formData: formData,
            }, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error('upload failed:', err);
                }
                console.info('Upload successful!', 'your files id id:- ', chalk.green(body));
        })
    }
}



async function readUploadDir(path, allFiles){
    const paths=(await readdir(path)).map(f=>join(path, f));
    allFiles.push(...paths)
    // allFiles=allFiles.filter((t)=>{
    //     if(t===path){
    //         return false;
    //     }
    //     return true;
    // })
    await Promise.all(paths.map(async p=>{  return (await stat(p)).isDirectory() && readUploadDir(p, allFiles)  }))
    return allFiles;
}

module.exports={
    publicUpload,
    publicSingleFileUpload,
    publicDirUpload
}

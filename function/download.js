const fetch=require('node-fetch');
const { config }=require('../config/store');
const { exec }=require('child_process');
const chalk=require('chalk');
const download=require('download');


const fileDownload=(type,id)=>
{
    const email=config.get('email');
    if(type==='doc')
    {
        fetch('http://localhost:4000/cli/download/doc',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({ type, id, email })
        })
        .then((res)=>
        {
            return res.json();
        })
        .then((res)=>
        {
            if(res.code=='200')
            {
                download(res.link,'dist')
                .then(()=>
                {
                    console.log('done');
                })
                // exec(`wget -p ${res.link}`,(err, stdout, stderr)=>
                // {
                //     if(err)
                //     {
                //         console.log(err);
                //     }
                //     console.log(stderr);
                //     console.log(stdout);
                // })
            }
            else
            {
                console.log(chalk.red('ERROR'));
            }
        })
        .catch((err)=>
        {
            console.error(err);
        })
    }
    else
    {
        fetch('http://localhost:4000/cli/download/file',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({ type, id, email })
        })
        .then((res)=>
        {
            return res.json();
        })
        .then((res)=>
        {
            if(res.code==200)
            {
                download(res.link,'dist')
                .then(()=>
                {
                    console.log('done');
                })
            }
            else
            {
                console.info()
            }
        })
        .catch((err)=>
        {
            console.error(err);
        })
    }
}


module.exports={
    fileDownload
}
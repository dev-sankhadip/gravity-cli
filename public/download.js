const fetch=require('node-fetch');
const download=require('download');

const publicFileDownload=(id)=>
{
    fetch(`http://127.0.0.1:4000/cli/public/download/${id}`,{
        method:'POST'
    })
    .then((res)=>
    {
        return res.json();
    })
    .then((res)=>
    {
        for(let i=0;i<res.filesDownloadLink.length;i++)
        {
            download(res.filesDownloadLink[i],'dist')
            .then(()=>
            {
                console.log(`downloaded`);
            })
            .catch((err)=>
            {
                console.log(err);
            })
        }
    })
    .catch((err)=>
    {
        console.log(err);
    })
}


module.exports={
    publicFileDownload
}
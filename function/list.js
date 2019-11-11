const chalk=require('chalk');
const { config }=require('../config/store');
const axios=require('axios');
var CLI = require('clui'),
    clc = require('cli-color');

var Line          = CLI.Line,
    LineBuffer    = CLI.LineBuffer;

var outputBuffer = new LineBuffer({
  x: 0,
  y: 0,
  width: 'console',
  height: 'console'
});


const listFiles=(type)=>
{
    const email=config.get('email');
    const userid=config.get('id');
    axios.get(`http://localhost:4000/cli/list/${type}`,{
        headers:{
            email,
            userid
        }
    })
    .then((res)=>
    {
        var message = new Line(outputBuffer)
        .column(`${type} files`, 20, [clc.green])
        .fill()
        .store();

        var blankLine = new Line(outputBuffer)
        .fill()
        .store();

        var header = new Line(outputBuffer)
        .column('Id',10,[clc.cyanBright])
        .column('Email', 40, [clc.cyanBright])
        .column(`${type} Name`, 30, [clc.cyanBright])
        .column('Date', 25, [clc.cyanBright])
        .fill()
        .store();
        
        var line;
        res.data.result.forEach(function(item)
        {
            const id=item[`${type}id`];
            line = new Line(outputBuffer)
            .column((id.toString()),10)
            .column(item.email,40)
            .column(item.name,30)
            .column(item.date,25)
            .fill()
            .store();
        })

        outputBuffer.output();
    })
    .catch((err)=>
    {
        console.log(err);
    })
}

module.exports={
    listFiles
}
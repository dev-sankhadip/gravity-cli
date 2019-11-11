const program=require('commander');
const  inquirer=require('inquirer');
const chalk=require('chalk');
const { loginDetails }=require('./function/login');
const { imageUpload }=require('./function/image');
const { audioUpload }=require('./function/audio');
const { videoUpload }=require('./function/video');
const { docUpload }=require('./function/doc');
const { listFiles }=require('./function/list');
const { generateURL }=require('./function/generate')
const { shareURL }=require('./function/share');
const { fileDownload }=require('./function/download');
const { publicUpload, publicSingleFileUpload,publicDirUpload }=require('./public/upload')
const { publicFileDownload }=require('./public/download')


const questions=[
    {
        type:'input',
        name:'email',
        message:'Enter Your Email Address',
        validate:function(value)
        {
            if(value.length)
            {
                return true;
            }
            else
            {
                return chalk.red("Please Enter Email Address");
            }
        }
    },
    {
        type:'password',
        name:'password',
        message:'Enter Your Password',
        validate:function(value)
        {
            if(value.length)
            {
                return true;
            }
            else
            {
                return chalk.red("Please Enter Password");
            }
        }
    }
]

const fileUploadQuestion=[
    {
        type:'number',
        name:'id',
        message:'Enter File Id',
        validate:function(value)
        {
            if(!isNaN(value))
            {
                return true;
            }
            else
            {
                return chalk.red("Please Enter File Id");
            }
        }
    }
]


const fileShareQuestion=[
    {
        type:'input',
        name:'email',
        message:'Enter Reciever Email Address',
        validate:function(value)
        {
            if(value.length)
            {
                return true;
            }
            else
            {
                return chalk.red('Please Enter Email Address');
            }
        }
    }
]

program
.version('1.0.0')
.description('Gravity Management System')

program
.command('login')
.alias('l')
.description("Enter Login Credentials")
.action(()=>
{
    inquirer.prompt(questions)
    .then((ans)=>
    {
        loginDetails(ans);
    })
})


program
.command('upload-image <path>')
.alias('up-i')
.description('Upload Image File')
.action((path)=>
{
    imageUpload(path);
})


program
.command('upload-audio <path>')
.alias('up-a')
.description('Upload Audio File')
.action((path)=>
{
    audioUpload(path);
})


program
.command('upload-video <path>')
.alias('up-v')
.description('Upload Video File')
.action((path)=>
{
    videoUpload(path);
})

program
.command('upload-doc <path>')
.alias('up-d')
.description('Upload Doc Files')
.action((path)=>
{
    docUpload(path);
})

program
.command('list <type>')
.alias('li')
.description('List All Files <audio for audio> <image for image> <video for video> <docs for docs>')
.action((type)=>
{
    listFiles(type);
})


program
.command('generate-url')
.alias('g-u')
.description('Generate Public Sharable URL of Files')
.action(()=>
{
    inquirer.registerPrompt('selectLine', require('inquirer-select-line'));
    inquirer.prompt([{
    type: 'selectLine',
    message: 'Select file type',
    name: 'type',
    choices: ['Image', 'Audio', 'Video', 'Docs'],
    }])
    .then(function(answers) {
        inquirer.prompt(fileUploadQuestion)
        .then((ans)=>
        {
            generateURL(answers.type, ans.id);
        })
    });
})

program
.command('share')
.alias('s')
.description('Share URL through email')
.action(()=>
{
    inquirer.prompt(fileShareQuestion)
    .then((ans)=>
    {
        shareURL(ans.email);
    })
})

program
.command('download <type> <id>')
.alias('d')
.description('Download files')
.action((type, id)=>
{
    fileDownload(type, id);
})


//public file upload and download
program
.command('d-p <id>')
.description('download public files with id')
.action((id)=>
{
    publicFileDownload(id);
})

program
.command('up-s <path>')
.description('upload simgle file')
.action((path)=>
{
    publicSingleFileUpload(path);
})

program
.command('upload-dir <path>')
.description('Upload a folder')
.action((path)=>
{
    publicDirUpload(path);
})

const argv=require('yargs')
.option('upload',{
    type:'array',
    desc:'Upload one or more files'
}).argv
if(argv.upload)
{
    publicUpload(argv.upload);
}

program.parse(process.argv);
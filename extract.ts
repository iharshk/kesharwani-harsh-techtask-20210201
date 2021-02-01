
const http = require('http')
const fs = require('fs');
const unzipper = require('unzipper');
const scp = require('scp');
const request = require('superagent');

const { 
    exec,
    execFile
  } = require('child_process');

function downloadZip(url, dest) {
    let filepath = dest + '/'+ Date.now() + '.zip'
    console.log(dest, Date.now())

    var tempFile = fs.createWriteStream(filepath);
    tempFile.on('open', function(fd) {
        http.get({hostname: "www.learningcontainer.com",path: url, headers: {Connection: 'keep-alive'}}, function(res) {
            res.on('data', function(chunk) {
                tempFile.write(chunk);
            }).on('end', function() {
                // tempFile.end();
                fs.renameSync(tempFile.path, dest);
                return;
            });
        });
    });
}

downloadZip("http://www.learningcontainer.com/sample-zip-files/#", "C:/Users/harsh.kesharwani/Downloads")
 
function extractZip (sourcePath, targetPath) {
  try {
      console.log(sourcePath)
      console.log(targetPath);
    fs.createReadStream(sourcePath).pipe(unzipper.Extract({ path: targetPath }));
    console.log('done')
  } catch (err) {
    // handle any errors
    console.log('Extraction failed')
  }
}
// extractZip("C:/Users/harsh.kesharwani/Downloads/convert.zip", 'C:\\Users\\harsh.kesharwani\\Downloads');

function copyZip (sourcePath, targetPath, mode=0 ) {
    try {
        console.log(sourcePath);
        fs.writefilesync (targetPath, fs.readfilesync(sourcePath).toString('utf-8').split('\n'));
        // console.log(targetPath);
        //  fs.copyFile( sourcePath, targetPath, mode, (err)=>{ 
        //     if(err){
        //         console.log(err);
        //         return
        //     }
        //     console.log('done')
        // } );

        // const child = execFile('node',[sourcePath], (error, stdout, stderr) => {
        //     if (error) {
        //         console.error('stderr', stderr);
        //         throw error;
        //     }
        //     console.log('stdout', stdout);
        // });
// exec: spawns a shell.
//  exec('ls -lah /tmp', function(error, stdout, stderr){
// 	console.log(stdout);
// });

// execFile: executes a file with the specified arguments
//  exec(sourcePath, [{cwd: targetPath}], function(error, stdout, stderr){
// 	console.log('==',stdout);
// });
    } catch ( err ) {
      // handle any errors
      console.log('Copy failed', err)
    }
  }
// copyZip("C:\\Users\\harsh.kesharwani\\Downloads\\Harsh_resume.pdf", 'C:\\Users\\harsh.kesharwani\\Downloads\\convert', 1);





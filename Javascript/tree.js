/* var path = require('path');
var fs = require('fs');
var async = require('async');


function getFiles (dirPath, callback) {
    fs.readdir(dirPath, function (err, files) {
        if (err) return callback(err);
        var directoryPath = [];
        var filePaths = [];
        
        async.eachSeries(files, function (fileName, eachCallback) {
            var filePath = path.join(dirPath, fileName);
            fs.stat(filePath, function (err, stat) {
                if (err) return eachCallback(err);

                if (stat.isDirectory()) {
                    getFiles(filePath, function (err, subDirFiles) {
                        if (err) return eachCallback(err);
                        
                        filePaths = filePaths.concat(subDirFiles);
                        directoryPath.push(dirPath);
                        eachCallback(null);
                    });

                } else {

                        filePaths.push(filePath);
                        directoryPath.push(dirPath);
                        //console.log(directoryPath);
                    eachCallback(null);
                }
            });
        }, function (err) {
            
            callback(err, filePaths, directoryPath);
        });
    });
}


 getFiles('../proverks', function (err, files) {
    console.log(err || files);
}); 


 */

// const { resolve } = require('path');
// const { readdir } = require('fs').promises; // промифицированная версия функций из метода

// /**
//  *
//  * @param {stirng} dir папка, с которой начинается сканирование
//  * @returns {Promise<stirng[]>}
//  */
// async function getFiles(dir) {

//     // читаем содержимое директории
//     const dirents = await readdir(dir, { withFileTypes: true });

//     // как и в прошлом примере проходимся по папкам
//     // и, при необходимости рекурсивно вызываем функцию
//     const files = await Promise.all(dirents.map((dirent) => {
//         const res = [resolve(dir, dirent.name), dir];
//         return dirent.isDirectory() ? getFiles(res[0]) : res;
//          /* if (dirent.isDirectory()){
//             getFiles(res[0])
//             return [,dirent];
//         } 
//         else return res; */
//     }));

//     // преобразуем массив файлов в одномерный
//     return Array.prototype.concat(...files);
//     //return files;
// }


// // тестируем
// getFiles('../proverks')
//     .then(files => console.log(files))
//     .catch(err => console.error(err))


/**
 * @names getFiles
 * @author JungHyunKwon
 * @since 2019-02-05
 * @param {obejct} options {
       directory : string,
	   recursive : boolean
   }
   @param {function} callback {array}
 */

   'use strict';

   const fs = require('fs');
   
   function getFiles(options, callback) {
       //함수일 때
       if(typeof callback === 'function') {
           let result = [];
   
           //객체일 때
           if(options) {
               let baseDirectory = options.directory;
   
               fs.readdir(baseDirectory, (err, directories) => {
                   //오류가 있을 때
                   if(err) {
                       callback(result);
                   }else{
                       let directoriesLength = directories.length,
                           recursive = options.recursive;
   
                       //불리언이 아닐 때
                       if(typeof recursive !== 'boolean') {
                           recursive = false;
                       }
   
                       (function loopDirectories(index) {
                           //개수만큼 반복
                           if(directoriesLength > index) {
                               let directory = baseDirectory + '/' + files[index];
   
                               fs.stat(directory, (err, stats) => {	
                                   let nextIndex = index + 1;
   
                                   //오류가 있을 때
                                   if(err) {
                                       loopDirectories(nextIndex);
                                   }else{
                                       //파일일 때
                                       if(stats.isFile()) {
                                           result.push(directory);
                                           
                                           loopDirectories(nextIndex);
   
                                       //재귀이면서 폴더일 때
                                       }else if(recursive && stats.isDirectory()) {
                                           getFiles({
                                               directory : directory,
                                               recursive : recursive
                                           }, files => {
                                               result = result.concat(files);
   
                                               loopDirectories(nextIndex);
                                           });
                                       }else{
                                           loopDirectories(nextIndex);
                                       }
                                   }
                               });
                           }else{
                               callback(result);
                           }
                       })(0);
                   }
               });
           }else{
               callback(result);
           }	
       }
   }
   
   getFiles({directory : '../proverks',
   recursive : true}, function (err, {files}) {
    console.log(err || files);
}); 
   module.exports = getFiles;
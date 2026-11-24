#!/usr/bin/env node
/* Writes learn.js's META table: [minutes, gzip bytes] for each lazy-loaded lesson file (deep/*.js),
   plus "_" for deep.js. Minutes = the lesson's reading time + 4 (3 questions and the written answer);
   unit tests 20, the module project 30. Run after editing deep/*.js: node scripts/learn-meta.js [--check] */
var fs=require("fs"),path=require("path"),zlib=require("zlib");var R=path.join(__dirname,"..");
var gz=function(f){return zlib.gzipSync(fs.readFileSync(path.join(R,f))).length};var M={_:[0,gz("deep.js")]};
fs.readdirSync(path.join(R,"deep")).filter(function(f){return /\.js$/.test(f)}).sort().forEach(function(f){var w={};new Function("window",fs.readFileSync(path.join(R,"deep",f),"utf8"))(w);
 Object.keys(w.RA2DeepData||{}).forEach(function(k){var d=w.RA2DeepData[k];var min=d.steps?(parseInt(d.min,10)||8)+4:d.sec?30:20;M[k]=[min,gz("deep/"+f)]})});
var file=path.join(R,"learn.js"),src=fs.readFileSync(file,"utf8"),re=/\/\*META\*\/[\s\S]*?\/\*END\*\//,now=re.exec(src);if(!now){console.error("META markers missing");process.exit(1)}
var want="/*META*/"+JSON.stringify(M)+"/*END*/";
if(process.argv.indexOf("--check")>=0){if(now[0]!==want){console.error("learn.js META is out of date: run node scripts/learn-meta.js");process.exit(1)}console.log("learn.js META up to date ("+Object.keys(M).length+" entries)");process.exit(0)}
fs.writeFileSync(file,src.replace(re,want));console.log("learn.js META written ("+Object.keys(M).length+" entries)");

const fs = require('fs');
const path = require('path');

const folders = [];
const items = [];

process.argv.forEach(function (val, index, array) {
  if (index > 1) {
    folders.push(val)
  }
});

for (let i = 0; i < folders.length; i += 1) {
  const path = `${__dirname}/${folders[i].slice(1)}`;
  folders[i] = path;
}

// get files

for (let i = 0; i < folders.length; i += 1) {
  console.log(`비교대상 ${i + 1}:`,folders[i].split('/')[folders[i].split('/').length - 1]);

  const folderPath = folders[i];
  const files = [];

  fs.readdirSync(folderPath).forEach(file => {
    files.push(file)
  });

  for (let j = 0; j < files.length; j += 1) {
    const filePath = `${folders[i]}/${files[j]}`;
    const stats = fs.statSync(filePath);
    files[j] = [files[j], stats.size];  // 이름 및 파일 크기
  }

  items.push(files)
}

// compare each other
if(JSON.stringify(items[0])==JSON.stringify(items[1])) {
  console.log('두 폴더 내의 각각 파일들의 이름과 용량이 동일함.');
} else {
  console.log('서로 다른 데이터를 가진 폴더임.')
}

#! /usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const Git = require("nodegit");
const program = require('commander');
const templateGitUrl = 'https://github.com/stevenwujianpeng/js-min-template.git';

program
  .command('create <project>')
  .action((project) => {
    const rootDir = process.cwd();
    const projectDir = path.join(rootDir, project);

    if (fs.pathExistsSync(projectDir)) {
      console.log('已经存在当前目录！请选择新的项目名！');
    } else {
      console.log('准备创建项目: ', project);
      console.log('开始请求仓库...');
    }

    Git.Clone(templateGitUrl, project).then(function () {
      // process.exit(1);
      const gitPath = path.join(process.cwd(), project, '.git');

      fs.remove(gitPath, function () {
        console.log('创建成功');
        console.log('cd %s', project);
        console.log('npm i');
      });
    });
  });

program.parse(process.argv);


#! /usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const Git = require("nodegit");
const jsonfile = require('jsonfile');
const program = require('commander');
const inquirer = require('inquirer');
const templateGitUrl = 'https://github.com/stevenwujianpeng/js-min-template.git';

program
  .command('create <project>')
  .action((project) => {
    const rootDir = process.cwd();
    const projectDir = path.join(rootDir, project);
    const questions = [{
      type: 'input',
      name: 'name',
      message: '库名：',
    }, {
      type: 'input',
      name: 'version',
      message: '版本号：',
    }, {
      type: 'input',
      name: 'description',
      message: '库的描述：',
      }, {
        type: 'input',
        name: 'repository',
        message: '库的地址：',
      }, {
      type: 'input',
      name: 'keywords',
      message: 'keywords (字符串，以,隔开)'
    }, {
      type: 'input',
      name: 'author',
      message: '库的作者'
    }, {
      type: 'input',
      name: 'bugs',
      message: '库的bug提交地址'
    }, {
      type: 'input',
      name: 'files',
      message: 'files (字符串，以,隔开)'
    }, {
      type: 'input',
        name: 'homepage',
      message: '库的主页地址'
    }];

    if (fs.pathExistsSync(projectDir)) {
      console.log('已经存在当前目录！请选择新的项目名！');
    } else {
      inquirer.prompt(questions).then((result) => {
        console.log('准备创建项目: ', project);
        console.log('开始请求仓库...');

        Git.Clone(templateGitUrl, project).then(function () {
          const gitPath = path.join(process.cwd(), project, '.git');
          const packageJsonPath = path.join(process.cwd(), project, 'package.json');

          jsonfile.readFile(packageJsonPath, function (err, obj) {
            if (err) console.error(err);

            obj.name = result.name; // 库名
            obj.version = result.version; // 库的版本号
            obj.description = result.description; // 库的描述
            obj.author = result.author; // 库的描述
            obj.repository = result.repository; // 库的地址
            obj.homepage = result.homepage; // 库的主页
            obj.keywords = result.keywords.split(','); // 库的关键字
            obj.files = ['dist'].concat(result.files.split(',')); // 库的对外目录
            obj.bugs = { url: result.bugs }; // 库的bug地址
            obj.main = "dist/" + result.name + '.cjs.js';
            obj.module = "dist/" + result.name + '.es.js';

            jsonfile.writeFile(packageJsonPath, obj, { spaces: 2, EOL: '\r\n' }, function (err) {
              if (err) console.error(err);

              fs.remove(gitPath, function () {
                console.log('创建成功');
                console.log('cd %s', project);
                console.log('npm i');
              });
            })
          })
        });
      });
    }
  });

program.parse(process.argv);


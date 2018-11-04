用ES6语法开发一套完整的三方库（library or tool）
> Note: 用执行单测或者node运行来验证代码模块，暂不提供在浏览器中验证代码的功能

## 特性
- ES6 编写源代码和测试代码
- 基于Babel 7 语法
- rollup打包，可输出多种模块规范的代码库：es commonjs umd iife
- Mocha 作为单元测试库，可生成覆盖率报告

## 安装

```
npm i es6-lib-scaffold --global
```

## 使用

```
es6-lib-scaffold create <lib name>
cd lib-name
npm i
```
## 需要自己定义package.json

```
{
 "name": {修改成自己的库名},   
 "version": "1.0.0",
 "description": {修改成你对库的描述},
 "main": 输出模块名,
 "module": 输出模块名,
 "keywords": 库的关键字,
 "author": 作者,
 "license": 库的证书类型，必填
 "bugs": 库的bug提交,
 "files": 包的对外可见的文件
 "homepage": 库的主页
}
```



## 项目的基本架构
- .editorConfig 编辑器代码风格 
- .eslintrc 继承eslint:recomand,支持es6语法的检查
- babel.config.js 配置es6的编译规则
- rollup.config.js 配置打包






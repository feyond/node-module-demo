# NPM Module 创建开发
 - [Publishing Node modules with TypeScript and ES modules](https://blog.logrocket.com/publishing-node-modules-typescript-es-modules/)


## 1.`mkdir <profile-name>`

```shell
mkdir test-module
```
## 2. `cd <profile-name>`
```shell
cd test-module
```

## 3. `npm init --scope=@my-username`
```shell
npm init --scope=@feyond
```

## 4. 编码
### 4.1 Typescript
- 安装
    ```shell
    npm i typescript -D
    ```
- 生成`tsconfig.json`
    ```shell
    tsc --init
    ```
- 配置`tsconfig.json`

    [参考tsconfig配置详解](https://juejin.cn/post/6844904093568221191)

    module: ESM
    ```json lines
    {
      "compilerOptions": {
        "outDir": "./lib/esm",
        "module": "ESNext",
        "target": "ES6",
        "strict": true,
        "sourceMap": true,
        "moduleResolution": "Node",
        "allowJs": false,
        "noImplicitAny": true,
        "removeComments": true,
        "declaration": false
      },
      "include": ["src"],
      "exclude": [
        "node_modules", "dist", "lib", "esm", "cjs", "ums", "index.d.ts", "typings"
      ]
    }
    ```
    module: CommonJS
    ```json lines
    {
      "extends": "./tsconfig.json",
      "compilerOptions": {
        "module": "CommonJS",
        "outDir": "./lib/cjs"
      }
    }
    ```

- 配置`package.json` `scripts`
    ```json
    {
      "scripts": {
        "build": "tsc",
        "build:all": "npm run build:types && npm run build:cjs && npm run build:esm",
        "build:esm": "tsc -p tsconfig.json",
        "build:cjs": "tsc -p tsconfig.cjs.json",
        "build:types": "tsc --declaration --emitDeclarationOnly --outDir ./lib",
        "prepublish": "npm run build:all"
      }
    }
    ```
    `prepublish`脚本会在`npm publish`命令执行时自动执行, 以确保编辑文件最新。

### 4.2 Jest

- 安装
```
npm install --save-dev jest ts-jest @types/jest
```

- 生成基础配置文件
```shell
jest --init
```
- 将`jest.config.js`改为`jest.config.ts`
```ts
export default {
  coverageProvider: "v8",
  moduleDirectories: [
    "src", "node_modules"
  ],
  preset: "ts-jest",
  testEnvironment: "node",
};
```
> `moduleDirectories`必须包含`src`, 否则找不到对应的`import module`

- `tsconfig.json`增加`Module Resolution`
```json lines
{
  "compilerOptions": {
    // ...
    "baseUrl": "./src",
  },
  // ...
}

```

- 配置`package.json` `scripts`
```json lines
{
  "scripts": {
    // ...
    "test": "jest",
  }
}

```
### 4.3 编译 - `rollup`

- 安装
```
npm install -D rollup \
rollup-plugin-terser \
rollup-plugin-delete \
@rollup/plugin-node-resolve \
@rollup/plugin-babel \
@rollup/plugin-commonjs \
@rollup/plugin-typescript
```

## 5. `npm publish`
```shell
npm publish --access public
```
### 常规版本规则

假设我们使用的版本是`1.0.0`, 有3部分组成(`major`.`minor`.`patch`):

- 如果更新是补丁版本(小的更改), 则增加版本号的最后一部分`patch`。
```shell
npm version patch
```

- 如果更新是次要版本(增加新功能), 则增加版本号的中间部分`minor`。
```shell
npm version minor
```

- 如果更新是主要版本(主要功能或主要问题修复), 则要增加版本号的第一部分`major`。
```shell
npm version major
```
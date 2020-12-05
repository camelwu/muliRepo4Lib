const fs = require('fs');
const rollup = require('rollup'); // 引入rollup
const builtins = require('rollup-plugin-node-builtins');
const typescript = require('rollup-plugin-typescript2') // 压缩代码的插件
const terser = require('rollup-plugin-terser').terser // 压缩代码的插件
const commonjs = require('@rollup/plugin-commonjs') // rollup默认支持es6的模块系统，需要支持commonjs的话需要这个插件
const babel = require('rollup-plugin-babel') // rollup的babel 插件 
const nodeResolve = require('@rollup/plugin-node-resolve'); //解析node_modules中的模块
const args = process.argv[2] // 拿到 npm run build packName 中的packName
const logLevel = 2;
const projectPath = `./packages/${args}` // 子包path

const banner =
  '/*!\n' +
  ` * (c) 2014-${new Date().getFullYear()} FE-Team\n` +
  ' * Released under the Apache License.\n' +
  ' */';
const babelOptions = {
  exclude: 'node_modules/**',
  plugins: ['external-helpers'],
  // babelrc: false
}
const nodeOptions = {
  extensions: ['.js', '.ts'],
  jsnext: true,
  main: true,
  browser: true,
  preferBuiltins: true
}
// 输入的文件配置
const inputOptions = {
  input: `${projectPath}/src/index.ts`,
  plugins: [
    builtins(),
    nodeResolve(nodeOptions),
    commonjs(),
    typescript({
      tsconfig: `./packages/${args}/tsconfig.json`
    }),
    babel({ // babel文件的设置，会读取根目录的babel.config.js文件配置
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    }),
    // terser()
  ]
};
// 输出的配置
const outputOptions = {
  banner: banner,
  file: `${projectPath}/lib/index.js`,
  format: 'es',
  name: `${args}`,
  sourcemap: true
};
// board,im,upload需要特殊处理
function resetInput(input) {
  let config = { ...input };
  switch (args) {
    case "board":
      config.external = ['events', 'fabric'];
      break;
    case "im":
      config.external = ['events', 'agora-rtm-sdk', 'RongIMLib', 'RongIMClient'];
      break;
    case "rtc":
      config.external = ['events', 'agora-rtc-sdk', 'events', 'trtc-js-sdk', 'webrtc-zego'];
      break;
    case "upload":
      config.external = ['ali-oss'];
      break;
    case "wechat":
      config.external = ['qs'];
      break;
    default:
      return config;
  }
  return config;
}
function resetOutput(input) {
  let config = { ...input };
  switch (args) {
    case "board":
      config.globals = {
        EventEmitter: 'events',
        fabric: 'fabric'
      };
      break;
    case "im":
      config.globals = {
        RongIMLib: 'RongIMLib',
        RongIMClient: 'RongIMClient',
        'agora-rtm-sdk': 'AgoraRTM',
        EventEmitter: 'events'
      };
      break;
    case "rtc":
      config.globals = {
        'agora-rtc-sdk': 'AgoraRTC',
        'trtc-js-sdk': '',
        'webrtc-zego': 'ZRTC',
        EventEmitter: 'events',
      };
      break;
    case "upload":
      config.globals = {
        OSS: 'ali-oss'
      };
      break;
    case "wechat":
      config.globals = { qs: 'qs' };
      break;
    default:
      return config;
  }
  return config;
}
async function build() {
  // create a bundle
  const options = resetInput(inputOptions);
  const bundle = await rollup.rollup(options);
  console.log(bundle.watchFiles);
  
  // generate code
  const { output } = await bundle.generate(outputOptions);
  if(logLevel === 1){
  for (const chunkOrAsset of output) {
    if (chunkOrAsset.type === 'asset') {
      // For assets, this contains
      // {
      //   fileName: string,              // the asset file name
      //   source: string | Uint8Array    // the asset source
      //   type: 'asset'                  // signifies that this is an asset
      // }
      console.log('Asset', chunkOrAsset);
    } else {
      // For chunks, this contains
      // {
      //   code: string,                  // the generated JS code
      //   dynamicImports: string[],      // external modules imported dynamically by the chunk
      //   exports: string[],             // exported variable names
      //   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
      //   fileName: string,              // the chunk file name
      //   imports: string[],             // external modules imported statically by the chunk
      //   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
      //   isEntry: boolean,              // is this chunk a static entry point
      //   map: string | null,            // sourcemaps if present
      //   modules: {                     // information about the modules in this chunk
      //     [id: string]: {
      //       renderedExports: string[]; // exported variable names that were included
      //       removedExports: string[];  // exported variable names that were removed
      //       renderedLength: number;    // the length of the remaining code in this module
      //       originalLength: number;    // the original length of the code in this module
      //     };
      //   },
      //   name: string                   // the name of this chunk as used in naming patterns
      //   type: 'chunk',                 // signifies that this is a chunk
      // }
      console.log('Chunk', chunkOrAsset.modules);
    }
  }
  }
  const option = resetOutput(outputOptions);
  await bundle.write(option); // outputOptions放在这里
}

build();

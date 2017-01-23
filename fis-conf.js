fis.config.set('namespace', 'walker');
// 配置编译产出忽略文件
var ignores = fis.get('project.ignore');
// 项目发布忽略配置
fis.set('project.ignore', ignores.concat([
    'fis.properties',
    'package.json',
    'component.json',
    'README.md',
    'server.log',
    'yarn.lock',
    'yarn-error.log',
    'node_modules/**.map'
]));

// 配置amd规范
// npm install [-g] fis3-hook-amd
fis.hook('amd', {
    // 配置基本路径
    baseUrl: './',
    // 配置别名
    paths: {
        dep: './dep'
    }
});
// 配置采用amd规范的脚本
fis.match('/src/**/*.js', {
    isMod: true // 设置 comp 下都是一些组件，组件建议都是匿名方式 define
});
fis.match('/widget/**/*.jsx', {
    isMod: true // 设置 comp 下都是一些组件，组件建议都是匿名方式 define
});
// 配置编译es6
// 编译所有后缀为 jsx 的文件为 js
fis.match('*.{js, jsx}', {
    parser: fis.plugin('babel-5.x', {
        sourceMaps: false
    }),
    useHash: true,
    rExt: '.js'
});

// less编译配置
fis.match('*.less', {
    // fis-parser-less 插件进行解析
    parser: fis.plugin('less'),
    // 压缩css代码
    optimizer: fis.plugin('clean-css', {}),
    // 配置输出代码地址
    packTo: 'css/$0',
    // .less 文件后缀构建后被改成 .css 文件
    rExt: '.css'
}).match('**.{less, css}', {
    postprocessor: fis.plugin('autoprefixer', {
        // https://github.com/ai/browserslist#queries
        browsers: ['Firefox >= 20', 'Safari >= 6', 'ie >= 9',  'Chrome >= 12'],
        flexboxfixer: true,
        gradientfixer: true
    })
});

// 设置打包
fis.match('::package', {
    // 设置异步依赖打包配置
    packager: fis.plugin('deps-pack', {
        'src/home/pkg/main.js': [
            'src/home/main.js',
            'src/home/main.js:deps'
        ]
    }),
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'amd',
        allInOne: true,
        useInlineMap: true // 资源映射表内嵌
    })
});
fis.config.set('modules.postpackager', 'simple');
fis.config.set('settings.postpackager.simple.autoCombine', true);

// 设置开发环境

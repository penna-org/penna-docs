# 模块化开发

在前面我们有介绍过模块化的开发方式，这里我们将详细介绍模块化开发的相关内容。

## 什么是模块化开发

模块化开发是指将一个完整的项目拆分成一个个独立的模块，每个模块都有自己的功能，模块之间可以相互调用，这样可以提高代码的复用性，降低代码的耦合度，提高代码的可维护性。

## 如何创建模块

在前面我们介绍了如何创建一个项目，创建一个模块和创建一个项目是一样的，只是在创建模块的时候需要选择模块的类型，如下图所示：

![create-penna.png](/create-penna.png)

我们需要给模块给定一个名称，然后选择模块的类型，指定一个包名称，类型选择模块即可。

## 模块的目录结构

一个最基础的模块的目录结构如下：

```
penna-module
├── src
│   ├── plugins                         // 插件目录
│   ├── runtime                         // 运行时文件
│   │   ├── middlewares                 // 中间件目录
│   │   ├── pages                       // 页面目录
│   │   ├── .....                       // 更多文件夹，这里完全可以自己创建
│   │   └── components                  // 组件
│   ├── entry.ts                        // 模块加载入口与main.ts类似
│   └── module.ts                       // 默认的导出模块的文件
├── package.json                        // 模块包配置文件
├── tsconfig.json                       // ts配置文件
└── penna.config.ts                     // 模块配置文件
```

这是一个基础的目录结构，但是默认情况下，我们只会生成`src`目录下的`module.ts`和`entry.ts`文件，其他的目录如果你有需要可以自己创建。

::: tip 小贴士
这里我们建议按照功能分割，如果你的项目中有很多属于运行时的文件，你可以将所有有关运行时的文件放到`runtime`目录下

如果你的项目中也包含了插件，等`node`操作，建议与`runtime`平级，而不是与运行时混用，这样目录结构更为清晰。
:::

## 模块入口

默认情况下，我们所有的模块的入口都是`module.ts`文件，形式大致如下：

```ts
import { definePennaModule, createResolver, addPageDir } from "@penna/kit"

export default definePennaModule({
    // 这一部分参考了nuxt3的配置方式
    meta:{
        name:"module-name",
        configKey:"module"
    },
    // 这里是整个模块的配置入口
    setup(){
        // 这里是自动配置路径
        const resolver = createResolver(import.meta.url)
        // 这里我们一般只需要做导入的操作，可以调用node模块，但是不要调用运行时的内容，因为这里是在编译时执行的。
        // 你可以在这里导入你的插件、页面、中间件等
        // 指定运行时文件的入口，这里不需要写文件的后缀，默认会自动补全并进行加载
        addEntryFile(resolver.resolve('./entry'))
        // 通过配置addPageDir可以自动导入页面
        addPageDir(resolver.resolve('./runtime/pages'))
        // 配置中间件文件夹入口
        addScanMiddleware(resolver.resolve('./runtime/middlewares'))
    }
})

```

这里我们采用了类似`nuxt`的使用方式来减少大家的学习成本，如果你对`nuxt`的配置比较熟悉，那么上手这一块儿来说会比较容易。


## 模块配置项

对于`definePennaModule`还有很多的配置项，如下：

```ts
interface ModuleMeta {
    // 模块的名称
    name?: string;
    // 模块的版本
    version?: string;
    // 模块的配置key
    configKey?: string;
    [key: string]: any;
}


interface ModuleConfig<T extends Options = Options> {
    // 模块的元信息配置
    meta?: ModuleMeta;
    // 模块的配置
    defaults?: T | ((penna: PennaApp) => T);
    // 运行时和编译时的配置
    setup?: (option: T, penna: PennaApp) => void | Promise<void>;
    /**
     * 运行时的环境变量
     */
    runtimeEnv?: RuntimeEnv;
    /**
     * 模块的依赖，这里可以依赖其他的更底层的模块，只需要在这里添加即可
     */
    modules?: string[];
}

```
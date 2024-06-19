# 使用插件

你可以通过插件来扩展`penna`的功能；
目前`penna`的插件中只允许配置`vite`的插件系统。


## 添加一个插件

你可以在前面提到的`plugins`目录下创建一个插件的`ts`文件，然后在`module.ts`中引入这个插件。


`./plugins/module-plugin-name.ts`

```ts
import { definePennaPlugin, usePennaApp } from '@pennajs/kit'


export default definePennaPlugin({
    name: 'module-plugin-name',
    vitePlugins: () => {
        // 获取penna的实例
        const penna = usePennaApp()
        // 最终返回一个vite插件的列表
        return [
            {
                name: 'vite-plugin-module-name',
            },
           
        ]
    },
})

```

`./src/module.ts`

```ts
import { definePennaModule, createResolver, addPlugin } from '@pennajs/kit'

export  default definePennaModule({
   //...忽略前
    setup() {
        const resolver = createResolver(import.meta.url)
        // ...忽略前
        // 添加插件
        addPlugin('./plugins/module-plugin-name')
        // ...忽略后
    },
    // ...忽略后
})

```

目前我们底层采用的是`vite`来作为脚手架支持，所以插件的`api`写法与`vite`的插件写法是一致的，所以你完全可以参考`vite`官网的[插件API](https://cn.vitejs.dev/guide/api-plugin.html)
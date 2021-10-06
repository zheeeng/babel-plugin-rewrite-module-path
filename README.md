# babel-plugin-rewrite-module-path

<div align="center">

[![Known Vulnerabilities][known-vulnerabilities-image]][known-vulnerabilities-url]
[![Maintainability][maintainability-image]][maintainability-url]
![publish workflow][publish-workflow-image]
[![Test Coverage][test-coverage-image]][test-coverage-url]
[![license][license-image]][license-url]
[![GitHub issues][github-issues-image]][github-issues-url]
![NPM bundle size(minified + gzip)][bundle-size-image]

[known-vulnerabilities-image]: https://snyk.io/test/github/zheeeng/babel-plugin-rewrite-module-path/badge.svg
[known-vulnerabilities-url]: https://snyk.io/test/github/zheeeng/babel-plugin-rewrite-module-path

[maintainability-image]: https://api.codeclimate.com/v1/badges/d3eaf22221bf57742429/maintainability
[maintainability-url]: https://codeclimate.com/github/zheeeng/babel-plugin-rewrite-module-path/maintainability

[publish-workflow-image]: https://github.com/zheeeng/babel-plugin-rewrite-module-path/actions/workflows/publish.yml/badge.svg

[test-coverage-image]: https://api.codeclimate.com/v1/badges/d3eaf22221bf57742429/test_coverage
[test-coverage-url]: https://codeclimate.com/github/zheeeng/babel-plugin-rewrite-module-path/test_coverage

[license-image]: https://img.shields.io/github/license/mashape/apistatus.svg
[license-url]: https://github.com/zheeeng/babel-plugin-rewrite-module-path/blob/master/LICENSE

[github-issues-image]: https://img.shields.io/github/issues/zheeeng/babel-plugin-rewrite-module-path
[github-issues-url]: https://github.com/zheeeng/babel-plugin-rewrite-module-path/issues

[bundle-size-image]: https://img.shields.io/bundlephobia/minzip/babel-plugin-rewrite-module-path.svg

[![NPM](https://nodei.co/npm/babel-plugin-rewrite-module-path.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/babel-plugin-rewrite-module-path/)

</div>

> Rewrite module resolving path

case 1: **Rewrite a specific module subpath to `node_modules`**

```diff
- import foo from "@monorepo/shared/modules/foo"
+ import foo from "@monorepo/shared/node_modules/foo"
```

via

```json
// .babelrc.json
{
  "plugins": ["babel-plugin-rewrite-module-path", {
      "rewriteMapper": {
          "^@monorepo/shared/modules/": "@monorepo/shared/node_modules/"
      }
  }]
}
```

case 2: **Rewrite a cjs importing to esm importing**

```diff
- import inversify from "inversify/lib/inversify"
+ import inversify from "inversify/es/inversify"
```

via

```json
// .babelrc.json
{
  "plugins": ["babel-plugin-rewrite-module-path", {
      "rewriteMapper": {
          "^inversify/lib/": "inversify/es/"
      }
  }]
}
```

case 3: **Rewrite a lodash importing to lodash fp importing**(for typescript user don't forget to config the paths compiler options of tsconfig.json to adjust intelligence)

```diff
- import flatMap from "lodash/flatMap"
+ import flatMap from "lodash/fp/flatMap"
```

via

```json
// .babelrc.json
{
  "plugins": ["babel-plugin-rewrite-module-path", {
      "rewriteMapper": {
          "^lodash/": "lodash/fp/"
      }
  }]
}
```

---

## Scenes

* Take the advantage of rewriting to shorten the importing path. / Config the importing path to a preferred/reader-friendly one.
* Rewrite module subpath for hacking the resolving mechanism. e.g. in some bundling situation.
* It could be an alternative approach to declaring [`exports`](https://nodejs.org/api/packages.html#packages_package_entry_points) filed to tell the node modules resolver how to resolve a `node_modules` package.

    ```json
    // package.json
    {
        "exports": {
            "modules/*": "./node_modules/*"
        }
    }
    ```

  > For Javascript user, you could use a custom folder name as replacement to `node_modules`, it's common for implementing a monorepo project. e.g.

    ```js
    // '../../modules/..' will be rewritten to '../../node_modules/..'
    import singletonModule from '@monorepo/shared/modules/inversify'
    ```

  > For Typescript user, you need additional works to support intelligence through module path rewriting, see [typescript paths](https://www.typescriptlang.org/tsconfig#paths) for more details. e.g.

    ```json
    // tsconfig.json
    {
        "compilerOptions": {
            "baseUrl": ".",
                "paths": {
                    // we already have type-safe node_modules aliasing, still need a runtime rewriting for development and production building.
                    "@monorepo/shared/modules/*": ["./packages/shared/node_modules/*", "./packages/shared/node_modules/@types/*"]
                }
        }
    }
    ```

---

## Glance at the rewritable statements

Supports these module importing usages:

* `Import Declaration`
* `Export All Declaration`
* `Export Named Declaration`
* `Dynamic Importing`
* `require`
* `require.context`
* `import.meta.glob`
* `import.meta.globEager`.

rewrite

```js
import foo from '@monorepo/shared/modules/foo'

import * as foo from '@monorepo/shared/modules/foo'

import '@monorepo/shared/modules/foo'

export * from '@monorepo/shared/modules/foo'

export { bar } from '@monorepo/shared/modules/foo'

export { default as foo } from '@monorepo/shared/modules/foo'

const foo = await import('@monorepo/shared/modules/foo')

const { bar } = await import('@monorepo/shared/modules/foo')

import('@monorepo/shared/modules/foo')

const foo = require('@monorepo/shared/modules/foo')

const foo = import.meta.glob('@monorepo/shared/modules/foo')

const foo = import.meta.globEager('@monorepo/shared/modules/foo')

const foo = require.context('@monorepo/shared/modules/foo')
```

to

```js
import foo from '@monorepo/shared/node_modules/foo'

import * as foo from '@monorepo/shared/node_modules/foo'

import '@monorepo/shared/node_modules/foo'

export * from '@monorepo/shared/node_modules/foo'

export { bar } from '@monorepo/shared/node_modules/foo'

export { default as foo } from '@monorepo/shared/node_modules/foo'

const foo = await import('@monorepo/shared/node_modules/foo')

const { bar } = await import('@monorepo/shared/node_modules/foo')

import('@monorepo/shared/node_modules/foo')

const foo = require('@monorepo/shared/node_modules/foo')

const foo = import.meta.glob('@monorepo/shared/node_modules/foo')

const foo = import.meta.globEager('@monorepo/shared/node_modules/foo')

const foo = require.context('@monorepo/shared/node_modules/foo')
```

## Usage

* install:

```sh
npm install babel-plugin-rewrite-module-path
```

* config via babelrc:

```json
// .babelrc.json
{
  "plugins": ["babel-plugin-rewrite-module-path", {
      "rewriteMapper": {
          "/modules/", "/node_modules/"
      }
  }]
}
```

## Full Option

The plugin options signatures:

```ts
export type RewriteModulePathOptions = {
    rewriteMapper: Record<string, string>,
    transform?: {
        importDeclaration?: boolean,
        exportDeclaration?: boolean,
        dynamicImport?: boolean,
        importGlob?: boolean,
        importGlobEager?: boolean,
        require?: boolean,
        requireContext?: boolean,
    }
}
```

The default options:

```ts
export const defaultRewriteModulePathOptions = {
    transform: {
        importDeclaration: true,
        exportDeclaration: true,
        dynamicImport: true,
        importGlob: true,
        importGlobEager: true,
        require: true,
        requireContext: true,
    }
}
```

## References

* [Nodejs Package Entry Points](https://nodejs.org/api/packages.html#packages_package_entry_points)
* [tsconfig#compilerOptions#paths](https://www.typescriptlang.org/tsconfig#paths)
  
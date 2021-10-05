import type babelCore from '@babel/core'
import path from 'path'

function join(...args: string[]) {
  // windows separator
  if (path.sep === '\\') {
    return path.join(...args).replace(/\\/g, '/')
  }
  return path.join(...args)
}

export type RewriteNodeModulesOptions = {
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

export const defaultRewriteNodeModulesOptions = {
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

export default function babelPluginRewriteNodeModules (_: typeof babelCore, options: RewriteNodeModulesOptions): babelCore.PluginObj {
  const { rewriteMapper, transform } = { ...defaultRewriteNodeModulesOptions, ...options }

  const rewriters = Object.entries(rewriteMapper).map(
    ([from, to]) => {
      const fromPath = new RegExp(join(from, '/'))
      const toPath = join(to, '/')
      return (toRewrite: string) => {
        const formattedToRewrite = join(toRewrite)
        if (!fromPath.test(formattedToRewrite)) {
          return null
        }

        return formattedToRewrite.replace(fromPath, toPath)
      }
    })

  const rewriteStringLiteral = (toRewrite: string) => rewriters.reduce<string | null>(
    (result, rewriter) => result ?? rewriter(toRewrite),
    null,
  ) ?? toRewrite

  return {
    name: 'rewrite-node-modules',
    visitor: {
      ImportDeclaration (path) {
        if (
          /** @param: enable import declaration */ (transform.importDeclaration)
          /**
           * @example matched cases:
           * ```
           * import foo from '@monorepo/shared/modules/foo'
           * import { bar } from '@monorepo/shared/modules/foo'
           * import '@monorepo/shared/modules/foo'
           * ```
           */
        ) {

          path.node.source.value = rewriteStringLiteral(path.node.source.value)
        }
      },
      ExportDeclaration (path) {
        if (
          /** @param: enable export declaration */ (transform.exportDeclaration)
          /**
           * @example matched cases:
           * ```
           * export * from '@monorepo/shared/modules/foo'
           * export { bar } from '@monorepo/shared/modules/foo'
           * export default from '@monorepo/shared/modules/foo'
           * ```
           */
          &&
          ('source' in path.node && path.node.source)
        ) {
          path.node.source.value = rewriteStringLiteral(path.node.source.value)
        }
      },
      CallExpression (path) {
        if ((
          /** @param: enable dynamic importing */ (transform.dynamicImport) &&
          /**
           * @example matched cases:
           * ```
           * const foo = await import('@monorepo/shared/modules/foo')
           * const { bar } = await import('@monorepo/shared/modules/foo')
           * import('@monorepo/shared/modules/foo')
           * ```  
           */
          (path.node.callee.type === 'Import')
        ) || (
          /** @param: enable require call expression */ (transform.require) &&
          /**
           * @example matched cases:
           * ```
           * const foo = require('@monorepo/shared/modules/foo')
           * ```
           */
          (
            path.node.callee.type === 'Identifier' && path.node.callee.name === 'require' &&
            !path.scope.hasOwnBinding('require')
          )
        ) || (
          /** @param: enable require.context call expression */ (transform.requireContext) &&
          /**
           * @example matched cases:
           * ```
           * const foo = require.context('@monorepo/shared/modules/foo')
           * ```
           */
          (
            path.node.callee.type === 'MemberExpression' && path.node.callee.property.type === 'Identifier' && path.node.callee.property.name === 'context' &&
            path.node.callee.object.type === 'Identifier' && path.node.callee.object.name === 'require' &&
            !path.scope.hasOwnBinding('context') && !path.parentPath.scope.hasOwnBinding('require')
          )
        ) || (
          /** @param: enable glob import call expression */ (transform.importGlob || transform.importGlobEager) &&
          /**
           * @example matched cases:
           * ```
           * const foo = import.meta.glob('@monorepo/shared/modules/foo')
           * const foo = import.meta.globEager('@monorepo/shared/modules/foo')
           * ```
           */
          (
            path.node.callee.type === 'MemberExpression' &&
            path.node.callee.object.type === 'MetaProperty' && path.node.callee.object.property.type === 'Identifier' &&
            path.node.callee.object.property.name === 'meta' && path.node.callee.property.type === 'Identifier' &&
            (
              transform.importGlob && path.node.callee.property.name === 'glob' && !path.scope.hasOwnBinding('glob') ||
              transform.importGlobEager && path.node.callee.property.name === 'globEager' && !path.scope.hasOwnBinding('globEager') 
            )
          )
        )) {
          const maybeImportStringLiteral = path.node.arguments[0]
          if (maybeImportStringLiteral.type === 'StringLiteral') {
            maybeImportStringLiteral.value = rewriteStringLiteral(maybeImportStringLiteral.value)
          }
        }
      }
    }
  }
}

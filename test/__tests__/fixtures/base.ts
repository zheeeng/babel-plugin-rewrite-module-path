import { testCase } from '../../utils/testCase';

describe('Overall base tests', () => {
    describe('Import declaration', () => {

        it('should transform default import declaration', () => {
            const code = `import foo from "@monorepo/shared/modules/foo"`
            const expected = `import foo from "@monorepo/shared/node_modules/foo"`
    
            testCase(code, expected, {
                rewriteMapper: {
                    'modules': 'node_modules'
                }
            })
        })
    
        it('should transform all import declaration', () => {
            const code = `import * as foo from "@monorepo/shared/modules/foo"`
            const expected = `import * as foo from "@monorepo/shared/node_modules/foo"`
    
            testCase(code, expected, {
                rewriteMapper: {
                    'modules': 'node_modules'
                }
            })
        })
    
        it('should transform named import declaration', () => {
            const code = `import { bar } from "@monorepo/shared/modules/foo"`
            const expected = `import { bar } from "@monorepo/shared/node_modules/foo"`
    
            testCase(code, expected, {
                rewriteMapper: {
                    'modules': 'node_modules'
                }
            })
        })
    
        it('should transform bare import declaration', () => {
            const code = `import "@monorepo/shared/modules/foo"`
            const expected = `import "@monorepo/shared/node_modules/foo"`
    
            testCase(code, expected, {
                rewriteMapper: {
                    'modules': 'node_modules'
                }
            })
        })
    })

    describe('Export declaration', () => {
        it('should transform default export declaration', () => {
            const code = `export { default as foo } from "@monorepo/shared/modules/foo"`
            const expected = `export { default as foo } from "@monorepo/shared/node_modules/foo"`
    
            testCase(code, expected, {
                rewriteMapper: {
                    'modules': 'node_modules'
                }
            })
        })

        it('should transform all export declaration', () => {
            const code = `export * from "@monorepo/shared/modules/foo"`
            const expected = `export * from "@monorepo/shared/node_modules/foo"`
    
            testCase(code, expected, {
                rewriteMapper: {
                    'modules': 'node_modules'
                }
            })
        })
    
        it('should transform named export declaration', () => {
            const code = `export { bar } from "@monorepo/shared/modules/foo"`
            const expected = `export { bar } from "@monorepo/shared/node_modules/foo"`
    
            testCase(code, expected, {
                rewriteMapper: {
                    'modules': 'node_modules'
                }
            })
        })
    })

    describe('Dynamic import', () => {
        it('should transform awaitable import call expression', () => {
            const code = `const foo = await import("@monorepo/shared/modules/foo")`
            const expected = `const foo = await import("@monorepo/shared/node_modules/foo")`
    
            testCase(code, expected, {
                rewriteMapper: {
                    'modules': 'node_modules'
                }
            })
        })

        it('should transform import call expression', () => {
            const code = `import("@monorepo/shared/modules/foo")`
            const expected = `import("@monorepo/shared/node_modules/foo")`
    
            testCase(code, expected, {
                rewriteMapper: {
                    'modules': 'node_modules'
                }
            })
        })
    })

    describe('Require call expression', () => {
        it('should transform require call expression', () => {
            const code = `const foo = require("@monorepo/shared/modules/foo")`
            const expected = `const foo = require("@monorepo/shared/node_modules/foo")`
    
            testCase(code, expected, {
                rewriteMapper: {
                    'modules': 'node_modules'
                }
            })
        })

        it('should transform require.context call expression', () => {
            const code = `const foo = require.context("@monorepo/shared/modules/foo")`
            const expected = `const foo = require.context("@monorepo/shared/node_modules/foo")`
    
            testCase(code, expected, {
                rewriteMapper: {
                    'modules': 'node_modules'
                }
            })
        })
    })

    describe('Import glob', () => {
        it('should transform import.meta.glob call expression', () => {
            const code = `const foo = import.meta.glob("@monorepo/shared/modules/foo")`
            const expected = `const foo = import.meta.glob("@monorepo/shared/node_modules/foo")`
    
            testCase(code, expected, {
                rewriteMapper: {
                    'modules': 'node_modules'
                }
            })
        })

        it('should transform import.meta.globEager call expression', () => {
            const code = `const foo = import.meta.globEager("@monorepo/shared/modules/foo")`
            const expected = `const foo = import.meta.globEager("@monorepo/shared/node_modules/foo")`
    
            testCase(code, expected, {
                rewriteMapper: {
                    'modules': 'node_modules'
                }
            })
        })
    })

})
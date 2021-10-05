import { testCase } from '../../utils/testCase'

describe('Import Glob Call', () => {
    it('should transform the native import.meta.glob call expression', () => {
        const code = `\
        const foo = import.meta.glob("@monorepo/shared/modules/foo")

        {
            const glob = () => {}

            const bar = import.meta.glob("@monorepo/shared/modules/bar")
        }
        `
        const expected = `\
        const foo = import.meta.glob("@monorepo/shared/node_modules/foo")
        
        {
            const glob = () => {}

            const bar = import.meta.glob("@monorepo/shared/modules/bar")
        }
        `

        testCase(code, expected, {
            rewriteMapper: {
                'modules': 'node_modules'
            }
        })
    })

    it('should transform the native import.meta.globEager call expression', () => {
        const code = `\
        const foo = import.meta.globEager("@monorepo/shared/modules/foo")

        {
            const globEager = () => {}

            const bar = import.meta.globEager("@monorepo/shared/modules/bar")
        }
        `
        const expected = `\
        const foo = import.meta.globEager("@monorepo/shared/node_modules/foo")
        
        {
            const globEager = () => {}

            const bar = import.meta.globEager("@monorepo/shared/modules/bar")
        }
        `

        testCase(code, expected, {
            rewriteMapper: {
                'modules': 'node_modules'
            }
        })
    })
})

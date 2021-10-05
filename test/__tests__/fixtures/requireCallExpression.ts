import { testCase } from '../../utils/testCase'

describe('Require Call', () => {
    it('should transform the native require call expression', () => {
        const code = `\
        const foo = require("@monorepo/shared/modules/foo")

        {
            const require = () => {}

            const bar = require("@monorepo/shared/modules/bar")
        }
        `
        const expected = `\
        const foo = require("@monorepo/shared/node_modules/foo")
        
        {
            const require = () => {}

            const bar = require("@monorepo/shared/modules/bar")
        }
        `

        testCase(code, expected, {
            rewriteMapper: {
                'modules': 'node_modules'
            }
        })
    })

    it('should transform the native require.context call expression', () => {
        const code = `\
        const foo = require.context("@monorepo/shared/modules/foo")

        {
            const require = {
                context: () => {}
            }

            const bar = require.context("@monorepo/shared/modules/bar")
        }
        {
            const context = () => {}

            const baz = require.context("@monorepo/shared/modules/baz")
        }
        `
        const expected = `\
        const foo = require.context("@monorepo/shared/node_modules/foo")
        
        {
            const require = {
                context: () => {}
            }

            const bar = require.context("@monorepo/shared/modules/bar")
        }
        {
            const context = () => {}

            const baz = require.context("@monorepo/shared/modules/baz")
        }
        `

        testCase(code, expected, {
            rewriteMapper: {
                'modules': 'node_modules'
            }
        })
    })
})

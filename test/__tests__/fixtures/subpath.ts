import { testCase } from '../../utils/testCase'

describe('Subpath transform', () => {
    const code = `\
    import foo from "@monorepo/shared/modules/foo"
    import { bar } from "@monorepo/shared/modules/foo"
    import "@monorepo/shared/modules/foo"
    `

    it('should transform modules by regexp string', () => {
        const expected = `\
        import foo from "@monorepo/shared/node_modules/foo"
        import { bar } from "@monorepo/shared/node_modules/foo"
        import "@monorepo/shared/node_modules/foo"
        `

        testCase(code, expected, { rewriteMapper: { '^@monorepo/shared/modules': '@monorepo/shared/node_modules' }})
        testCase(code, expected, { rewriteMapper: { '^@monorepo/shared/modules/': '@monorepo/shared/node_modules' }})
        testCase(code, expected, { rewriteMapper: { '^@monorepo/shared/modules': '@monorepo/shared/node_modules/' }})
        testCase(code, expected, { rewriteMapper: { '^@monorepo/shared/modules/': '@monorepo/shared/node_modules/' }})
    })

    it('should transform module sub-paths', () => {
        const expected = `\
        import foo from "@monorepo/shared/shared/foo"
        import { bar } from "@monorepo/shared/shared/foo"
        import "@monorepo/shared/shared/foo"
        `

        testCase(code, expected, { rewriteMapper: { 'modules': 'shared' }})
        testCase(code, expected, { rewriteMapper: { 'modules/': 'shared' }})
        testCase(code, expected, { rewriteMapper: { 'modules': 'shared/' }})
        testCase(code, expected, { rewriteMapper: { 'modules/': 'shared/' }})
        testCase(code, expected, { rewriteMapper: { '/modules': '/shared' }})
        testCase(code, expected, { rewriteMapper: { '/modules/': '/shared' }})
        testCase(code, expected, { rewriteMapper: { '/modules': '/shared/' }})
        testCase(code, expected, { rewriteMapper: { '/modules/': '/shared/' }})
    })

})

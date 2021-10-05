import type path from 'path'
import { testCase } from '../../utils/testCase'

jest.mock('path', () => {
    const actualPath: typeof path = jest.requireActual('path')

    const mocked: typeof path = {
        ...actualPath,
        sep: '\\',
    }

    return mocked
})

describe('Windows OS case', () => {
    const code = `\
    import foo from "C:\\\\Workspace\\\\@monorepo/shared/modules/foo"
    import { bar } from "C:\\\\Workspace\\\\@monorepo/shared/modules/foo"
    import "C:\\\\Workspace\\\\@monorepo/shared/modules/foo"
    `

    it('should transform windows path correctly', () => {
        const expected = `\
        import foo from "C:/Workspace/@monorepo/shared/node_modules/foo"
        import { bar } from "C:/Workspace/@monorepo/shared/node_modules/foo"
        import "C:/Workspace/@monorepo/shared/node_modules/foo"
        `

        testCase(code, expected, { rewriteMapper: { '@monorepo/shared/modules': '@monorepo/shared/node_modules' }})
    })

})
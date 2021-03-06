import { transform } from '@babel/core';
import rewriteNodeModules, { RewriteModulePathOptions } from '@root'

export const testCase = (code: string, expected: string, options: RewriteModulePathOptions): void => {
    expect(transform(code, {
        plugins: [
            [rewriteNodeModules, options]
        ]
    })?.code).toBe(transform(expected)?.code)
}

export const testCases = (codes: string[], expectedCodes: string[], options: RewriteModulePathOptions): void => {
    if (codes.length !== expectedCodes.length) throw new Error('Invalid test cases')

    expect(codes.map(code => transform(code, {
        plugins: [
            [rewriteNodeModules, options]
        ]
    })?.code)).toEqual(expectedCodes.map(expected => transform(expected)?.code))
}
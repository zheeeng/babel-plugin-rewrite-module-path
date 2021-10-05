import { testCases } from '../../utils/testCase';

describe('transform options tests', () => {
    const code = `\
    import foo from "@monorepo/shared/modules/foo"
    import * as foo from "@monorepo/shared/modules/foo"
    import { bar } from "@monorepo/shared/modules/foo"
    import "@monorepo/shared/modules/foo"
    export { default as foo } from "@monorepo/shared/modules/foo"
    export * from "@monorepo/shared/modules/foo"
    export { bar } from "@monorepo/shared/modules/foo"
    const foo = await import("@monorepo/shared/modules/foo")
    import("@monorepo/shared/modules/foo")
    const foo = require("@monorepo/shared/modules/foo")
    const foo = require.context("@monorepo/shared/modules/foo")
    const foo = import.meta.glob("@monorepo/shared/modules/foo")
    const foo = import.meta.globEager("@monorepo/shared/modules/foo")
    `

    it('works as expected when enable all transforms', () => {
        testCases(
            code.split('\n').filter(i => i.trim()),
            code.split('\n').filter(i => i.trim()),
            {
                rewriteMapper: { "modules": "node_modules" },
                transform: {
                    importDeclaration: false,
                    exportDeclaration: false,
                    dynamicImport: false,
                    require: false,
                    requireContext: false,
                    importGlob: false,
                    importGlobEager: false,
                },
            }
        )
    })

    it('works as expected when enable all transforms by using default options', () => {
        const expectedCodes = `\
        import foo from "@monorepo/shared/node_modules/foo"
        import * as foo from "@monorepo/shared/node_modules/foo"
        import { bar } from "@monorepo/shared/node_modules/foo"
        import "@monorepo/shared/node_modules/foo"
        export { default as foo } from "@monorepo/shared/node_modules/foo"
        export * from "@monorepo/shared/node_modules/foo"
        export { bar } from "@monorepo/shared/node_modules/foo"
        const foo = await import("@monorepo/shared/node_modules/foo")
        import("@monorepo/shared/node_modules/foo")
        const foo = require("@monorepo/shared/node_modules/foo")
        const foo = require.context("@monorepo/shared/node_modules/foo")
        const foo = import.meta.glob("@monorepo/shared/node_modules/foo")
        const foo = import.meta.globEager("@monorepo/shared/node_modules/foo")
        `

        testCases(
            code.split('\n').filter(i => i.trim()),
            expectedCodes.split('\n').filter(i => i.trim()),
            {
                rewriteMapper: { "modules": "node_modules" }
            }
        )
    })

    it('works as expected when enable all transforms', () => {
        const expectedCodes = `\
        import foo from "@monorepo/shared/node_modules/foo"
        import * as foo from "@monorepo/shared/node_modules/foo"
        import { bar } from "@monorepo/shared/node_modules/foo"
        import "@monorepo/shared/node_modules/foo"
        export { default as foo } from "@monorepo/shared/node_modules/foo"
        export * from "@monorepo/shared/node_modules/foo"
        export { bar } from "@monorepo/shared/node_modules/foo"
        const foo = await import("@monorepo/shared/node_modules/foo")
        import("@monorepo/shared/node_modules/foo")
        const foo = require("@monorepo/shared/node_modules/foo")
        const foo = require.context("@monorepo/shared/node_modules/foo")
        const foo = import.meta.glob("@monorepo/shared/node_modules/foo")
        const foo = import.meta.globEager("@monorepo/shared/node_modules/foo")
        `

        testCases(
            code.split('\n').filter(i => i.trim()),
            expectedCodes.split('\n').filter(i => i.trim()),
            {
                rewriteMapper: { "modules": "node_modules" },
                transform: {
                    importDeclaration: true,
                    exportDeclaration: true,
                    dynamicImport: true,
                    require: true,
                    requireContext: true,
                    importGlob: true,
                    importGlobEager: true,
                },
            }
        )
    })

    it('works as expected when disable importDeclaration', () => {
        const expectedCodes = `\
        import foo from "@monorepo/shared/modules/foo"
        import * as foo from "@monorepo/shared/modules/foo"
        import { bar } from "@monorepo/shared/modules/foo"
        import "@monorepo/shared/modules/foo"
        export { default as foo } from "@monorepo/shared/node_modules/foo"
        export * from "@monorepo/shared/node_modules/foo"
        export { bar } from "@monorepo/shared/node_modules/foo"
        const foo = await import("@monorepo/shared/node_modules/foo")
        import("@monorepo/shared/node_modules/foo")
        const foo = require("@monorepo/shared/node_modules/foo")
        const foo = require.context("@monorepo/shared/node_modules/foo")
        const foo = import.meta.glob("@monorepo/shared/node_modules/foo")
        const foo = import.meta.globEager("@monorepo/shared/node_modules/foo")
        `

        testCases(
            code.split('\n').filter(i => i.trim()),
            expectedCodes.split('\n').filter(i => i.trim()),
            {
                rewriteMapper: { "modules": "node_modules" },
                transform: {
                    importDeclaration: false,
                    exportDeclaration: true,
                    dynamicImport: true,
                    require: true,
                    requireContext: true,
                    importGlob: true,
                    importGlobEager: true,
                },
            }
        )
    })

    it('works as expected when disable exportDeclaration', () => {
        const expectedCodes = `\
        import foo from "@monorepo/shared/node_modules/foo"
        import * as foo from "@monorepo/shared/node_modules/foo"
        import { bar } from "@monorepo/shared/node_modules/foo"
        import "@monorepo/shared/node_modules/foo"
        export { default as foo } from "@monorepo/shared/modules/foo"
        export * from "@monorepo/shared/modules/foo"
        export { bar } from "@monorepo/shared/modules/foo"
        const foo = await import("@monorepo/shared/node_modules/foo")
        import("@monorepo/shared/node_modules/foo")
        const foo = require("@monorepo/shared/node_modules/foo")
        const foo = require.context("@monorepo/shared/node_modules/foo")
        const foo = import.meta.glob("@monorepo/shared/node_modules/foo")
        const foo = import.meta.globEager("@monorepo/shared/node_modules/foo")
        `

        testCases(
            code.split('\n').filter(i => i.trim()),
            expectedCodes.split('\n').filter(i => i.trim()),
            {
                rewriteMapper: { "modules": "node_modules" },
                transform: {
                    importDeclaration: true,
                    exportDeclaration: false,
                    dynamicImport: true,
                    require: true,
                    requireContext: true,
                    importGlob: true,
                    importGlobEager: true,
                },
            }
        )
    })

    it('works as expected when disable dynamicImport', () => {
        const expectedCodes = `\
        import foo from "@monorepo/shared/node_modules/foo"
        import * as foo from "@monorepo/shared/node_modules/foo"
        import { bar } from "@monorepo/shared/node_modules/foo"
        import "@monorepo/shared/node_modules/foo"
        export { default as foo } from "@monorepo/shared/node_modules/foo"
        export * from "@monorepo/shared/node_modules/foo"
        export { bar } from "@monorepo/shared/node_modules/foo"
        const foo = await import("@monorepo/shared/modules/foo")
        import("@monorepo/shared/modules/foo")
        const foo = require("@monorepo/shared/node_modules/foo")
        const foo = require.context("@monorepo/shared/node_modules/foo")
        const foo = import.meta.glob("@monorepo/shared/node_modules/foo")
        const foo = import.meta.globEager("@monorepo/shared/node_modules/foo")
        `

        testCases(
            code.split('\n').filter(i => i.trim()),
            expectedCodes.split('\n').filter(i => i.trim()),
            {
                rewriteMapper: { "modules": "node_modules" },
                transform: {
                    importDeclaration: true,
                    exportDeclaration: true,
                    dynamicImport: false,
                    require: true,
                    requireContext: true,
                    importGlob: true,
                    importGlobEager: true,
                },
            }
        )
    })

    it('works as expected when disable require', () => {
        const expectedCodes = `\
        import foo from "@monorepo/shared/node_modules/foo"
        import * as foo from "@monorepo/shared/node_modules/foo"
        import { bar } from "@monorepo/shared/node_modules/foo"
        import "@monorepo/shared/node_modules/foo"
        export { default as foo } from "@monorepo/shared/node_modules/foo"
        export * from "@monorepo/shared/node_modules/foo"
        export { bar } from "@monorepo/shared/node_modules/foo"
        const foo = await import("@monorepo/shared/node_modules/foo")
        import("@monorepo/shared/node_modules/foo")
        const foo = require("@monorepo/shared/modules/foo")
        const foo = require.context("@monorepo/shared/node_modules/foo")
        const foo = import.meta.glob("@monorepo/shared/node_modules/foo")
        const foo = import.meta.globEager("@monorepo/shared/node_modules/foo")
        `

        testCases(
            code.split('\n').filter(i => i.trim()),
            expectedCodes.split('\n').filter(i => i.trim()),
            {
                rewriteMapper: { "modules": "node_modules" },
                transform: {
                    importDeclaration: true,
                    exportDeclaration: true,
                    dynamicImport: true,
                    require: false,
                    requireContext: true,
                    importGlob: true,
                    importGlobEager: true,
                },
            }
        )
    })

    it('works as expected when disable requireContext', () => {
        const expectedCodes = `\
        import foo from "@monorepo/shared/node_modules/foo"
        import * as foo from "@monorepo/shared/node_modules/foo"
        import { bar } from "@monorepo/shared/node_modules/foo"
        import "@monorepo/shared/node_modules/foo"
        export { default as foo } from "@monorepo/shared/node_modules/foo"
        export * from "@monorepo/shared/node_modules/foo"
        export { bar } from "@monorepo/shared/node_modules/foo"
        const foo = await import("@monorepo/shared/node_modules/foo")
        import("@monorepo/shared/node_modules/foo")
        const foo = require("@monorepo/shared/node_modules/foo")
        const foo = require.context("@monorepo/shared/modules/foo")
        const foo = import.meta.glob("@monorepo/shared/node_modules/foo")
        const foo = import.meta.globEager("@monorepo/shared/node_modules/foo")
        `

        testCases(
            code.split('\n').filter(i => i.trim()),
            expectedCodes.split('\n').filter(i => i.trim()),
            {
                rewriteMapper: { "modules": "node_modules" },
                transform: {
                    importDeclaration: true,
                    exportDeclaration: true,
                    dynamicImport: true,
                    require: true,
                    requireContext: false,
                    importGlob: true,
                    importGlobEager: true,
                },
            }
        )
    })

    it('works as expected when disable importGlob', () => {
        const expectedCodes = `\
        import foo from "@monorepo/shared/node_modules/foo"
        import * as foo from "@monorepo/shared/node_modules/foo"
        import { bar } from "@monorepo/shared/node_modules/foo"
        import "@monorepo/shared/node_modules/foo"
        export { default as foo } from "@monorepo/shared/node_modules/foo"
        export * from "@monorepo/shared/node_modules/foo"
        export { bar } from "@monorepo/shared/node_modules/foo"
        const foo = await import("@monorepo/shared/node_modules/foo")
        import("@monorepo/shared/node_modules/foo")
        const foo = require("@monorepo/shared/node_modules/foo")
        const foo = require.context("@monorepo/shared/node_modules/foo")
        const foo = import.meta.glob("@monorepo/shared/modules/foo")
        const foo = import.meta.globEager("@monorepo/shared/node_modules/foo")
        `

        testCases(
            code.split('\n').filter(i => i.trim()),
            expectedCodes.split('\n').filter(i => i.trim()),
            {
                rewriteMapper: { "modules": "node_modules" },
                transform: {
                    importDeclaration: true,
                    exportDeclaration: true,
                    dynamicImport: true,
                    require: true,
                    requireContext: true,
                    importGlob: false,
                    importGlobEager: true,
                },
            }
        )
    })

    it('works as expected when disable importGlobEager', () => {
        const expectedCodes = `\
        import foo from "@monorepo/shared/node_modules/foo"
        import * as foo from "@monorepo/shared/node_modules/foo"
        import { bar } from "@monorepo/shared/node_modules/foo"
        import "@monorepo/shared/node_modules/foo"
        export { default as foo } from "@monorepo/shared/node_modules/foo"
        export * from "@monorepo/shared/node_modules/foo"
        export { bar } from "@monorepo/shared/node_modules/foo"
        const foo = await import("@monorepo/shared/node_modules/foo")
        import("@monorepo/shared/node_modules/foo")
        const foo = require("@monorepo/shared/node_modules/foo")
        const foo = require.context("@monorepo/shared/node_modules/foo")
        const foo = import.meta.glob("@monorepo/shared/node_modules/foo")
        const foo = import.meta.globEager("@monorepo/shared/modules/foo")
        `

        testCases(
            code.split('\n').filter(i => i.trim()),
            expectedCodes.split('\n').filter(i => i.trim()),
            {
                rewriteMapper: { "modules": "node_modules" },
                transform: {
                    importDeclaration: true,
                    exportDeclaration: true,
                    dynamicImport: true,
                    require: true,
                    requireContext: true,
                    importGlob: true,
                    importGlobEager: false,
                },
            }
        )
    })

})
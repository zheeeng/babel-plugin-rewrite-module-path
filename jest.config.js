const { pathsToModuleNameMapper } = require('ts-jest/utils')
const tsconfig = require('./tsconfig.json')
const path = require('path')

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(
    tsconfig.compilerOptions.paths,
    { prefix: path.join('<rootDir>', tsconfig.compilerOptions.baseUrl) }
  ),
};
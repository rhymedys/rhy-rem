import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';

import { uglify } from 'rollup-plugin-uglify'
import pkg from './package.json';

function formatFile(fileName) {
	return fileName.replace(/\${name}/, `${pkg.name}-${pkg.version}`)
}

export default [
	// browser-friendly UMD build
	// {
	// 	input: 'src/main.js',
	// 	output: {
	// 		name: 'howLongUntilLunch',
	// 		file: pkg.browser,
	// 		format: 'umd'
	// 	},
	// 	plugins: [
	// 		, // so Rollup can find `ms`
	// 		commonjs() // so Rollup can convert `ms` to an ES module
	// 	]
	// },

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
		input: 'src/main.js',
		output: [
			// {
			// 	file: formatFile(pkg.main), format: 'cjs',
			// },
			// {
			// 	file: formatFile(pkg.module), format: 'es'
			// },
			// {
			// 	file: formatFile(pkg.browser), name: pkg.var, format: 'umd', plugins: [
			// 		resolve(),
			// 		commonjs(),
			// 	]
			// },
			{
				file: formatFile(pkg.iife), name: pkg.var, format: 'iife', plugins: [
					uglify()],
			}
		],
		plugins: [
			babel()
		]

	}
];

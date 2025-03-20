const [
	defaultConfigNonModule,
	defaultConfigModule,
] = require("@wordpress/scripts/config/webpack.config");
const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");
const path = require("path");

module.exports = [
	defaultConfigNonModule,
	{
		...defaultConfigModule,

		// These lines are necessary to enable module compilation at time-of-writing:
		output: {
			module: true,
			filename: "[name].js",
			path: path.resolve(process.cwd(), "build"),
		},
		experiments: { outputModule: true },

		plugins: [
			...defaultConfigModule.plugins.filter(
				(plugin) =>
					plugin.constructor.name !== "DependencyExtractionWebpackPlugin",
			),
			new DependencyExtractionWebpackPlugin({
				// With modules, use `requestToExternalModule`:
				requestToExternalModule(request) {
					if (request === "module-1") {
						return request;
					}
					if (request === "module-2") {
						return request;
					}
					if (request === "module-3") {
						return request;
					}
				},
			}),
		],
	},
];

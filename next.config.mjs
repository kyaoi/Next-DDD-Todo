import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.resolve.alias = {
			...config.resolve.alias,
			"~": path.resolve(__dirname, "src"),
			"~/todo": path.resolve(__dirname, "src/api/Domain/todo"),
		};
		return config;
	},
};

export default nextConfig;

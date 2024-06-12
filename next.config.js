

/** @type {import('next').NextConfig} */

const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:localhost:3001*',
				destination: `http://localhost:4000`,
			},
		]
	},
}

module.exports = nextConfig

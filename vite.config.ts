import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
	plugins: [react()],
	build: {
		outDir: '../dist/main'
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	define: {
		'process.env': {
			...process.env,
			...loadEnv('development', process.cwd())
		}
	},
	css: {
		postcss: {
			plugins: [autoprefixer, tailwindcss]
		}
	},
	server: {
		port: 8000,
		origin: 'http://127.0.0.1:8000'
		// proxy: {
		// 	'/api': {
		// 		target: 'http://101.35.251.18:3000/api',
		// 		changeOrigin: true,
		// 		rewrite: (path) => path.replace(/^\/api/, '')
		// 	}
		// }
	}
});

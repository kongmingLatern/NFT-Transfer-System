// import { base } from '@/packages/lingo3D-vue/src/config';
// import { registerMicroApps, addGlobalUncaughtErrorHandler } from 'qiankun';

// const baseUrl = base.replace('http://', '');
// console.log('baseUrl', baseUrl);
// registerMicroApps([
// 	{
// 		name: 'nft_gallery',
// 		entry: `//${baseUrl || 'localhost:'}8999`,
// 		container: '#root',
// 		activeRule: '/nft_gallery'
// 	}
// ]);

// addGlobalUncaughtErrorHandler((err: Event & { message: string }) => {
// 	console.error(err);
// 	const { message } = err;
// 	// 加载失败时提示
// 	if (message && message.includes('died in status LOADING_SOURCE_CODE')) {
// 		console.error('微应用加载失败，请检查应用是否可运行');
// 	}
// });

// export { start } from 'qiankun';

import { registerMicroApps, addGlobalUncaughtErrorHandler } from 'qiankun';

// const baseUrl = base.replace('http://', '');
// console.log('baseUrl', baseUrl);
console.log('1');
registerMicroApps([
	{
		name: 'nft_gallery',
		entry: `http://101.35.251.18:8999`,
		container: '#root',
		activeRule: '/nft_gallery'
	}
]);

addGlobalUncaughtErrorHandler((err: Event & { message: string }) => {
	console.error(err);
	const { message } = err;
	// 加载失败时提示
	if (message && message.includes('died in status LOADING_SOURCE_CODE')) {
		console.error('微应用加载失败，请检查应用是否可运行');
	}
});

export { start } from 'qiankun';

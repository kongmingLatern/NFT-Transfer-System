import { useEffect, useState } from 'react';

function getImageSize(image) {
	const img = new Image();
	img.src = image;
	const width = img.width;
	const height = img.height;
	return {
		width,
		height
	};
}
export default function ImgList({ image }) {
	const { width, height } = getImageSize(image);
	// 获取 Image 的尺寸大小
	const [style, setStyle] = useState({});
	console.log('width', width);
	console.log('height', height);
	const commonStyle = {
		width: `${width}px`,
		height: `${height}px`
	};
	useEffect(() => {
		setStyle({
			backgroundImage: `url(${image})`,
			height: `${height / 3}px`
		});
	}, []);
	return (
		<div className={`mx-auto grid grid-cols-3 gap-3`} style={commonStyle}>
			<div
				className="bg-no-repeat bg-left-top brightness-50"
				style={style}
			></div>
			<div className="bg-no-repeat bg-top" style={style}></div>
			<div className="bg-no-repeat bg-right-top" style={style}></div>
			<div className="bg-no-repeat bg-left" style={style}></div>
			<div className="bg-no-repeat bg-center" style={style}></div>
			<div className="bg-no-repeat bg-right" style={style}></div>
			<div className="bg-no-repeat bg-left-bottom" style={style}></div>
			<div className="bg-no-repeat bg-bottom" style={style}></div>
			<div className="bg-no-repeat bg-right-bottom" style={style}></div>
		</div>
	);
}

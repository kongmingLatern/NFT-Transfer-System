export default function ImgList({ image }) {
	function getImageSize() {
		const img = new Image();
		img.src = image;
		const width = img.width;
		const height = img.height;
		return {
			width,
			height
		};
	}
	// 获取 Image 的尺寸大小
	const { width, height } = getImageSize();
	const style = {
		backgroundImage: `url(${image})`,
		height: `${height / 3}px`
	};
	return (
		<div
			className={`mx-auto grid grid-cols-3 gap-3`}
			style={{
				width: `${width}px`,
				height: `${height}px`
			}}
		>
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

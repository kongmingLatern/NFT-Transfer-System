import Header from '@/component/common/Header';
import Title from '@/component/common/Title';
import ImgList from '@/views/collection/ImgList';
import image from '@/assets/1.jpg';

export default function Collection() {
	return (
		<>
			<Header />
			{/* 收集信息 */}
			<Title title="卡片信息" className="text-center" />
			<ImgList image={image} />
		</>
	);
}

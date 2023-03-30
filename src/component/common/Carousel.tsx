import Carousel, { CarouselProps } from 'nuka-carousel';

import { useEffect, useState } from 'react';
import { selectAllData } from '@/api/common';
export default function SimpleSlider() {
	const props: CarouselProps = {
		autoplay: true,
		zoomScale: 0.5,
		cellAlign: 'center',
		cellSpacing: 20
	};
	const [dataSource, setDataSource] = useState([]);

	useEffect(() => {
		async function getData() {
			const res = await selectAllData('swiper');
			setDataSource(res);
		}
		getData();
	}, []);

	return (
		<Carousel {...props}>
			{dataSource.map((item) => (
				<img className="mx-auto h-[300px]" src={item.swiper_src} key={item} />
			))}
		</Carousel>
	);
}

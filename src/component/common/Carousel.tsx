import { Carousel } from 'react-responsive-carousel';

import { useEffect, useState } from 'react';
import { selectAllData } from '@/api/common';
export default function SimpleSlider() {
	const [dataSource, setDataSource] = useState([]);

	useEffect(() => {
		async function getData() {
			const res = await selectAllData('swiper');
			setDataSource(res);
		}
		getData();
	}, []);

	return (
		<Carousel autoPlay infiniteLoop showThumbs={false}>
			{dataSource.map((item) => (
				<div key={item.swiper_id}>
					<img
						className="mx-auto h-[50vh] object-cover"
						src={item.swiper_src}
						key={item}
					/>
					<p className="legend">{item.swiper_desc}</p>
				</div>
			))}
		</Carousel>
	);
}

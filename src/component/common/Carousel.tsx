import { Carousel } from 'react-responsive-carousel';

import { useEffect, useState } from 'react';
import { selectAllData } from '@/api/common';
import { Box, Skeleton } from '@chakra-ui/react';
export default function SimpleSlider() {
	const [dataSource, setDataSource] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getData() {
			const res = await selectAllData('swiper');
			setDataSource(res);
			setLoading(false);
		}
		getData();
	}, []);

	return (
		<Skeleton isLoaded={!loading} fadeDuration={1}>
			<Carousel autoPlay infiniteLoop showThumbs={false}>
				{dataSource.map((item) => (
					<div key={item.img_id}>
						<img
							className="mx-auto h-[50vh] object-cover"
							src={item.img_src}
							key={item}
						/>
						<p className="legend">{item.img_desc}</p>
					</div>
				))}
			</Carousel>
		</Skeleton>
	);
}

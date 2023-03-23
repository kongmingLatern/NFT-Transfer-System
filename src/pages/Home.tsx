import Divider from '@/component/common/Divider';
import Header from '@/component/common/Header';
import Trending from '@/views/home/Trending';
import Carousel from '@/component/common/Carousel';
import Title from '@/component/common/Title';
import Tabs from '@/component/common/Tabs';
import CardList from '@/views/home/CardList';
import Echarts from '@/echarts/Echarts';
import { useState } from 'react';
import message from '@/component/common/Message';

export default function Home() {
	const [data, setData] = useState([820, 932, 901, 934, 1290, 1330, 1320]);
	const [loading, setLoading] = useState(true);

	const tabList = ['All', 'Art', 'Music', 'Video'];
	const tabPanelList = ['All', 'Art', 'Music', 'Video'];

	return (
		<>
			<Header />

			<div className="mt-[60px]">
				<Divider />
				<Tabs
					className={'px-4'}
					tabList={tabList}
					tabPanelList={tabPanelList}
				/>
				<Carousel />
				<Divider />

				<Title title={'Trending'} />
				<Trending />
				<Divider />

				<Title title={'Trending In Art'} />
				<CardList />

				<button className="btn" onClick={() => setData([1, 2, 3])}>
					setNum
				</button>

				<button className="btn" onClick={() => message.success('123')}>
					HH
				</button>

				<Echarts type="line" data={data} />
			</div>
		</>
	);
}

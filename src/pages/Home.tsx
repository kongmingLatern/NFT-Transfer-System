import Divider from '@/component/common/Divider';
import Header from '@/component/common/Header';
import Trending from '@/views/home/Trending';
import Carousel from '@/component/common/Carousel';
import Title from '@/component/common/Title';
import Tabs from '@/component/common/Tabs';
import CardList from '@/views/home/CardList';
import Echarts from '@/echarts/Echarts';
import { useState } from 'react';
import message from '@/component/common/message/Message';
import Beginner from '@/component/common/beginner/Beginner';
import { Step } from '@/component/common/beginner/Step';
import { TestBeginer } from '@/component/common/beginner/TestBeginner';
import Footer from '@/component/common/footer/Footer';

export default function Home() {
	const [data, setData] = useState([820, 932, 901, 934, 1290, 1330, 1320]);
	const [loading, setLoading] = useState(true);

	const tabList = ['All', 'Art', 'Music', 'Video'];
	const tabPanelList = [
		<>
			<Title title={'Trending'} />
			{/* <Trending /> */}
			<Divider />

			<Title title={'Trending In Art'} />
			{/* <CardList type="All" /> */}

			<Divider />
			<Title title={'Trending In Art'} />
			{/* <CardList type="All" /> */}

			<Divider />
			<Title title={'Trending In Music'} />
			{/* <CardList type="All" /> */}

			<Divider />
			<Title title={'Trending In Video'} />
			{/* <CardList type="All" /> */}
		</>,
		'Art',
		'Music',
		'Video'
	];

	function removeCover(
		step: number,
		targetCover: Element & { style: Record<string, any> },
		setStep,
		skip?
	) {
		message.success('下一步');
		setStep(step + 1);
		targetCover.style.display = 'none';
	}

	return (
		<Beginner type="origin" isSkip>
			<Step order={2}>
				<Header />
			</Step>
			<Step order={1}>
				<div className="h-[500px]">
					<Carousel />
				</div>
			</Step>
			<Divider />
			<Tabs
				className={'px-4'}
				tabList={tabList}
				tabPanelList={tabPanelList}
				tabPaneListJustify="center"
			/>
			<Title title={'Trending'} />

			<Footer />
		</Beginner>
	);
}

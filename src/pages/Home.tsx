import Divider from '@/component/common/Divider';
import Header from '@/component/common/Header';
import Trending from '@/views/home/Trending';
import Carousel from '@/component/common/Carousel';
import Title from '@/component/common/Title';
import Tabs from '@/component/common/Tabs';
import CardList from '@/views/home/CardList';
import Echarts from '@/echarts/Echarts';
import { useEffect, useState } from 'react';
import message from '@/component/common/message/Message';
import Beginner from '@/component/common/beginner/Beginner';
import { Step } from '@/component/common/beginner/Step';
import { TestBeginer } from '@/component/common/beginner/TestBeginner';
import Footer from '@/component/common/footer/Footer';
import { api } from '@/api';

export default function Home() {
	// const tabList = ['All', 'Art', 'Music', 'Video'];
	const [tabList, setTabList] = useState([]);
	const [tabPaneList, setTabPaneList] = useState([]);

	useEffect(() => {
		async function getType() {
			const res: any = await api.get('selectAll/type');
			// console.log(res.data.map((item) => item.type));
			setTabList(res.data.map((item) => item.type));
			setTabPaneList(
				res.data.map((item) => (
					<>
						<Title title={'Trending'} />
						<Trending type={item.type} />
						<Divider />
						<Title title={`Trending in ${item.type}`} />
						<CardList type={item.type} />
					</>
				))
			);
		}
		getType();
	}, []);

	// const tabPanelList = [
	// 	<>
	// 		<Title title={'Trending'} />
	// 		<Trending />
	// 		<Divider />

	// 		<Divider />
	// 		<Title title={'Trending In Art'} />
	// 		<CardList type="Art" />

	// 		<Divider />
	// 		<Title title={'Trending In Music'} />
	// 		<CardList type="Music" />

	// 		<Divider />
	// 		<Title title={'Trending In Video'} />
	// 		<CardList type="Video" />
	// 	</>,

	// 	<>
	// 		<Title title={'Trending'} />
	// 		<Trending type="Art" />
	// 		<Title title={'Trending In Art'} />
	// 		<CardList type="Art" />
	// 	</>,
	// 	<>
	// 		<Title title={'Trending'} />
	// 		<Trending type="Music" />
	// 		<Title title={'Trending In Music'} />
	// 		<CardList type="Music" />
	// 	</>,
	// 	<>
	// 		<Title title={'Trending'} />
	// 		<Trending type="Video" />
	// 		<Title title={'Trending In Video'} />
	// 		<CardList type="Video" />
	// 	</>
	// ];

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
			{/* <Step order={1}> */}
			{/* <div className="h-[500px]"> */}
			<Carousel />
			{/* </div> */}
			{/* </Step> */}
			<Divider />
			<Tabs
				className={'px-4'}
				tabList={tabList}
				tabPanelList={tabPaneList}
				tabPaneListJustify="center"
			/>

			<Footer />
		</Beginner>
	);
}

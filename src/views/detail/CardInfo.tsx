import Echarts from '@/echarts/Echarts';
import { DetailProvider } from '@/pages/Detail';
import { useContext, useEffect, useState } from 'react';
import DetailIcon from '../../component/detail/DetailIcon';
import Operation from '../../component/detail/Operation';
import SalesTime from '../../component/detail/SalesTime';
import UserTable from '../../component/detail/UserTable';
import style from '@/assets/img.module.css';
import { Box, Flex, List, ListItem, Spacer, Text } from '@chakra-ui/react';
import Title from '@/component/common/Title';
import { timestampToTime } from '@/utils';
import Divider from '@/component/common/Divider';

export default function CardInfo({ chart_data, transaction }) {
	const {
		nft_id,
		nft_name,
		username,
		uid,
		price,
		high_bid,
		transfer_type,
		bid_username,
		finish_date
	} = useContext(DetailProvider);

	const [count, setCount] = useState([]);

	useEffect(() => {
		// function getCount() {
		// 	return chart_data && chart_data.map((item) => item.count);
		// }
		let arr = [];
		for (let i = 0; i < 7; i++) {
			arr.push(Math.floor(Math.random() * 100));
		}
		setCount(arr);

		const root = document.querySelector('#root');
		console.log(root);
		// 给 root 元素添加背景图
		// root.style.backgroundImage = "url('@/assets/bg.jpg')";
		root.classList.add(style.detail_bg);

		return () => {
			root.classList.remove(style.detail_bg);
		};
		// setCount(getCount());
		// console.log(chart_data);
	}, []);

	return (
		<div className=" ml-5 w-[45vw] p-5">
			{/* 右侧头部 */}
			<div className="w-full flex h-20 justify-between">
				{/* 物品名称 */}
				<div className="w-[70%]">
					<div className="w-full text-2xl font-bold">{nft_name}</div>
					<div className="w-full">拥有者：{username}</div>
					<div className="h-10 flex justify-around items-center">
						<DetailIcon />
					</div>
				</div>
				{/* 收藏 */}
				{/* <div className=" w-20 h-20 leading-[5rem] bg-red-500 text-center text-white rounded-full ">
					收藏
				</div> */}
			</div>
			{/* 价格 */}
			{/* <div className="text-3xl mt-9 font-bold">当前价格</div> */}
			{/* <Text className="mt-5 font-thin text-2xl">当前价格</Text> */}
			<Title title={'当前价格'} className="mt-9" />
			<div className="flex justify-between my-3 px-3">
				<div className="left">
					<span className="text-3xl font-semibold text-red-500 ">
						{price} CS
					</span>
					<span className="line-through ml-5">{high_bid}cs</span>
				</div>
				<div className="right">
					{/* <span className="text-red-400 font-semibold"> */}
					{transfer_type === 1 ? (
						<div className="text-lg">
							<span>当前最高出价者：</span>
							{bid_username ? (
								<span className="text-red-500 font-semibold italic font-meno">
									{bid_username}
								</span>
							) : (
								<span className="text-blue-500 font-bold">暂无</span>
							)}
						</div>
					) : null}
				</div>
			</div>
			{/* 条形图 */}
			{/* <Echarts type="line" data={count} /> */}
			<Divider />
			{/* 条形图 */}
			{/* <Text className="mt-5 font-thin text-2xl">剩余拍卖时间：</Text> */}
			{/* <Text className="mt-5 font-thin text-2xl">价格一览：</Text> */}
			{/* <Echarts type="line" data={count} /> */}
			<Text className="my-5 font-thin text-2xl">NFT 信息</Text>
			<List>
				<ListItem>
					<Flex className="border">
						<Box p="4">认证标识</Box>
						<Spacer />
						<Box p="4">
							<Text noOfLines={1}>{nft_id} </Text>
						</Box>
					</Flex>
				</ListItem>
				<ListItem>
					<Flex className="border">
						<Box p="4">作者</Box>
						<Spacer />
						<Box p="4">
							<Text noOfLines={1}>{username} </Text>
						</Box>
					</Flex>
				</ListItem>
				<ListItem>
					<Flex className="border">
						<Box p="4">销售结束时间</Box>
						<Spacer />
						<Box p="4">
							<Text noOfLines={1}>
								{timestampToTime(new Date(finish_date).getTime()).result}
							</Text>
						</Box>
					</Flex>
				</ListItem>
			</List>
			{/* 时间 */}
			<Text className="mt-5 font-thin text-2xl">剩余拍卖时间：</Text>
			<div className="mt-5 pl-2">
				{transfer_type !== 1 ? null : <SalesTime />}
			</div>

			{/* 按钮 */}
			<div className="w-full my-6 flex justify-around">
				<Operation />
			</div>

			<Divider />

			{transfer_type === 1 ? (
				<>
					<Text className="mt-5 font-thin text-2xl">竞标参与表</Text>
					<div className="overflow-x-auto mt-7">
						<UserTable transaction={transaction} />
					</div>
				</>
			) : null}
		</div>
	);
}

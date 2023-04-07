import Echarts from '@/echarts/Echarts';
import { DetailProvider } from '@/pages/Detail';
import { useContext, useEffect, useState } from 'react';
import DetailIcon from '../../component/detail/DetailIcon';
import Operation from '../../component/detail/Operation';
import SalesTime from '../../component/detail/SalesTime';
import UserTable from '../../component/detail/UserTable';

export default function CardInfo({ chart_data, transaction }) {
	const {
		nft_name,
		username,
		uid,
		price,
		high_bid,
		transfer_type,
		bid_username
	} = useContext(DetailProvider);

	const [count, setCount] = useState(chart_data);

	useEffect(() => {
		function getCount() {
			return chart_data && chart_data.map((item) => item.count);
		}

		setCount(getCount());
		console.log(chart_data);
	}, [chart_data]);

	return (
		<div className=" ml-5 w-[60%]">
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
				<div className=" w-20 h-20 leading-[5rem] bg-red-500 text-center text-white rounded-full ">
					收藏
				</div>
			</div>
			{/* 价格 */}
			<div className="text-3xl mt-9 font-bold">当前价格</div>
			<div className="flex justify-between mt-3 px-3">
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
			<Echarts type="line" data={count} />
			{/* 时间 */}
			<div className="mt-3 pl-2">
				{transfer_type !== 1 ? null : <SalesTime />}
			</div>

			{/* 按钮 */}
			<div className="w-full mt-6 flex justify-around">
				<Operation />
			</div>
			<div>
				<div>
					{transfer_type === 1 ? (
						<div className="overflow-x-auto mt-7">
							<UserTable transaction={transaction} />
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

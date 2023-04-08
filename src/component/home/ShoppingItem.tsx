import { api } from '@/api';
import { Icon } from '@iconify-icon/react';
import { useState, useEffect, useMemo } from 'react';
import Spin from '../common/spin/Spin';

export default function ShoppingItem({ setNum }) {
	const [changingvalue, setChangevalue] = useState(true);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getData() {
			const res = await api.get('/shoppingcart', {
				params: {
					uid: localStorage.getItem('uid') || ''
				}
			});
			setData(res.data);
			setLoading(false);
		}
		getData();
	}, []);

	useMemo(() => {
		setNum(data.length);
	}, [data]);

	function onMouseEnter() {
		setChangevalue(false);
	}
	function onMouseLeave() {
		setChangevalue(true);
	}

	// NOTE: 删除商品
	async function removeItem(nft_id) {
		const res = await api.delete('/shoppingcart', {
			data: {
				nft_id,
				uid: localStorage.getItem('uid') || ''
			}
		});
		console.log(res);

		return setData(data.filter((item) => item.nft_id !== nft_id));
	}

	return (
		<Spin loading={loading}>
			{!loading && data.length === 0 ? (
				<div className="flex justify-center items-center h-96">
					<div className="text-2xl font-semibold">购物车空空如也</div>
				</div>
			) : (
				data.map((item) => {
					return (
						<div
							className="h-20 rounded-xl flex hover:bg-gray-200 items-center"
							onMouseEnter={onMouseEnter}
							onMouseLeave={onMouseLeave}
							key={item.nft_id}
						>
							<div className="flex-[1] mx-2 ">
								<img className="w-[100%] rounded-xl my-1" src={item.nft_img} />
							</div>
							<div className="flex-[3]">
								<div className="mt-3 font-semibold text-sm">
									{item.nft_name}
								</div>
								<div className="flex text-sm mt-1 ">
									<div className="w-36 text-sm font-thin">介绍</div>
									<div className="w-10  mr-0">
										<div
											className="w-full h-full text-right whitespace-nowrap "
											style={{
												display: changingvalue ? 'block' : 'none'
											}}
										>
											{/* TODO: 根据交易类型来显示当前价格 */}
											{item.basic_bid} CS
										</div>
										<div
											className="w-full h-full"
											style={{
												display: changingvalue ? 'none' : 'block'
											}}
											onClick={() => {
												removeItem(item.nft_id);
											}}
										>
											<Icon
												className="w-7"
												icon="material-symbols:delete-outline"
											/>
										</div>
									</div>
								</div>
								<div className="text-xs text-gray-400 mt-1">
									描述：<span>{item.nft_desc}</span>
								</div>
							</div>
						</div>
					);
				})
			)}
		</Spin>
	);
}

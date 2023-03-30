import { api } from '@/api';
import { Icon } from '@iconify-icon/react';
import { useState, useEffect } from 'react';

export default function ShoppingItem() {
	const [changingvalue, setChangevalue] = useState(true);
	const [data, setData] = useState([]);

	useEffect(() => {
		async function getData() {
			const res = await api.get('/selectAll/shoppcart', {
				params: {
					uid: localStorage.getItem('uid') || ''
				}
			});
			console.log(res.data);
			setData(res.data);
		}
		getData();
	}, []);

	function onMouseEnter() {
		setChangevalue(false);
	}
	function onMouseLeave() {
		setChangevalue(true);
	}

	return (
		<>
			{data.map((item) => {
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
							<div className="mt-3 font-semibold text-sm">{item.nft_name}</div>
							<div className="flex text-sm mt-1 ">
								<div className="w-36 text-sm">介绍</div>
								<div className="w-10  mr-0">
									<div
										className="w-full h-full text-right whitespace-nowrap "
										style={{
											display: changingvalue ? 'block' : 'none'
										}}
									>
										￥{item.price}
									</div>
									<div
										className="w-full h-full"
										style={{
											display: changingvalue ? 'none' : 'block'
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
			})}
		</>
	);
}

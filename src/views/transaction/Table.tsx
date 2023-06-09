import { useEffect, useMemo, useState } from 'react';
import Tableitem from '../../component/common/table/Tableitem';
import Tablehead from '../../component/common/table/Tablehead';
import Tablefooter from '../../component/common/table/Tablefooter';
import { api } from '../../api';
import { Button, Skeleton, SkeletonText, Table } from '@chakra-ui/react';
import message from '@/component/common/message/Message';
import Spin from '@/component/common/spin/Spin';
export default function TableComponent() {
	const [data, setData] = useState([]);
	const [checkItems, setCheckItems] = useState([]);
	const [sellOut, setSellOut] = useState([]);
	let [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(true);
	function addcount(id) {
		console.log(id);
		if (sellOut.includes(id)) return;
		data.map((item) => {
			if (item.nft_id === id && item.num < item.count && item.status !== 3)
				++item.num;
		});
		console.log(data);
		setData([...data]);
	}
	function subcount(id) {
		if (sellOut.includes(id)) return;
		data.map((item) => {
			if (item.nft_id === id && item.num > 1 && item.status !== 3) --item.num;
		});
		setData([...data]);
	}

	function changeChecked(id) {
		const isChecked = checkItems.includes(id);
		const newCheckedItems = isChecked
			? checkItems.filter((i) => i !== id)
			: [...checkItems, id];
		setCheckItems(newCheckedItems);
	}

	// function changeAllChecked() {
	// 	if (checkItems.length === 0) {
	// 		// NOTE: 清空了数组，需要全选
	// 		setCheckItems(data.map((item) => item.nft_id));
	// 	} else {
	// 		// NOTE: 当前全选状态，清空数组
	// 		setCheckItems([]);
	// 	}
	// }

	useEffect(() => {
		async function getData() {
			const check = [];
			const res = await api.get('/shoppingcart', {
				params: {
					uid: localStorage.getItem('uid') || ''
				}
			});
			res.data.forEach((item) => {
				if (item.status !== 3) {
					check.push(item.nft_id);
					item['num'] = 1;
				} else {
					setSellOut([...sellOut, item.nft_id]);
					item['num'] = 0;
					item['count'] = 0;
				}
			});
			setCheckItems(check);
			setData(res.data);
			setLoading(false);
		}
		getData();
	}, []);

	useEffect(() => {
		let sum = 0;
		data.map((item) => {
			if (checkItems.includes(item.nft_id)) {
				if (item.status === 2) {
					sum +=
						item.price + item.lower_bid * (item.num - 1) > item.high_bid
							? item.high_bid
							: item.price + item.lower_bid * (item.num - 1);
				} else {
					sum += item.num * item.price;
				}
			}
		});
		setTotal(sum);
	}, [checkItems, data]);

	function getFilterData() {
		// 去除 checked 字段
		// return data.filter((item) => checkItems.includes(item.nft_id));
		return data;
	}

	async function removeItem(id) {
		const res: any = await api.delete('/shoppingcart', {
			data: {
				nft_id: id,
				uid: localStorage.getItem('uid') || ''
			}
		});
		if (res.code === 200) {
			message.success('删除成功');
			setData(data.filter((item) => item.nft_id !== id));
		}
	}

	const filterData = useMemo(() => getFilterData(), [checkItems]);

	return (
		<>
			<div className="overflow-x-auto  h-[50vh] mx-auto">
				<SkeletonText isLoaded={!loading} noOfLines={15} fadeDuration={1}>
					<Table className="table mx-auto">
						{/* head */}
						<thead>
							<tr className="text-center">
								<Tablehead
								// len={data.length}
								// checkItems={checkItems}
								// changeAllChecked={changeAllChecked}
								/>
							</tr>
						</thead>
						<tbody>
							{/* row 1 */}
							{data.length === 0 ? (
								<tr>
									<td colSpan={6} className="text-center text-lg font-bold ">
										目前购物车没有商品哦
									</td>
								</tr>
							) : (
								data.map((item) => {
									return (
										<tr
											key={item.nft_id}
											className={
												item.status === 3 ? 'contrast-50 relative' : null
											}
										>
											<Tableitem
												addcount={() => {
													addcount(item.nft_id);
												}}
												data={item}
												subcount={() => subcount(item.nft_id)}
												changeChecked={changeChecked}
												checkItems={checkItems}
											/>

											{item.status === 3 ? (
												<td className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
													<Button
														colorScheme="red"
														onClick={() => removeItem(item.nft_id)}
													>
														已售出，点击删除
													</Button>
												</td>
											) : null}
										</tr>
									);
								})
							)}
						</tbody>
					</Table>
				</SkeletonText>
			</div>

			<footer className="w-[60vw] h-[100%] mx-auto">
				<Tablefooter total={total} data={filterData} />
			</footer>
		</>
	);
}

import { useEffect, useMemo, useState } from 'react';
import Tableitem from '../../component/common/table/Tableitem';
import Tablehead from '../../component/common/table/Tablehead';
import Tablefooter from '../../component/common/table/Tablefooter';
import { api } from '../../api';
import { Button, Table } from '@chakra-ui/react';
export default function TableComponent() {
	const [data, setData] = useState([]);
	const [checkItems, setCheckItems] = useState([]);
	const [sellOut, setSellOut] = useState([]);
	let [total, setTotal] = useState(0);
	function addcount(id) {
		if (sellOut.includes(id)) return;
		data.map((item) => {
			if (item.shopping_id === id && item.num < item.count && item.status !== 3)
				++item.num;
		});
		console.log(data);
		setData([...data]);
	}
	function subcount(id) {
		if (sellOut.includes(id)) return;
		data.map((item) => {
			if (item.shopping_id === id && item.num > 1 && item.status !== 3)
				--item.num;
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
	// 		setCheckItems(data.map((item) => item.shopping_id));
	// 	} else {
	// 		// NOTE: 当前全选状态，清空数组
	// 		setCheckItems([]);
	// 	}
	// }

	useEffect(() => {
		async function getData() {
			const check = [];
			const res = await api.get('/selectAll/shoppcart', {
				params: {
					uid: localStorage.getItem('uid') || ''
				}
			});
			res.data.forEach((item) => {
				if (item.status !== 3) {
					check.push(item.shopping_id);
					item['num'] = 1;
				} else {
					setSellOut([...sellOut, item.shopping_id]);
					item['num'] = 0;
					item['count'] = 0;
				}
			});
			setCheckItems(check);
			console.log(res.data);
			setData(res.data);
		}
		getData();
	}, []);

	useEffect(() => {
		let sum = 0;
		data.map((item) => {
			if (checkItems.includes(item.shopping_id)) {
				if (item.status === 2) {
					sum += item.lower_bid * item.num;
				} else {
					sum += item.num * item.price;
				}
			}
		});
		setTotal(sum);
	}, [checkItems, data]);

	function getFilterData() {
		// 去除 checked 字段
		return data.filter((item) => checkItems.includes(item.shopping_id));
	}

	function removeItem(id) {
		console.log('id', id);
	}

	const filterData = useMemo(() => getFilterData(), [checkItems]);

	return (
		<div>
			<div className="overflow-x-auto w-[60vw] h-[50vh] mx-auto">
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
						{data.map((item) => {
							return (
								<tr
									key={item.shopping_id}
									className={item.status === 3 ? 'contrast-50 relative' : null}
								>
									<Tableitem
										addcount={addcount}
										data={item}
										subcount={subcount}
										changeChecked={changeChecked}
										checkItems={checkItems}
									/>

									{item.status === 3 ? (
										<td className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
											<Button
												colorScheme="red"
												onClick={() => removeItem(item.shopping_id)}
											>
												已售出，点击删除
											</Button>
										</td>
									) : null}
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>

			<footer className="w-[60vw] h-[100%] mx-auto">
				<Tablefooter total={total} data={filterData} />
			</footer>
		</div>
	);
}

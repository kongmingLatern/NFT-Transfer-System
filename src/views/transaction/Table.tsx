import React, { useEffect, useMemo, useState } from 'react';
import Tableitem from '../../component/common/table/Tableitem';
import Tablehead from '../../component/common/table/Tablehead';
import Tablefooter from '../../component/common/table/Tablefooter';
import { api } from '../../api';
import { Table, Tfoot } from '@chakra-ui/react';
export default function TableComponent() {
	const [data, setData] = useState([]);
	const [checkItems, setCheckItems] = useState([]);
	function addcount(id) {
		data.map((item) => {
			if (item.shopping_id === id && item.num < item.count) ++item.num;
		});
		console.log(data);
		setData([...data]);
	}
	function subcount(id) {
		data.map((item) => {
			if (item.shopping_id === id && item.num > 1) --item.num;
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
				check.push(item.shopping_id);
				item['num'] = 1;
			});
			setCheckItems(check);
			console.log(res.data);
			setData(res.data);
		}
		getData();
	}, []);

	const totalAmount = useMemo(() => {
		let total = 0;
		data.map((item) => {
			if (checkItems.includes(item.shopping_id)) {
				total += item.num * item.price;
			}
		});
		return total;
	}, [checkItems, data]);

	function getFilterData() {
		// 去除 checked 字段
		return data.filter((item) => checkItems.includes(item.shopping_id));
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
								<tr key={item.shopping_id}>
									<Tableitem
										addcount={addcount}
										data={item}
										subcount={subcount}
										changeChecked={changeChecked}
										checkItems={checkItems}
									/>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>

			<footer className="w-[60vw] h-[100%] mx-auto">
				<Tablefooter total={totalAmount} data={filterData} />
			</footer>
		</div>
	);
}

import React, { useEffect, useMemo, useState } from 'react';
import Tableitem from '../../component/common/table/Tableitem';
import Tablehead from '../../component/common/table/Tablehead';
import Tablefooter from '../../component/common/table/Tablefooter';
import { Table, Tfoot } from '@chakra-ui/react';
export default function TableComponent() {
	const [total, setTotal] = useState(0);
	const [data, setdata] = useState([
		{
			id: '1',
			count: 1,
			price: 1,
			checked: true
		},
		{
			id: '2',
			count: 1,
			price: 2,
			checked: true
		},
		{
			id: '3',
			count: 1,
			price: 1,
			checked: true
		},
		{
			id: '4',
			count: 1,
			price: 2,
			checked: false
		},
		{
			id: '5',
			count: 1,
			price: 1,
			checked: false
		},
		{
			id: '6',
			count: 1,
			price: 2,
			checked: false
		}
	]);
	function addcount(id) {
		data.map((item) => {
			if (item.id === id) ++item.count;
		});
		setdata([...data]);
	}
	function subcount(id) {
		data.map((item) => {
			if (item.id === id && item.count > 1) --item.count;
		});
		setdata([...data]);
	}

	function changeChecked(id) {
		data.map((item) => {
			if (item.id === id) item.checked = !item.checked;
		});
		setdata([...data]);
	}

	useEffect(() => {
		let total = 0;
		data.map((item) => {
			if (item.checked) {
				total += item.count * item.price;
			}
		});
		setTotal(total);
	}, [data]);

	function getFilterData() {
		// 去除 checked 字段
		return data.filter((item) => item.checked);
	}

	const filterData = useMemo(() => getFilterData(), [data]);

	return (
		<div>
			<div className="overflow-x-auto w-[60vw] h-[50vh] mx-auto">
				<Table className="table mx-auto">
					{/* head */}
					<thead>
						<tr className="text-center">
							<Tablehead />
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}
						{data.map((item) => {
							return (
								<tr key={item.id}>
									<Tableitem
										addcount={addcount}
										data={item}
										subcount={subcount}
										changeChecked={changeChecked}
									/>
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

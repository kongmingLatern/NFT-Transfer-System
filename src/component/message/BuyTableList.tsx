import { api } from '@/api';
import { useEffect, useState } from 'react';
import Space from '../common/space/Space';
import AdminTable from '../common/table/Table';

export default function BuyTableList() {
	const columns = [
		{
			title: '序号',
			id: 'buy_id',
			key: 'buy_id'
		},
		{
			title: '求购者姓名',
			id: 'buy_username',
			key: 'buy_username'
		},
		{
			title: '求购信息',
			id: 'buy_desc',
			key: 'buy_desc'
		},
		{
			title: '求购金额',
			id: 'buy_price',
			key: 'buy_price'
		},
		{
			title: '操作',
			id: 'operation',
			key: 'operation',
			render: (text, record) => (
				<Space>
					<button
						className="btn btn-secondary w-[100px] font-thin text-white"
						onClick={() => console.log(record.buy_id)}
					>
						响应
					</button>
					<button className="btn btn-error w-[100px] font-thin text-white">
						忽略
					</button>
				</Space>
			)
		}
	];
	const [data, setData] = useState([]);
	useEffect(() => {
		async function getData() {
			const res = await api.get('/selectAll/buy_message');
			console.log(res.data);
			setData(res.data);
		}
		getData();
	}, []);

	return <AdminTable columns={columns} dataSource={data} />;
}

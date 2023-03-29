import { api } from '@/api';
import Space from '@/component/common/space/Space';
import Table from '@/component/common/table/Table';
import SearchInput from '@/component/home/SearchInput';
import { useState, useEffect } from 'react';

export default function OrderManage() {
	const columns = [
		{
			title: '订单编号',
			id: 'order_id',
			key: 'order_id'
		},
		{
			title: '订单日期',
			id: 'transaction_date',
			key: 'transaction_date',
			type: 'string'
		},
		{
			title: '购买商品',
			id: 'nft_name',
			key: 'nft_name',
			type: 'string'
		},
		{
			title: '买家',
			id: 'buyer_username',
			key: 'buyer_username',
			type: 'string',
			render: (text, record) => <div>{text}</div>
		},
		{
			title: '卖家',
			id: 'seller_username',
			key: 'seller_username',
			type: 'string',
			render: (text, record) => <div>{text}</div>
		},
		{
			title: '交易金额（￥）',
			id: 'transaction_price',
			key: 'transaction_price',
			type: 'number',
			render: (text, record) => (
				<div>
					￥<span className="font-bold">{text}</span>
				</div>
			)
		},
		{
			title: '操作',
			id: 'operation',
			key: 'operation',
			render: (text, record) => (
				<Space>
					<button
						className="btn btn-secondary w-[100px] font-thin text-white"
						onClick={() => console.log(record.order_id)}
					>
						查看
					</button>
					<button className="btn btn-error w-[100px] font-thin text-white">
						删除
					</button>
				</Space>
			)
		}
	];

	const [dataSource, setDataSource] = useState([]);

	useEffect(() => {
		async function getData() {
			const res = await api.get('/selectAll/order');
			setDataSource(res.data);
		}
		getData();
	});

	function search(value) {
		console.log('search', value);
	}
	return (
		<>
			<div className="flex justify-end mb-2 pr-4 mt-2">
				<SearchInput className={'w-[300px]'} search={search} />
			</div>
			<Table dataSource={dataSource} columns={columns} />
		</>
	);
}

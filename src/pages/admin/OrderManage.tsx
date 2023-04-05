import { api } from '@/api';
import Modal from '@/component/common/modal/Modal';
import { SearchModalForm } from '@/component/common/modal/SearchModalForm';
import Space from '@/component/common/space/Space';
import Table from '@/component/common/table/Table';
import { useState, useEffect, useRef } from 'react';
import { deleteHandle } from '@/utils/comon/delete';
import { log } from 'console';
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
			id: 'username',
			key: 'username',
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
					<button 
					onClick={()=>{
                       deleteHandle('/delete/order',{order_id:record.order_id})
					}}
					className="btn btn-error w-[100px] font-thin text-white">
						删除
					</button>
				</Space>
			)
		}
	];

	const [dataSource, setDataSource] = useState([]);
	// const result = useRef(null);
	const [result, setResult] = useState([]);

	useEffect(() => {
		async function getData() {
			const res = await api.get('/selectAll/order');
			setDataSource(res.data);
		}
		getData();
	}, []);

	async function search(value, onOpen) {
		const res = await api.get('/search/order', {
			params: {
				order_id: value
			}
		});
		onOpen();
		setResult(res.data);
	}
	return (
		<>
			<SearchModalForm
				search={search}
				result={result}
				tableTitle={[
					{
						title: '订单编号'
					},
					{
						title: '订单时间'
					},
					{
						title: '商品名称'
					},
					{
						title: '卖家用户名'
					},
					{
						title: '买家用户名'
					},
					{
						title: '交易金额',
						type: 'number'
					}
				]}
			/>
			<Table dataSource={dataSource} columns={columns} />
		</>
	);
}

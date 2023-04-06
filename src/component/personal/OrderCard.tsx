import { Button } from '@chakra-ui/react';
import Modal from '../common/modal/Modal';
import { useEffect, useState } from 'react';
import { api } from '@/api';
import Table from '../common/table/Table';
import Card from '../home/Card';

export default function OrderCard() {
	const columns = [
		{
			title: '订单号',
			id: 'order_id',
			key: 'order_id'
		},
		{
			title: '订单日期',
			id: 'transaction_date',
			key: 'transaction_date',
			type: 'string',
			render: (text, record) => <div>{text}</div>
		},
		{
			title: '卖家',
			id: 'seller_username',
			key: 'seller_username',
			type: 'string'
		},
		{
			title: '交易商品',
			id: 'nft_img',
			key: 'nft_img',
			type: 'string',
			render: (text, record) => <img src={text} width={'200'} height={'150'} />
		},
		{
			title: '交易金额（￥）',
			id: 'transaction_price',
			key: 'transaction_price',
			type: 'number',
			render: (text, record) => <div>{text}</div>
		},
		{
			title: '操作',
			id: 'operation',
			key: 'operation',
			render: (text, record) => (
				<Modal
					open={(onOpen) => (
						<button
							className="btn btn-error w-[100px] font-thin text-white"
							onClick={() => onOpen()}
						>
							查看详情
						</button>
					)}
					title="详情"
					bodyContent={(onClose) => {
						function handleOk(id) {
							onClose();
						}
						return <Card item={record} />;
					}}
					footerContent={(onClose) => {
						return (
							<Button colorScheme="red" onClick={onClose}>
								关闭
							</Button>
						);
					}}
				/>
			)
		}
	];
	const [data, setData] = useState([]);

	useEffect(() => {
		async function getData() {
			const res = await api.get('/selectAll/order', {
				params: {
					uid: localStorage.getItem('uid') || ''
				}
			});
			setData(res.data);
		}
		getData();
	}, []);

	return <Table dataSource={data} columns={columns}></Table>;
}

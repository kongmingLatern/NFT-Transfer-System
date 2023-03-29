import { api } from '@/api';
import Modal from '@/component/common/modal/Modal';
import Space from '@/component/common/space/Space';
import Table from '@/component/common/table/Table';
import SearchInput from '@/component/home/SearchInput';
import {
	TableContainer,
	TableCaption,
	Button,
	Thead,
	Table as TableUI,
	Tr,
	Th,
	Tbody,
	Td
} from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';

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
	const result = useRef(null);

	useEffect(() => {
		async function getData() {
			const res = await api.get('/selectAll/order');
			setDataSource(res.data);
		}
		getData();
	});

	async function search(value, onOpen) {
		const res = await api.get('/search/order', {
			params: {
				order_id: value
			}
		});
		onOpen();
		result.current = res.data;
	}
	return (
		<>
			<Modal
				open={(onOpen) => {
					return (
						<div className="flex justify-end mb-2 pr-4 mt-2">
							<SearchInput
								className={'w-[300px]'}
								placeholder={'请输入要查询的订单编号'}
								search={search}
								onOpen={onOpen}
							/>
						</div>
					);
				}}
				title="查询结果"
				bodyContent={(onClose) => {
					return (
						<TableContainer>
							<TableUI variant="simple">
								<TableCaption>
									<Button onClick={() => onClose()}>关闭</Button>
								</TableCaption>
								<Thead>
									<Tr>
										<Th>订单编号</Th>
										<Th>订单时间</Th>
										<Th>商品名称</Th>
										<Th>卖家用户名</Th>
										<Th>买家用户名</Th>
										<Th isNumeric>交易金额</Th>
									</Tr>
								</Thead>
								<Tbody>
									<Tr>
										<Td>{result.current?.order_id}</Td>
										<Td>{result.current?.transaction_date}</Td>
										<Td>{result.current?.nft_name}</Td>
										<Td>{result.current?.seller_username}</Td>
										<Td>{result.current?.buyer_username}</Td>
										<Td isNumeric>{result.current?.transaction_price}</Td>
									</Tr>
								</Tbody>
							</TableUI>
						</TableContainer>
					);
				}}
			/>
			<Table dataSource={dataSource} columns={columns} />
		</>
	);
}

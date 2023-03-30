import { api } from '@/api';
import { useState, useEffect } from 'react';
import Space from '../common/space/Space';
import AdminTable from '../common/table/Table';

export default function BuyTableListResponse() {
	const columns = [
		{
			title: '序号',
			id: 'response_id',
			key: 'response_id'
		},
		{
			title: '对应的求购信息',
			id: 'buy_desc',
			key: 'buy_desc'
		},
		{
			title: '响应者姓名',
			id: 'response_username',
			key: 'response_username'
		},
		{
			title: 'NFT 图片',
			id: 'response_nft_img',
			key: 'response_nft_img',
			render: (text, record) => <img src={text} />
		},
		{
			title: '响应描述信息',
			id: 'response_desc',
			key: 'response_desc'
		},
		{
			title: '响应金额',
			id: 'response_price',
			key: 'response_price'
		},
		{
			title: '操作',
			id: 'operation',
			key: 'operation',
			render: (text, record) => (
				<Space>
					<button
						className="btn btn-secondary w-[100px] font-thin text-white"
						onClick={() => console.log(record.id)}
					>
						确认
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
			const res = await api.get('/selectAll/response', {
				params: {
					uid: localStorage.getItem('uid') || ''
				}
			});
			console.log(res.data);
			setData(res.data);
		}
		getData();
	}, []);
	return <AdminTable columns={columns} dataSource={data} />;
}

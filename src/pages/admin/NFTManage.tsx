import { api } from '@/api';
import Space from '@/component/common/space/Space';
import Table from '@/component/common/table/Table';
import { useEffect, useState } from 'react';
import { showText } from './ReviewNFTManage';

export default function NFTManage() {
	const columns = [
		{
			title: 'NFT 编号',
			id: 'nft_id',
			key: 'nft_id'
		},
		{
			title: '持有者',
			id: 'username',
			key: 'username',
			type: 'string',
			render: (text, record) => <div>{text}</div>
		},
		{
			title: 'NFT 名称',
			id: 'nft_name',
			key: 'nft_name',
			type: 'string',
			render: (text, record) => <div>{text}</div>
		},
		{
			title: 'NFT 分类',
			id: 'nft_type',
			key: 'nft_type',
			type: 'string',
			render: (text, record) => <div>{text}</div>
		},
		{
			title: 'NFT 图片',
			id: 'nft_img',
			key: 'nft_img',
			type: 'string',
			render: (text, record) => <img src={text} />
		},
		{
			title: 'NFT 描述',
			id: 'nft_desc',
			key: 'nft_desc',
			type: 'string',
			render: (text, record) => <div>{text}</div>
		},
		{
			title: '出售金额',
			id: 'price',
			key: 'price',
			type: 'number',
			render: (text, record) => <div>{text}</div>
		},
		{
			title: '标价',
			id: 'basic_bid',
			key: 'basic_bid',
			type: 'number',
			render: (text, record) => <div>{text}</div>
		},
		{
			title: '最低加价',
			id: 'lower_bid',
			key: 'lower_bid',
			type: 'number',
			render: (text, record) => <div>{text}</div>
		},
		{
			title: '最高价格',
			id: 'high_bid',
			key: 'high_bid',
			type: 'number',
			render: (text, record) => <div>{text}</div>
		},
		{
			title: 'NFT 状态',
			id: 'status',
			key: 'status',
			type: 'string',
			render: (text, record) => showText(text)
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
			const res = await api.get('/selectAll/nft');
			setDataSource(res.data);
		}
		getData();
	});

	return (
		<>
			<Table dataSource={dataSource} columns={columns} />
		</>
	);
}

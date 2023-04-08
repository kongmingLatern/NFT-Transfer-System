import { api } from '@/api';
import { SearchModalForm } from '@/component/common/modal/SearchModalForm';
import Space from '@/component/common/space/Space';
import Table from '@/component/common/table/Table';
import { useEffect, useRef, useState } from 'react';
import { showText } from './ReviewNFTManage';
import Modal from '@/component/common/modal/Modal';
import Card from '@/component/home/Card';
import { Button } from '@chakra-ui/react';
import { deleteHandle } from '@/utils/comon/delete';

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
					<Modal
						open={(onOpen) => (
							<button
								className="btn btn-secondary w-[100px] font-thin text-white"
								onClick={() => onOpen()}
							>
								查看
							</button>
						)}
						bodyContent={(onClose) => {
							return <Card item={record} />;
						}}
						footerContent={(onClose) => {
							return <Button onClick={onClose}>关闭</Button>;
						}}
					/>
					<button
						onClick={() => {
							deleteHandle('/delete/nft', { nft_id: record.nft_id });
						}}
						className="btn btn-error w-[100px] font-thin text-white"
					>
						删除
					</button>
				</Space>
			)
		}
	];
	const [loading, setLoading] = useState(true);
	const [dataSource, setDataSource] = useState([]);
	const tableTitle = [
		{
			title: 'NFT 编号'
		},
		{
			title: '当前持有者'
		},
		{
			title: 'NFT 名称'
		},
		{
			title: 'NFT 分类'
		},
		{
			title: 'NFT 图片'
		},
		{
			title: 'NFT 描述'
		},
		{
			title: '出售金额'
		},
		{
			title: '标价'
		},
		{
			title: '最低加价'
		},
		{
			title: '最高价'
		},
		{
			title: 'NFT 状态'
		}
	];

	const [result, setResult] = useState([]);
	useEffect(() => {
		async function getData() {
			const res = await api.get('/admin/selectAll/nft');
			setDataSource(res.data);
			setLoading(false);
		}
		getData();
	}, []);

	async function search(value, onOpen) {
		const res = await api.get('/search/nft', {
			params: {
				nft_id: value
			}
		});
		onOpen();
		setResult(res.data[0]);
	}
	return (
		<>
			<SearchModalForm
				placeholder={'请输入要查询的 NFT 编号'}
				search={search}
				result={result}
				tableTitle={tableTitle}
			/>
			<Table dataSource={dataSource} columns={columns} loading={loading} />
		</>
	);
}

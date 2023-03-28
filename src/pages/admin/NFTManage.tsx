import Space from '@/component/common/space/Space';
import Table from '@/component/common/table/Table';

export default function NFTManage() {
	const columns = [
		{
			title: 'NFT 编号',
			id: 'ID',
			key: 'ID'
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
			title: '出售金额',
			id: 'price',
			key: 'price',
			type: 'number',
			render: (text, record) => <div>{text}</div>
		},
		{
			title: 'NFT 状态',
			id: 'status',
			key: 'status',
			type: 'string',
			render: (text, record) => <div>{text}</div>
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
	const dataSource = [];

	for (let i = 0; i < 50; i++) {
		dataSource.push({
			id: `${i}`,
			key: `${i}`,
			username: `${i}`,
			nft_name: `${i}`,
			nft_type: `${i}`,
			price: `${i + 10}`,
      status: '直售',
			operation: `${i}`
		});
	}

	return (
		<>
			<Table dataSource={dataSource} columns={columns} />
		</>
	);
}

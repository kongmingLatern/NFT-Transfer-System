import Space from '../common/space/Space';
import AdminTable from '../common/table/Table';

export default function BuyList() {
	const columns = [
		{
			title: 'ID',
			id: 'ID',
			key: 'ID'
		},
		{
			title: '响应者姓名',
			id: 'username',
			key: 'username',
			render: (text, record) => <div>{text}</div>
		},
		{
			title: 'NFT 名称',
			id: 'nft_name',
			key: 'nft_name',
			render: (text, record) => <div>{text}</div>
		},
		{
			title: '响应金额',
			id: 'price',
			key: 'price',
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
						响应
					</button>
					<button className="btn btn-error w-[100px] font-thin text-white">
						忽略
					</button>
				</Space>
			)
		}
	];
	const dataSource = [
		{
			id: '1',
			key: '1',
			username: 'John Doe',
			nft_name: 'NFT 1',
			price: '1000',
			operation: '操作'
		},

		{
			id: '2',
			key: '2',
			username: 'John Doe',
			nft_name: 'NFT 2',
			price: '2000',
			operation: '操作'
		}
	];
	return (
			<AdminTable columns={columns} dataSource={dataSource} />
	);
}

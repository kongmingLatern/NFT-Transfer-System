import Space from '../common/space/Space';
import AdminTable from '../common/table/Table';

export default function BuyTableList() {
	const columns = [
		{
			title: 'ID',
			id: 'id',
			key: 'id'
		},
		{
			title: '响应者姓名',
			id: 'username',
			key: 'username'
		},
		{
			title: 'NFT 名称',
			id: 'nft_name',
			key: 'nft_name'
		},
		{
			title: '响应金额',
			id: 'price',
			key: 'price',
			render: (text, record) => {
				console.log(text, record);
				return <div>{text}</div>;
			}
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
	const dataSource = [];
	for (let i = 0; i < 50; i++) {
		dataSource.push({
			id: i.toString(),
			key: i.toString(),
			username: 'John Doe',
			nft_name: `NFT ${i}`,
			price: '1000',
			operation: '操作'
		});
	}
	return <AdminTable columns={columns} dataSource={dataSource} />;
}

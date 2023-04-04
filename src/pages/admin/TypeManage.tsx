import { api } from '@/api';
import Space from '@/component/common/space/Space';
import Table from '@/component/common/table/Table';
import { deleteHandle } from '@/utils/comon/delete';
import { useEffect, useState } from 'react';
export default function TypeManage() {
	const columns = [
		{
			title: '分类 ID',
			id: 'id',
			key: 'id'
		},
		{
			title: '分类名称',
			id: 'type',
			key: 'type'
		},
		{
			title: '操作',
			id: 'operation',
			key: 'operation',
			render: (text, record) => (
				<Space>
					<button
						className="btn btn-secondary w-[100px] font-thin text-white"
						onClick={() => console.log(record.type_id)}
					>
						修改
					</button>
					<button 
					onClick={()=>deleteHandle('/delete/type',{id:record.id})}
					className="btn btn-error w-[100px] font-thin text-white">
						删除
					</button>
				</Space>
			)
		}
	];
	const [dataSource, setDataSource] = useState([]);

	useEffect(() => {
		async function getData() {
			const res = await api.get('/selectAll/type');
			setDataSource(res.data);
		}
		getData();
	}, []);

	return <Table dataSource={dataSource} columns={columns} />;
}

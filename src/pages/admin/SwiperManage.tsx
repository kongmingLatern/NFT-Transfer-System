import { api } from '@/api';
import Space from '@/component/common/space/Space';
import Table from '@/component/common/table/Table';
import { deleteHandle } from '@/utils/comon/delete';
import { useEffect, useState } from 'react';
export default function SettingManage() {
	const columns = [
		{
			title: '轮播图 ID',
			id: 'img_id',
			key: 'img_id'
		},
		{
			title: '轮播图图片',
			id: 'img_src',
			key: 'img_src',
			type: 'string',
			render: (text, record) => <img src={text} />
		},
		{
			title: '轮播图分类',
			id: 'type',
			key: 'type',
			type: 'string',
			render: (text, record) => <div>{text}</div>
		},
		{
			title: '描述',
			id: 'img_desc',
			key: 'img_desc',
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
						onClick={() => console.log(record.swiper_id)}
					>
						查看
					</button>
					<button 
					onClick={()=>{
						deleteHandle('/delete/swiper',{img_id:record.img_id})
					}}
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
			const res = await api.get('/selectAll/swiper');
			setDataSource(res.data);
		}
		getData();
	},[]);

	return <Table dataSource={dataSource} columns={columns} />;
}

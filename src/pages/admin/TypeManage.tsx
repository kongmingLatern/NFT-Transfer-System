import { api } from '@/api';
import Form from '@/component/common/form/Form';
import Modal from '@/component/common/modal/Modal';
import Space from '@/component/common/space/Space';
import Table from '@/component/common/table/Table';
import { deleteHandle } from '@/utils/comon/delete';
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import message from '@/component/common/message/Message';
export default function TypeManage() {
	const [loading, setLoading] = useState(true);
	async function changeType(id) {
		const res = await api.put('/change/type', {
			id: id
		});
		console.log(res);
	}
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
					{/* <button
						className="btn btn-secondary w-[100px] font-thin text-white"
						onClick={() => changeType(record.id)}
					>
						修改
					</button> */}
					<button
						onClick={() => deleteHandle('/delete/type', { id: record.id })}
						className="btn btn-error w-[100px] font-thin text-white"
					>
						删除
					</button>
				</Space>
			)
		}
	];
	const [dataSource, setDataSource] = useState([]);
	async function addType(data) {
		const res: any = await api.post('/add/type', {
			...data
		});
		if (res.code === 200) {
			message.success('添加成功');
		} else {
			message.success('添加失败');
		}
	}
	useEffect(() => {
		async function getData() {
			const res = await api.get('/selectAll/type');
			setDataSource(res.data);
			setLoading(false);
		}
		getData();
	}, []);

	return (
		<>
			<Modal
				title="添加分类"
				open={(onOpen) => (
					<Button
						colorScheme="linkedin"
						onClick={onOpen}
						className="float-right m-2"
					>
						添加分类
					</Button>
				)}
				bodyContent={(onClose) => (
					<Form
						formItem={[
							{
								label: '请输入分类名称',
								name: 'type'
							}
						]}
						footer={() => (
							<Button
								colorScheme="linkedin"
								type="submit"
								className="float-right mt-2"
								onClick={onClose}
							>
								添加
							</Button>
						)}
						onSubmit={(data) => {
							addType(data);
							console.log('upload', data);
						}}
					/>
				)}
			/>
			<Table dataSource={dataSource} columns={columns} loading={loading} />;
		</>
	);
}

import { api } from '@/api';
import Form from '@/component/common/form/Form';
import Modal from '@/component/common/modal/Modal';
import Space from '@/component/common/space/Space';
import Table from '@/component/common/table/Table';
import { Button } from '@chakra-ui/react';
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
			const res = await api.get('/selectAll/type');
			setDataSource(res.data);
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
								name: 'swiper_type'
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
							console.log('upload', data);
						}}
					/>
				)}
			/>
			<Table dataSource={dataSource} columns={columns} />;
		</>
	);
}

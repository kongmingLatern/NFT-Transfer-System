import { api } from '@/api';
import Form from '@/component/common/form/Form';
import Modal from '@/component/common/modal/Modal';
import Space from '@/component/common/space/Space';
import Table from '@/component/common/table/Table';
import { deleteHandle } from '@/utils/comon/delete';
import { Button } from '@chakra-ui/react';
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
						onClick={() => {
							deleteHandle('/delete/swiper', { img_id: record.img_id });
						}}
						className="btn btn-error w-[100px] font-thin text-white"
					>
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
	}, []);

	return (
		<>
			<Modal
				size="xl"
				title="添加轮播图"
				open={(onOpen) => (
					<Button
						colorScheme="linkedin"
						onClick={onOpen}
						className="float-right m-2"
					>
						添加轮播图
					</Button>
				)}
				bodyContent={(onClose) => (
					<Form
						formItem={[
							{
								label: '请上传轮播图图片',
								name: 'swiper_src',
								type: 'file'
							},
							{
								label: '请输入分类名称',
								name: 'swiper_type'
							},
							{
								label: '请输入描述信息',
								name: 'swiper_desc'
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

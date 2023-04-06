import { api } from '@/api';
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import Space from '../common/space/Space';
import AdminTable from '../common/table/Table';
import Modal from '../common/modal/Modal';
import Form from '../common/form/Form';
import message from '../common/message/Message';

export default function BuyTableList() {
	const columns = [
		{
			title: '序号',
			id: 'buy_id',
			key: 'buy_id'
		},
		{
			title: '求购者姓名',
			id: 'buy_username',
			key: 'buy_username'
		},
		{
			title: '求购信息',
			id: 'buy_desc',
			key: 'buy_desc'
		},
		{
			title: '求购金额',
			id: 'buy_price',
			key: 'buy_price'
		},
		{
			title: '操作',
			id: 'operation',
			key: 'operation',
			render: (text, record) => (
				<Space>
					<Modal
						title="响应信息"
						open={(onOpen) => (
							<button
								className="btn btn-secondary w-[100px] font-thin text-white"
								onClick={() => onOpen()}
							>
								响应
							</button>
						)}
						bodyContent={(onClose) => (
							<Form
								onSubmit={async (data) => {
									const res = await uploadRespond(data);
									console.log('res', res);
								}}
								formItem={[
									{
										label: '请上传响应图片',
										type: 'file',
										name: 'response_file'
									},
									{
										label: '描述信息',
										name: 'response_desc',
										type: 'textarea',
										key: 'response_desc'
									}
								]}
								footer={() => (
									<Button
										colorScheme="blue"
										type="submit"
										onClick={() => onClose()}
										className="float-right mt-2"
									>
										提交
									</Button>
								)}
							/>
						)}
					/>
					<button
						className="btn btn-error w-[100px] font-thin text-white"
						onClick={() =>
							setData(data.filter((item) => item.buy_id !== record.buy_id))
						}
					>
						忽略
					</button>
				</Space>
			)
		}
	];
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	async function uploadRespond(data) {

		const res = await api.post('/upload/respond',
			{
				response_file: data.response_file[0],
				response_desc: data.response_desc,
				uid: localStorage.getItem('uid') || ''
			},
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		);
		message.success('响应成功');
		return res;
	}
	useEffect(() => {
		async function getData() {
			const res = await api.get('/selectAll/buy_message');
			setData(res.data);
			setLoading(false);
		}
		getData();
	}, []);

	return <AdminTable columns={columns} dataSource={data} loading={loading} />;
}

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
				<>
					<Modal
						title="响应信息"
						open={(onOpen) => (
							<button
								disabled={localStorage.getItem('uid') === record.buy_uid}
								className="btn btn-secondary w-[100px] font-thin text-white"
								onClick={() => onOpen()}
							>
								响应
							</button>
						)}
						bodyContent={(onClose) => (
							<Form
								onSubmit={async (data) => {
									const res = await uploadRespond({
										...data,
										want_id: record.buy_uid
									});
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
										className="float-right mt-2 mr-2"
									>
										提交
									</Button>
								)}
							/>
						)}
					/>
					{record.buy_uid === localStorage.getItem('uid') ? (
						<button
							className="btn btn-error w-[100px] font-thin text-white ml-2"
							onClick={() =>
								deleteMessage(
									record.buy_id,
									localStorage.getItem('uid'),
									record.buy_price
								)
							}
						>
							删除信息
						</button>
					) : null}
				</>
			)
		}
	];
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	async function deleteMessage(id, uid, price) {
		const res: any = await api.delete('/delete/buy_message', {
			params: {
				id,
				uid,
				price
			}
		});
		if (res.code === 200) {
			message.success('删除成功');
		} else {
			message.error('删除失败');
		}
		window.location.reload();
	}

	async function uploadRespond(data) {
		const res: Record<string, any> = await api.post(
			'/upload/respond',
			{
				response_file: data.response_file[0],
				response_desc: data.response_desc,
				uid: localStorage.getItem('uid') || '',
				want_id: data.want_id
			},
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		);
		if (res.code === 200) {
			message.success('响应成功');
		}
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

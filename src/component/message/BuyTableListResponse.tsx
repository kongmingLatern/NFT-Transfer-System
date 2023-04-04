import { api } from '@/api';
import { useState, useEffect } from 'react';
import Space from '../common/space/Space';
import AdminTable from '../common/table/Table';
import Modal from '../common/modal/Modal';
import message from '../common/message/Message';
import { Button } from '@chakra-ui/react';

export default function BuyTableListResponse() {
	const columns = [
		{
			title: '序号',
			id: 'response_id',
			key: 'response_id'
		},
		{
			title: '我的求购信息',
			id: 'buy_desc',
			key: 'buy_desc'
		},
		{
			title: '响应者姓名',
			id: 'response_username',
			key: 'response_username'
		},
		{
			title: 'NFT 图片',
			id: 'response_nft_img',
			key: 'response_nft_img',
			render: (text, record) => <img src={text} />
		},
		{
			title: '响应描述信息',
			id: 'response_desc',
			key: 'response_desc'
		},
		{
			title: '响应金额',
			id: 'response_price',
			key: 'response_price'
		},
		{
			title: '操作',
			id: 'operation',
			key: 'operation',
			render: (text, record) => (
				<Space>
					<Modal
						open={(onOpen) => (
							<button
								className="btn btn-secondary w-[100px]"
								onClick={() => onOpen()}
							>
								确认交易
							</button>
						)}
						title="确认交易"
						bodyContent={(onClose) => {
							function handleOk(id) {
								message.success('交易成功');
								console.log('removeUser', id);
								onClose();
							}
							return (
								<>
									<p className="text-center text-lg mb-3">
										确定要接收该交易吗？
										<br />
										<span className="font-bold text-red-700">
											一旦接受，其他关于这条求购信息的响应信息都会删除哦~
										</span>
									</p>
									<Space className="float-right">
										<Button colorScheme={'blue'} onClick={() => onClose()}>
											否
										</Button>
										<Button
											colorScheme={'red'}
											onClick={() => handleOk(record.response_id)}
										>
											是
										</Button>
									</Space>
								</>
							);
						}}
					/>
					<button
						className="btn btn-error w-[100px] font-thin text-white"
						onClick={() =>
							setData(
								data.filter((item) => item.response_id !== record.response_id)
							)
						}
					>
						忽略
					</button>
				</Space>
			)
		}
	];

	const [data, setData] = useState([]);
	useEffect(() => {
		async function getData() {
			const res = await api.get('/selectAll/response', {
				params: {
					// uid: localStorage.getItem('uid') || ''
					uid:'1157'
				}
			});
			console.log(res.data);
			setData(res.data);
		}
		getData();
	}, []);
	return <AdminTable columns={columns} dataSource={data} />;
}

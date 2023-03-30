import { api } from '@/api';
import Form from '@/component/common/form/Form';
import message from '@/component/common/message/Message';
import Modal from '@/component/common/modal/Modal';
import Space from '@/component/common/space/Space';
import Table from '@/component/common/table/Table';
import Main from '@/views/admin/Main';
import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function UserManage() {
	const columns = [
		{
			title: 'uid',
			id: 'uid',
			key: 'uid'
		},
		{
			title: '用户名',
			id: 'username',
			key: 'username',
			type: 'string',
			render: (text, record) => <div>{text}</div>
		},
		{
			title: '密码',
			id: 'password',
			key: 'password',
			type: 'string',
			render: (text, record) => <div>{text}</div>
		},
		{
			title: '账号余额（￥）',
			id: 'balance',
			key: 'balance',
			type: 'number',
			render: (text, record) => <div>{text}</div>
		},
		{
			title: '操作',
			id: 'operation',
			key: 'operation',
			render: (text, record) => (
				<Modal
					open={(onOpen) => (
						<button
							className="btn btn-error w-[100px] font-thin text-white"
							onClick={() => onOpen()}
						>
							删除用户
						</button>
					)}
					title="删除用户"
					bodyContent={(onClose) => {
						function handleOk(id) {
							message.success('删除成功');
							console.log('removeUser', id);
							onClose();
						}
						return (
							<>
								<p className="font-bold text-center text-lg mb-3">
									确定要删除嘛
								</p>
								<Space className="float-right">
									<Button colorScheme={'blue'} onClick={() => onClose()}>
										否
									</Button>
									<Button
										colorScheme={'red'}
										onClick={() => handleOk(record.id)}
									>
										是
									</Button>
								</Space>
							</>
						);
					}}
				/>
			)
		}
	];
	const [dataSource, setDataSource] = useState([]);

	useEffect(() => {
		async function getData() {
			const res = await api.get('/selectAll/user');
			setDataSource(res.data);
		}
		getData();
	});

	return (
		<>
			{/* <div className="flex justify-end pr-2 pt-3">
				<Space size={10}>
					<Modal
						open={(onOpen) => (
							<Button colorScheme={'facebook'} onClick={() => onOpen()}>
								<span>添加用户</span>
							</Button>
						)}
						title="添加用户"
						bodyContent={(onClose) => {
							function handleOk() {
								message.success('添加成功');
								onClose();
							}
							return (
								<Form
									formItem={[
										{
											label: '用户名',
											name: 'username',
											type: 'input',
											rules: [{ required: true, message: '请输入用户名' }]
										},
										{
											label: '密码',
											name: 'password',
											type: 'input',
											rules: [{ required: true, message: '请输入密码' }]
										},
										{
											label: '账号余额',
											name: 'balance',
											type: 'input',
											rules: [{ required: true, message: '请输入账号余额' }]
										}
									]}
									footer={() => (
										<Button
											colorScheme={'green'}
											type="submit"
											className="float-right"
											onClick={() => handleOk()}
										>
											提交
										</Button>
									)}
								/>
							);
						}}
					/>
				</Space>
			</div> */}
			<Main />
			<Table dataSource={dataSource} columns={columns} />
		</>
	);
}

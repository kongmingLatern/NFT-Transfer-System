import { api } from '@/api';
import Form from '@/component/common/form/Form';
import message from '@/component/common/message/Message';
import Modal from '@/component/common/modal/Modal';
import { SearchModalForm } from '@/component/common/modal/SearchModalForm';
import Space from '@/component/common/space/Space';
import Table from '@/component/common/table/Table';
import { deleteHandle } from '@/utils/comon/delete';
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
			id: 'remaining',
			key: 'remaining',
			type: 'number',
			render: (text, record) => <div>{text}</div>
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
								className="btn btn-secondary w-[100px] font-thin text-white"
								onClick={() => onOpen()}
							>
								修改用户
							</button>
						)}
						title="修改用户"
						bodyContent={(onClose) => {
							function handleOk(id) {
								message.success('修改成功');
								console.log('removeUser', id);
								onClose();
							}
							return (
								<Form
									formItem={[
										{
											label: '用户名',
											name: 'username',
											type: 'text'
										},
										{
											label: '账号余额',
											name: 'balance',
											type: 'number'
										},
										{
											label: '权限',
											name: 'isAuth',
											type: 'number'
										}
									]}
									footer={() => {
										return (
											<Button
												colorScheme="blue"
												type="submit"
												className="float-right mt-2"
											>
												修改
											</Button>
										);
									}}
									onSubmit={(data) => {
										console.log('Userdata', data, record.uid);
									}}
								/>
							);
						}}
					/>
					<Modal
						open={(onOpen) => (
							<button
								className="btn btn-error w-[100px] font-thin text-white"
								onClick={() => {
									onOpen()
								}}
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
											onClick={() => {
												deleteHandle('/delete/user',{uid:record.uid})
												handleOk(record.id)

											}}
										>
											是
										</Button>
									</Space>
								</>
							);
						}}
					/>
				</Space>
			)
		}
	];
	const [dataSource, setDataSource] = useState([]);
	const tableTitle = [
		{
			title: 'UID'
		},
		{
			title: '用户名'
		},
		{
			title: '密码'
		},
		{
			title: '账户余额'
		}
	];

	const [result, setResult] = useState([]);
	useEffect(() => {
		async function getData() {
			const res = await api.get('/selectAll/user');
			setDataSource(res.data);
		}
		getData();
	}, []);

	async function search(value, onOpen) {
		const res = await api.get('/search/user', {
			params: {
				uid: value
			}
		});
		onOpen();
		setResult(res.data);
	}

	return (
		<>
			<SearchModalForm
				placeholder={'请输入要查询的 UID 编号'}
				search={search}
				result={result}
				tableTitle={tableTitle}
			/>
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

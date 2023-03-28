import Form from '@/component/common/form/Form';
import message from '@/component/common/message/Message';
import Modal from '@/component/common/modal/Modal';
import Space from '@/component/common/space/Space';
import Table from '@/component/common/table/Table';
import { Button } from '@chakra-ui/react';

export default function UserManage() {
	const columns = [
		{
			title: 'ID',
			id: 'ID',
			key: 'ID'
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
				<Space>
					<button
						className="btn btn-secondary w-[100px] font-thin text-white"
						onClick={() => console.log(record.id)}
					>
						查看
					</button>
					<button className="btn btn-error w-[100px] font-thin text-white">
						删除
					</button>
				</Space>
			)
		}
	];
	const dataSource = [];

	for (let i = 0; i < 50; i++) {
		dataSource.push({
			id: `${i}`,
			key: `${i}`,
			username: `${i}`,
			password: `${i}`,
			balance: `${i + 10}`,
			operation: `${i}`
		});
	}

	return (
		<>
			<div className="flex justify-end pr-2 pt-3">
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
					<Modal
						open={(onOpen) => (
							<Button colorScheme={'red'} onClick={() => onOpen()}>
								<span>删除用户</span>
							</Button>
						)}
						title="删除用户"
						bodyContent={(onClose) => {
							function handleOk() {
								message.success('删除成功');
								onClose();
							}
							return (
								<>
									<p className='font-bold text-center text-lg mb-3'>确定要删除嘛</p>
									<Space className="float-right">
										<Button colorScheme={'blue'} onClick={() => onClose()}>
											否
										</Button>
										<Button colorScheme={'red'} onClick={() => onClose()}>
											是
										</Button>
									</Space>
								</>
							);
						}}
					/>
				</Space>
			</div>
			<Table dataSource={dataSource} columns={columns} />
		</>
	);
}

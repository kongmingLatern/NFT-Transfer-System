import { Icon } from '@iconify-icon/react';
import { Link, useNavigate } from 'react-router-dom';
import Upload from '../personal/Upload';
import { api } from '@/api';
import { useEffect, useState } from 'react';
import message from '../common/message/Message';
import Modal from '../common/modal/Modal';
import Form from '../common/form/Form';
import { Button } from '@chakra-ui/react';
import Space from '../common/space/Space';

export default function UserInfo() {
	const [balance, setBalance] = useState<number>(0);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function getPersonalInfromation() {
			const res = await api.get('/personal', {
				params: {
					uid: localStorage.getItem('uid') || ''
				}
			});
			console.log(res);
			setBalance(res.data.remaining);
		}
		getPersonalInfromation();
	}, []);

	function exit() {
		localStorage.clear();
		navigate('/login');
		message.success('退出成功');
	}

	return (
		<>
			<div className="dropdown dropdown-end">
				<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
					<div className="w-10 rounded-full">
						<Icon
							icon="mdi:user"
							inline={true}
							width={100 + '%'}
							height={100 + '%'}
						/>
					</div>
				</label>

				{/* 下拉列表 */}
				<ul
					tabIndex={0}
					className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 text-black"
				>
					<li className="justify-between">
						<div className="flex items-center flex-col justify-start ml-2">
							<div>
								余额:
								<span className="font-bold pl-2 text-lg italic">
									{balance} CS
								</span>
							</div>
						</div>
					</li>
					<li>
						<Link className="justify-between" to={'/personal'}>
							个人中心
						</Link>
					</li>
					<li>
						<Modal
							open={(onOpen) => <span onClick={onOpen}>充值</span>}
							title="充值"
							bodyContent={(onClose) => (
								<Form
									formItem={[
										{
											label: '请输入要充值的金额',
											name: 'remaining',
											type: 'number'
										}
									]}
									onSubmit={async (data) => {
										console.log('data', data);
										setLoading(true);
										const res = await api.put('/change/remaining', {
											uid: localStorage.getItem('uid'),
											price: data.remaining
										});
										setLoading(false);
										message.success('充值成功');
										onClose();
										window.location.reload();
									}}
									footer={() => (
										<Space className="float-right mt-2" size={12}>
											<Button
												type="submit"
												colorScheme="red"
												isLoading={loading}
											>
												点击充值
											</Button>
										</Space>
									)}
								/>
							)}
						/>
					</li>
					{/* NOTE: 上传 */}
					<li>
						<Upload />
					</li>
					{/* <li>
						<Link to={'/collection'}>收集</Link>
					</li> */}
					{/* <li>
						<a>Settings</a>
					</li> */}
					<li>
						<a onClick={() => exit()}>退出登录</a>
					</li>
				</ul>
			</div>
		</>
	);
}

import { Icon } from '@iconify-icon/react';
import { Link, useNavigate } from 'react-router-dom';
import Upload from '../personal/Upload';
import { api } from '@/api';
import { useEffect, useState } from 'react';
import message from '../common/message/Message';

export default function UserInfo() {
	const [balance, setBalance] = useState<number>(0);
	const navigate = useNavigate();

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

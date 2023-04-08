import { Tab, TabList, TabPanel, TabPanels, Button, background } from '@chakra-ui/react';
import Image from '@/assets/gd1.png';
import NftCard from '../../component/personal/NftCard';
import { Icon } from '@iconify-icon/react';
import { Link } from 'react-router-dom';
import Modal from '@/component/common/modal/Modal';
import Form from '@/component/common/form/Form';
import Space from '@/component/common/space/Space';
import { useEffect, useState } from 'react';
import message from '@/component/common/message/Message';
import { api } from '@/api';
import OrderCard from '@/component/personal/OrderCard';
import Tabs from '@/component/common/Tabs';
import styles from '@/assets/img.module.css';
import classNames from 'classnames';
import { url } from 'inspector';

export default function PersonalCard() {
	const [user, setUser] = useState<any>({});
	const [data, setData] = useState([]);
	const tabList = ['我的数字藏品', '我的订单'];
	const tabPaneList = [<NftCard changeBgimg={changeBgimg} data={data} />, <OrderCard />];
    const [img,setimg]=useState('')
	useEffect(() => {
		async function getData() {
			const res = await api.get('/select/nft/uid', {
				params: {
					uid: localStorage.getItem('uid') || ''
				}
			});
			setData(res.data);
		}
		async function getPersonalInfromation() {
			const res = await api.get('/personal', {
				params: {
					uid: localStorage.getItem('uid') || ''
				}
			});
			console.log(res);
			setUser(res.data);
		}

		getPersonalInfromation();
		getData();
	}, []);
	//修改用户
    function changeBgimg(src){
        setimg(src)
	}
	
	async function changeUser(data) {
		const res = await api.put(
			'/personal',
			{
				...data,
				uid: localStorage.getItem('uid') || '',
				avatar: data.avatar[0]
			},
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		);
		console.log(res);
	}

	return (
		<>
			{/* 上侧 */}
			<div
				className={classNames(
					'card',
					'flex-row',
					'relative',
					'rounded-none',
					styles.background
				)}
				style={{backgroundImage:img==='' ? null:`url(${img})`, 

				}}
			>
				<div className="mx-auto">
					<div>
						<figure>
							<img
								className="rounded-full overflow-hidden w-[20rem] h-[20rem]"
								src={user.avatar}
								alt="Image"
							/>
						</figure>
					</div>

					<aside className="text-center bg-[slateblue] p-3 rounded-md text-white">
						<p className="font-bold text-2xl">{user.nickname}</p>
						{/* <p className="font-thin text-lg font-sans">KongmingLatern</p> */}
						<div className="">
							<div className="mt-2 flex justify-center">
								<div className="flex items-center ">
									<Icon icon="ri:user-follow-line" color="#ccc" />
									<div className="ml-2 whitespace-nowrap">
										3&nbsp;<span>followers</span>
									</div>
									<div className="lg:mx-2">|</div>
									<div className="ml-2 whitespace-nowrap">
										3&nbsp;<span>followings</span>
									</div>
								</div>
							</div>
							<p className="mt-3 text-sm font-sans font-thin px-4">
								<span>个人签名：</span>
								<span>{user.signature}</span>
							</p>
						</div>

						{/* 个人信息编辑 */}
						<div className="absolute right-0 top-[50%]">
							<Modal
								open={(onOpen) => (
									<Button
										colorScheme="purple"
										onClick={() => onOpen()}
										className="font-thin"
									>
										编辑个人信息
									</Button>
								)}
								title={'编辑个人信息'}
								bodyContent={(onClose) => {
									function mentionCloseMsg(msg) {
										message.success(msg);
									}
									return (
										<Form
											formItem={[
												{
													label: '昵称',
													name: 'nickname',
													type: 'text',
													value: user.nickname,
													onChange: setUser
												},
												{
													label: '密码',
													name: 'password',
													type: 'password'
												},
												{
													label: '个人简介',
													name: 'signature',
													type: 'textarea',
													value: user.signature
												},
												{
													label: '头像',
													name: 'avatar',
													type: 'file'
												}
											]}
											footer={() => (
												<Space className="float-right">
													<Button colorScheme={'messenger'} type="submit">
														更新信息
													</Button>
												</Space>
											)}
											onSubmit={async (data) => {
												await changeUser(data);
												onClose();
												window.location.reload();
												message.success('更新成功');
											}}
										/>
									);
								}}
							></Modal>
							<div className="mt-2 flex"></div>
						</div>
					</aside>
				</div>
			</div>
			{/* 下侧 */}
			<div className="card flex-col relative mt-5">
				<h2 className="card-title justify-center font-sans mb-2">
					我的个人资产
				</h2>
				<Tabs
					tabList={tabList}
					tabPanelList={tabPaneList}
					tabPaneListJustify="center"
				/>
			</div>
		</>
	);
}

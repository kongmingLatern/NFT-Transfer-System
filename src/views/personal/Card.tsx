import { Tab, TabList, TabPanel, TabPanels, Button } from '@chakra-ui/react';
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

export default function PersonalCard() {
	const [user, setUser] = useState('凤之兮原');
	const [data, setData] = useState([]);
	const tabList = ['我的资产', '我的订单'];
	const tabPaneList = [<NftCard data={data} />, <OrderCard />];

	useEffect(() => {
		async function getData() {
			const res = await api.get('/select/nft', {
				params: {
					uid: localStorage.getItem('uid') || ''
				}
			});
			setData(res.data);
		}
		getData();
	}, []);

	return (
		<>
			{/* 上侧 */}
			<div className="card flex-row relative">
				<div className="mx-auto">
					<div>
						<figure>
							<img
								className="rounded-full overflow-hidden"
								src={Image}
								alt="Image"
								width={'100px'}
								height={'100px'}
							/>
						</figure>
					</div>

					<aside className="text-center">
						<p className="font-bold text-2xl">凤之兮原</p>
						<p className="font-thin text-lg font-sans">KongmingLatern</p>
						<div className="mt-2 flex">
							<div className="flex items-center">
								<Icon icon="ri:user-follow-line" color="#ccc" />
								<div className="ml-2 whitespace-nowrap">
									3{' '}
									<Link to={''} className="text-blue-400">
										followers
									</Link>
								</div>
								<div className="divider lg:divider-horizontal lg:mx-0"></div>
								<div className="ml-2 whitespace-nowrap">
									3{' '}
									<Link to={''} className="text-red-400">
										followings
									</Link>
								</div>
							</div>
						</div>
						<p className="text-lg font-sans">每天进步一点点~~</p>

						{/* 个人信息编辑 */}
						<div className="absolute right-0 top-[50%]">
							<Modal
								open={(onOpen) => (
									<Button onClick={() => onOpen()}>Edit profile</Button>
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
													label: '用户名',
													name: 'username',
													type: 'text',
													value: user,
													onChange: setUser
												},
												{
													label: '密码',
													name: 'password',
													type: 'password'
												},
												{
													label: '个人简介',
													name: 'introduction',
													type: 'textarea',
													value: '每天进步一点点'
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
											onSubmit={(data) => {
												mentionCloseMsg('更新信息成功');
												console.log('data', data);
												onClose();
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
			<div className="card flex-col  relative" style={{ top: '75px' }}>
				{/* <aside className="card-body ml-5 w-auto border overflow-y-scroll h-[100vh]"> */}
				<h2 className="card-title justify-center font-sans mb-2">
					My Personal Property
				</h2>
				<Tabs
					tabList={tabList}
					tabPanelList={tabPaneList}
					tabPaneListJustify="center"
				/>
				{/* <Tabs variant="soft-rounded" colorScheme="green">
						<TabList className="font-mono">
							<Tab>我的资产</Tab>
							<Tab>我的交易</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<NftCard data={data} />
							</TabPanel>
							<TabPanel>
								<OrderCard />
							</TabPanel>
						</TabPanels>
					</Tabs> */}
				{/* </aside> */}
			</div>
		</>
	);
}

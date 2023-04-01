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
import styles from '@/assets/img.module.css';
import classNames from 'classnames';

export default function PersonalCard() {
	const [user, setUser] = useState('凤之兮原');
	const [data, setData] = useState([]);
	const tabList = ['我的数字藏品', '我的订单'];
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
			<div
				className={classNames(
					'card',
					'flex-row',
					'relative',
					'rounded-none',
					styles.background
				)}
			>
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
						<div className="bg-[slateblue] p-3 rounded-md text-white">
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
								<span>每天进步一点点~~</span>
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

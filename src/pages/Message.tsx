import Header from '@/component/common/Header';
import BuyTableList from '@/component/message/BuyTableList';
import Tabs from '@/component/common/Tabs';
import BuyTableListResponse from '@/component/message/BuyTableListResponse';
import Space from '@/component/common/space/Space';
import Modal from '@/component/common/modal/Modal';
import Form from '@/component/common/form/Form';
import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { api } from '@/api';
import message from '@/component/common/message/Message';
export default function BuyMessage() {
	const tabList = ['所有求购信息', '响应我的'];
	const [allType, setAllType] = useState([]);
	const [loading, setLoading] = useState(false);
	async function upload(obj) {
		try {
			const res = await api.post('/uploadwant', {
				...obj,
				uid: localStorage.getItem('uid') || ''
			});
			console.log(res);
			if (res.code === 200) {
				setLoading(false);
				message.success('提交成功');
			}
		} catch (e) {
			const { response } = e;
			message.error(response.data.error);
			setLoading(false);
		}
	}
	useEffect(() => {
		async function getAllType() {
			const res = await api.get('/selectAll/type');
			setAllType(res.data);
		}
		getAllType();
	}, []);

	const tabPaneList = [<BuyTableList />, <BuyTableListResponse />];
	return (
		<>
			<Header />
			<Space className="flex pr-2 pt-2" align="end">
				<Modal
					title="求购信息"
					open={(onOpen) => (
						<button className="btn btn-primary" onClick={onOpen}>
							我想求购
						</button>
					)}
					bodyContent={(onClose) => {
						return (
							<Form
								formItem={[
									{
										label: '想求购的 NFT 介绍',
										name: 'desc',
										rules: [{ required: true, message: '请输入 NFT 介绍信息' }]
									},
									{
										label: 'NFT 分类',
										type: 'select',
										name: 'nft_type',
										rules: [
											{ required: true, message: '请输入 NFT 分类是一个数字' }
										]
									},
									{
										label: '预算价格',
										name: 'price',
										rules: [{ required: true, message: '请输入预算价格' }]
									}
								]}
								footer={() => (
									<Space size={10} className="mt-2" align="end">
										<Button
											isLoading={loading}
											type="submit"
											colorScheme={'messenger'}
										>
											提交
										</Button>
									</Space>
								)}
								onSubmit={async (values) => {
									setLoading(true);
									await upload(values);
									onClose();
								}}
								allType={allType}
							/>
						);
					}}
				/>
			</Space>
			<Tabs
				tabList={tabList}
				tabPanelList={tabPaneList}
				tabPaneListJustify="center"
			/>
		</>
	);
}

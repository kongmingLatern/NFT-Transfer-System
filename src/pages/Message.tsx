import Header from '@/component/common/Header';
import BuyTableList from '@/component/message/BuyTableList';
import Tabs from '@/component/common/Tabs';
import BuyTableListResponse from '@/component/message/BuyTableListResponse';
import Space from '@/component/common/space/Space';
import Modal from '@/component/common/modal/Modal';
import Form from '@/component/common/form/Form';
import { Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { api } from '@/api';
export default function BuyMessage() {
	const tabList = ['所有求购信息', '响应我的'];

	async function upload(obj) {
		obj.uid='1158'
		console.log(obj);
		const res= await api.post('/uploadwant',{
			...obj
		})
		console.log(res);
	}

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
										name: 'nft_type',
										rules: [{ required: true, message: '请输入 NFT 分类' }]
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
						                 
										type="submit" colorScheme={'messenger'}>
											提交
										</Button>
									</Space>
								)}
								onSubmit={(values) => {
									upload(values)
									onClose();
								}}
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

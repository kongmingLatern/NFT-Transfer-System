import Modal from '@/component/common/modal/Modal';
import Form from '../common/form/Form';
import { Button } from '@chakra-ui/react';
import Space from '../common/space/Space';

export default function Upload() {
	return (
		<Modal
			open={(onOpen) => <span onClick={() => onOpen()}>upload</span>}
			title="上传"
			bodyContent={() => (
				<Form
					formItem={[
						{
							label: 'NFT 名称',
							type: 'text',
							name: 'NFT_name'
						},
						{
							label: 'NFT 分类',
							type: 'select',
							name: 'NFT_type'
						},
						{
							label: 'NFT 图片',
							type: 'file',
							name: 'NFT_file'
						},
						{
							label: 'NFT 描述',
							type: 'textarea',
							name: 'NFT_description'
						},
						{
							label: '交易类型',
							type: 'select',
							name: 'transfer_type'
						},
						{
							label: '初始价格',
							type: 'number',
							name: 'basic_bid'
						},
						{
							label: '最低竞拍价',
							type: 'number',
							name: 'lower_bid'
						},

						{
							label: '上限价格',
							type: 'number',
							name: 'high_bid'
						}
					]}
					footer={() => (
						<Space className="float-right mt-2">
							<Button colorScheme={'messenger'} className="btn btn-primary">
								上传
							</Button>
						</Space>
					)}
				/>
			)}
		/>
	);
}

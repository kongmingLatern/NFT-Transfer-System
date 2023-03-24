import Modal from '@/component/common/modal/Modal';
import Form from '../common/form/Form';
import Space from '../common/space/Space';
import { Button } from '@chakra-ui/react';
export default function BidModal() {
	return (
		<Modal
			open={(onOpen) => (
				<button
					className="btn bg-red-500 h-8 rounded-xl w-full"
					onClick={() => onOpen()}
				>
					<img src="" alt="" />
					<span>立即购买12313</span>
				</button>
			)}
			title="竞拍"
			bodyContent={() => (
				<Form
					formItem={[
						{
							label: '竞拍商品名称',
							type: 'text',
							name: 'bid_name',
							disabled: true
						},
						{
							label: '当前竞价',
							type: 'number',
							name: 'bid_price',
							disabled: true
						},
						{
							label: '最低竞拍价格起伏',
							type: 'number',
							name: 'lower_bid',
							disabled: true
						},
						{
							label: '最高竞拍价格',
							type: 'number',
							name: 'high_bid',
							disabled: true
						},
						{
							label: '请输入竞拍价格',
							type: 'number',
							name: 'price'
						}
					]}
					footer={() => (
						<Space className="float-right mt-2">
							<Button
								colorScheme={'red'}
								type="submit"
								className="btn btn-primary"
							>
								参与竞拍
							</Button>
						</Space>
					)}
				/>
			)}
		/>
	);
}

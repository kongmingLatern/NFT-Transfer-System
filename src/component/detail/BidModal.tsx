import Modal from '@/component/common/modal/Modal';
import Form from '../common/form/Form';
import Space from '../common/space/Space';
import { Button } from '@chakra-ui/react';
import { DetailProvider } from '@/pages/Detail';
import { useContext } from 'react';
import message from '../common/message/Message';
export default function BidModal() {
	const { nft_name, price, lower_bid, high_bid } = useContext(
		DetailProvider as any
	);
	console.log('price', price, lower_bid, high_bid);
	return (
		<Modal
			open={(onOpen) => (
				<button
					className="btn bg-red-500 h-8 rounded-xl w-full"
					onClick={() => onOpen()}
				>
					<img src="" alt="" />
					<span>参与竞拍</span>
				</button>
			)}
			title="参与竞拍"
			bodyContent={(onClose) => {
				function mentionCloseMsg(msg) {
					message.success(msg);
					onClose();
				}
				return (
					<Form
						formItem={[
							{
								label: '竞拍商品名称',
								type: 'text',
								name: 'bid_name',
								disabled: true,
								value: `竞拍商品名称${nft_name}`
							},
							{
								label: '当前竞价',
								type: 'text',
								name: 'bid_price',
								disabled: true,
								value: `当前竞价${price}`
							},
							{
								label: '最低竞拍价格起伏',
								type: 'text',
								name: 'lower_bid',
								disabled: true,
								value: `最低竞拍价格起伏${lower_bid}`
							},
							{
								label: '最高竞拍价格',
								type: 'text',
								name: 'high_bid',
								disabled: true,
								value: `最高竞拍价格${high_bid}`
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
									竞拍
								</Button>
							</Space>
						)}
						onSubmit={(data) => {
							mentionCloseMsg('竞拍成功');
							console.log('data', data);
						}}
					/>
				);
			}}
		/>
	);
}

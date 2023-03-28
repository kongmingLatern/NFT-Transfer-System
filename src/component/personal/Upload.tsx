import Modal from '@/component/common/modal/Modal';
import Form from '../common/form/Form';
import { Button } from '@chakra-ui/react';
import Space from '../common/space/Space';
import message from '../common/message/Message';
import DatePicker from 'react-datepicker';
import { useState } from 'react';

export default function Upload() {
	const [startDate, setStartDate] = useState(new Date());

	return (
		<Modal
			open={(onOpen) => <span onClick={() => onOpen()}>Upload</span>}
			title="上传"
			bodyContent={(onClose) => {
				function mentionCloseMsg(msg) {
					message.success(msg);
					onClose();
				}
				return (
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
						render={() => (
							<div className="flex justify-around border h-[50px] items-center">
								<div className="text-[blue]">请选择竞拍开始时间</div>
								<div>
									<DatePicker
										selected={startDate}
										onChange={(date) => setStartDate(date)}
									/>
								</div>
							</div>
						)}
						footer={(handleSubmit) => (
							<Space className="float-right mt-2">
								<Button
									type="submit"
									colorScheme={'messenger'}
									className="btn btn-primary"
								>
									上传
								</Button>
							</Space>
						)}
						onSubmit={(data) => {
							mentionCloseMsg('上传成功');
							console.log(data, startDate.getTime());
						}}
					/>
				);
			}}
		/>
	);
}

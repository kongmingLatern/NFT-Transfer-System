import Modal from '@/component/common/modal/Modal';
import { Button } from '@chakra-ui/react';
import Space from '../space/Space';
import Form from './Form';

export default function FormModal({text, formItem}) {
	return (
		<Modal
      open={(onOpen) => <span onClick={() => onOpen()}>{text}</span>}
			title="上传"
			bodyContent={() => (
				<Form
					formItem={formItem}
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

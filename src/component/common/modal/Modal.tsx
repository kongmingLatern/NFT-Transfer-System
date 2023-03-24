import {
	useDisclosure,
	Button,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Modal
} from '@chakra-ui/react';

interface ModalType {
	open: (fn) => JSX.Element;
	title: string;
	bodyContent: () => JSX.Element;
	footerContent?: () => JSX.Element;
}

export default function modal({
	open,
	title = 'Modal Title',
	bodyContent,
	footerContent
}: Partial<ModalType>) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			{open(onOpen)}

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{title}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>{bodyContent && bodyContent()}</ModalBody>

					{footerContent ? (
						<ModalFooter>
							<Button colorScheme="blue" mr={3} onClick={onClose}>
								Close
							</Button>
							{footerContent()}
						</ModalFooter>
					) : null}
				</ModalContent>
			</Modal>
		</>
	);
}

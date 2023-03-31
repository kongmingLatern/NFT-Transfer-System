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
	bodyContent: (fn?) => JSX.Element;
	footerContent?: (fn?) => JSX.Element;
	isOpenStatus?: boolean;
	justifyBody?:
		| 'start'
		| 'center'
		| 'end'
		| 'space-between'
		| 'space-around'
		| 'space-evenly'
		| 'stretch'
		| 'initial'
		| 'inherit'
		| undefined;
}

export default function modal({
	isOpenStatus = false,
	open,
	title = 'Modal Title',
	bodyContent,
	footerContent,
	justifyBody = 'start'
}: Partial<ModalType>) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			{open(onOpen)}

			<Modal isOpen={isOpenStatus || isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent justifyContent={'center'}>
					<ModalHeader>{title}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>{bodyContent && bodyContent(onClose)}</ModalBody>

					{footerContent ? (
						<ModalFooter>
							<Button colorScheme="blue" mr={3} onClick={onClose}>
								Close
							</Button>
							{footerContent(onClose)}
						</ModalFooter>
					) : null}
				</ModalContent>
			</Modal>
		</>
	);
}

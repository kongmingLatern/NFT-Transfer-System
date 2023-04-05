import { TextBadge } from '@/utils/react';
import {
	Card,
	CardBody,
	Image,
	Stack,
	Text,
	Heading,
	Divider,
	CardFooter,
	Button,
	ButtonGroup
} from '@chakra-ui/react';
import { Icon } from '@iconify-icon/react';
import { Link } from 'react-router-dom';
import Space from '../common/space/Space';

export default function ChakraCard({ item }) {
	console.log('item', item);
	return (
		<Card maxW="sm" alignItems={'center'}>
			<Link to={'/detail'}>
				<CardBody className="relative">
					<Image
						fit={'cover'}
						className="w-full h-[12rem]"
						src={item.nft_img}
						alt={item.nft_desc}
						borderRadius="lg"
					/>
					<TextBadge className="absolute right-0 top-0 text-lg h-[2rem]" status={item.status} />
					<Stack mt="6" spacing="3" alignItems={'center'}>
						<Heading size="md">
							<span>{item.nft_name}</span>
						</Heading>
						<Text>{item.nft_desc}</Text>
						<Text color="blue.600" fontSize="2xl">
							{item.price} CS
						</Text>
					</Stack>
				</CardBody>
			</Link>
			<Divider />
			<CardFooter>
				<ButtonGroup spacing="2">
					<Button variant="ghost" colorScheme="blue">
						<Icon
							icon="material-symbols:shopping-cart-rounded"
							color="rgba(204, 204, 204, 0.8)"
							width={25}
							height={25}
						/>
						加入购物车
					</Button>
					<Button variant="solid" colorScheme="blue">
						购买
					</Button>
				</ButtonGroup>
			</CardFooter>
		</Card>
	);
}

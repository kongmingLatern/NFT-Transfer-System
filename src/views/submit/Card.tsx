import { api } from '@/api';
import message from '@/component/common/message/Message';
import {
	Card,
	Stack,
	CardBody,
	Heading,
	CardFooter,
	Button,
	Text,
	Image
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

export default function CommitCard() {
	const { nft_id } = useParams<{ nft_id: string }>();
	const [data, setData] = useState({} as any);

	useEffect(() => {
		async function getNFT() {
			const res = await api.get(`select/nft/nft_id`, {
				params: {
					nft_id
				}
			});
			setData(res.data.nft_data);
		}
		getNFT();
	}, []);

	async function submitOrder() {
		try {
			const res = await api.post('/direct/order', {
				uid: localStorage.getItem('uid') || '',
				data: [data],
				price: data.price
			});
		} catch (e) {
			if (e.data.code === 200) {
				message.success('订单提交成功');
			} else {
				message.error(e.data.message);
			}
			// console.log(e);
		}
		// if (res?.data?.code === 400) {
		// 	message.error(res.data?.message);
		// 	window.history.go(-1);
		// } else {
		// 	message.success('订单提交成功');
		// 	window.history.go(-1);
		// 	// window.location
		// 	console.log('submitOrder');
		// }
	}

	return data.status !== 3 ? (
		<Card
			colorScheme="blue"
			className="h-[400px] mt-[6rem] w-[800px] mx-auto"
			direction={{ base: 'column', sm: 'row' }}
			overflow="hidden"
			variant="outline"
		>
			<Image
				objectFit="cover"
				className="w-[300px]"
				// maxW={{ base: '300px', sm: '200px' }}
				src={data.nft_img}
				alt="Caffe Latte"
			/>

			<CardBody>
				<Heading size="md">
					<h1 className="font-bold text-2xl mb-5">
						名称：
						<span>{data.nft_name}</span>
					</h1>
				</Heading>
				<Text py="2">
					<h2 className="font-bold text-lg mb-5">
						NFT唯一标识：
						<span className="whitespace-nowrap font-thin italic">
							{data.nft_id}
						</span>
					</h2>
					<h2 className="font-bold text-lg mb-5">
						NFT分类：
						<span className="font-thin italic">{data.nft_type}</span>
					</h2>
					<h2 className="font-bold text-lg mb-5">
						NFT描述：
						<span className="font-thin italic">{data.nft_desc}</span>
					</h2>
					<h2 className="font-bold text-lg mb-5">
						购买数量：
						<span className="font-thin">{data.count}</span>
					</h2>
				</Text>
			</CardBody>

			<CardFooter className="flex-col justify-end">
				<Text variant="solid" colorScheme="red" className="whitespace-nowrap">
					总价：
					<span className="font-bold text-red-600 text-2xl italic">
						{data.price}
					</span>
					&nbsp;CS
				</Text>
				<Button
					variant="solid"
					colorScheme="red"
					className="mt-2"
					onClick={() => submitOrder()}
				>
					提交订单
				</Button>
			</CardFooter>
		</Card>
	) : (
		<Navigate to="/home" />
	);
}

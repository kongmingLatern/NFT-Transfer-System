import {
	TableContainer,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Box,
	Skeleton
} from '@chakra-ui/react';
import { api } from '@/api';
import { useState, useEffect } from 'react';

export default function Trending({ type }: any) {
	const [leftData, setLeftData] = useState([]);
	const [rightData, setRightData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getData() {
			const res = await api.get('/trend', {
				params: {
					type
				}
			});
			setLoading(false);
			const result = res.data.slice(0, 10);
			setLeftData(result.slice(0, 5));
			setRightData(result.slice(5));
		}
		getData();
	}, []);

	return (
		<Skeleton isLoaded={!loading} fadeDuration={1}>
			<TableContainer style={{ display: 'flex', padding: '1em' }}>
				<Table variant="striped" className="mr-5">
					<Thead>
						<Tr>
							<Th>No</Th>
							<Th>Name</Th>
							<Th isNumeric>Floor Price</Th>
							<Th isNumeric>Volume</Th>
						</Tr>
					</Thead>
					<Tbody>
						{leftData.length === 0 ? (
							<Tr>
								<Td
									className="font-bold text-lg"
									colSpan={4}
									style={{ textAlign: 'center' }}
								>
									暂无数据
								</Td>
							</Tr>
						) : (
							leftData.map((item, index) => (
								<Tr key={index}>
									<Td>{index + 1}</Td>
									<Td className="flex items-center">
										<img
											src={item.nft_img}
											width={60 + 'px'}
											className="mr-3 rounded-lg overflow-hidden"
										/>
										<span className="font-thin">{item.nft_name}</span>
									</Td>
									<Td isNumeric className="font-semibold">
										￥{item.basic_bid}
									</Td>
									<Td isNumeric className="font-semibold">
										￥{item.high_bid}
									</Td>
								</Tr>
							))
						)}
					</Tbody>
				</Table>
				<Table variant="striped">
					<Thead>
						<Tr>
							<Th>No</Th>
							<Th>Name</Th>
							<Th isNumeric>Floor Price</Th>
							<Th isNumeric>Volume</Th>
						</Tr>
					</Thead>
					<Tbody>
						{rightData.length === 0 ? (
							<Tr>
								<Td
									className="font-bold  text-lg"
									colSpan={4}
									style={{ textAlign: 'center' }}
								>
									暂无数据
								</Td>
							</Tr>
						) : (
							rightData.map((item, index) => (
								<Tr key={index}>
									<Td>{index + 6}</Td>
									<Td className="flex items-center">
										<img
											src={item.nft_img}
											width={60 + 'px'}
											className="mr-3 rounded-lg overflow-hidden"
										/>
										<span className="font-thin">{item.nft_name}</span>
									</Td>
									<Td isNumeric className="font-semibold">
										￥{item.basic_bid}
									</Td>
									<Td isNumeric className="font-semibold">
										￥{item.high_bid}
									</Td>
								</Tr>
							))
						)}
					</Tbody>
				</Table>
			</TableContainer>
		</Skeleton>
	);
}

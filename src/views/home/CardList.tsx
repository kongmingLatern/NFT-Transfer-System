import { api } from '@/api';
import Spin from '@/component/common/spin/Spin';
import Card from '@/component/home/Card';
import ChakraCard from '@/component/home/CharkCard';
import { SimpleGrid, Skeleton } from '@chakra-ui/react';
import { data } from 'autoprefixer';
import { useState, useEffect } from 'react';
interface CardListType {
	type?: string;
	style: 'daisy' | 'chakra';
}

export default function CardList({
	type,
	style = 'daisy'
}: Partial<CardListType>) {
	const [dataSource, setDataSource] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getData() {
			const res = await api.get('/select/nft', {
				params: {
					type
				}
			});
			setLoading(false);
			setDataSource(res.data);
		}
		getData();
	}, []);

	return style === 'daisy' ? (
		<SimpleGrid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-3 justify-items-center gap-5">
			<Spin loading={loading}>
				{dataSource.map((item) => {
					return <Card key={item.nft_id} item={item} />;
				})}
			</Spin>
		</SimpleGrid>
	) : (
		<SimpleGrid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-3 justify-items-center gap-5">
			<Spin loading={loading}>
				{dataSource.map((item) => {
					return <ChakraCard key={item.nft_id} item={item} />;
				})}
			</Spin>
		</SimpleGrid>
	);
}

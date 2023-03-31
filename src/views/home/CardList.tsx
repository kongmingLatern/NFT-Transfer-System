import { api } from '@/api';
import Card from '@/component/home/Card';
import { SimpleGrid } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
interface CardListType {
	type: string;
}

export default function CardList({ type }: Partial<CardListType>) {
	const [dataSource, setDataSource] = useState([]);

	useEffect(() => {
		async function getData() {
			const res = await api.get('/selectAll/nft', {
				params: {
					type
				}
			});
			setDataSource(res.data);
		}
		getData();
	}, []);

	return (
		<SimpleGrid className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 px-3 justify-items-center gap-5">
			{dataSource.map((item) => {
				return <Card key={item.nft_id} item={item} />;
			})}
		</SimpleGrid>
	);
}

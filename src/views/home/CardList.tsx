import { api } from '@/api';
import Card from '@/component/home/Card';
import ChakraCard from '@/component/home/CharkCard';
import { SimpleGrid } from '@chakra-ui/react';
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

	useEffect(() => {
		async function getData() {
			const res = await api.get('/select/nft', {
				params: {
					type
					}
				});
				setDataSource(res.data);
		    }
			getData();
	},[]);
				}
			});
			setDataSource(res.data);
		}
		getData();
	}, []);

	return style === 'daisy' ? (
		<SimpleGrid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-3 justify-items-center gap-5">
			{dataSource.map((item) => {
				return <Card key={item.nft_id} item={item} />;
			})}
		</SimpleGrid>
	) : (
		<SimpleGrid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-3 justify-items-center gap-5">
			{dataSource.map((item) => {
				return <ChakraCard key={item.nft_id} item={item} />;
			})}
		</SimpleGrid>
	);
}

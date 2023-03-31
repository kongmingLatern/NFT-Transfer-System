import { api } from '@/api';
import Divider from '@/component/common/Divider';
import Header from '@/component/common/Header';
import CardDetail from '@/views/detail/CardDetail';
import CardInfo from '@/views/detail/CardInfo';
import { createContext, useEffect, useState } from 'react';

export const DetailProvider = createContext({});

export default function Detail() {
	const [data, setData] = useState([]);

	useEffect(() => {
		async function getData() {
			const res = await api.get('/select/nft/nft_id', {
				params: {
					nft_id: 1
				}
			});
			setData(res.data);
		}
		getData();
	});

	return (
		<DetailProvider.Provider value={data}>
			<Header />
			<Divider />
			<div className="mt-10 max-w-screen-lg mx-auto">
				<div className="flex">
					<CardDetail />
					<CardInfo />
				</div>
			</div>
		</DetailProvider.Provider>
	);
}

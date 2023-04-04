import { api } from '@/api';
import Divider from '@/component/common/Divider';
import Header from '@/component/common/Header';
import CardDetail from '@/views/detail/CardDetail';
import CardInfo from '@/views/detail/CardInfo';
import { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const DetailProvider = createContext({} as any);

export default function Detail() {
	const [data, setData] = useState([]);
	const { nft_id } = useParams();

	useEffect(() => {
		console.log(nft_id);
		async function getData() {
			const res = await api.get('/select/nft/nft_id', {
				params: {
					nft_id
				}
			});
			console.log(res.data.nft_data[0]);
			setData(res.data.nft_data[0]);
		}
		getData();
	}, []);

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

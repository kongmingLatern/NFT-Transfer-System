import { api } from '@/api';
import Divider from '@/component/common/Divider';
import Header from '@/component/common/Header';
import CardDetail from '@/views/detail/CardDetail';
import CardInfo from '@/views/detail/CardInfo';
import { SkeletonText } from '@chakra-ui/react';
import { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const DetailProvider = createContext({} as any);

export default function Detail() {
	const [nft_data, setNftData] = useState({});
	const { nft_id } = useParams();
	const [chart_data, setChart] = useState([]);
	const [transaction, setTransaction] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		async function getData() {
			const res = await api.get('/select/nft/nft_id', {
				params: {
					nft_id
				}
			});
			setChart(res.data.chart_data);
			setTransaction(res.data.transaction);
			setNftData(res.data.nft_data);
			setLoading(false);
		}
		getData();
	}, []);

	return (
		<>
			<Header />
			<Divider />
			<DetailProvider.Provider value={nft_data}>
				<SkeletonText isLoaded={!loading} noOfLines={5} fadeDuration={1}>
					<div className="max-w-screen-lg mx-auto bg-white">
						<div className="flex">
							<CardDetail />
							<CardInfo chart_data={chart_data} transaction={transaction} />
						</div>
					</div>
				</SkeletonText>
			</DetailProvider.Provider>
		</>
	);
}

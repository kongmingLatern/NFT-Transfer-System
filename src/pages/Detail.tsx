import Divider from '@/component/common/Divider';
import Header from '@/component/common/Header';
import CardDetail from '@/views/detail/CardDetail';
import CardInfo from '@/views/detail/CardInfo';
import { createContext } from 'react';

export const DetailProvider = createContext({});

export default function Detail() {

  

	return (
		<DetailProvider.Provider
			value={{
				nft_name: 'NFT 1',
				nft_img: 'https://picsum.photos/200/300',
				nft_desc: 'NFT 1',
				nft_type: 'Art',
				username: 'abs',
				transfer_type: 0,
				basic_bid: 100,
				lower_bid: 20,
				high_bid: 1000,
				price: 120,
				count: 1,
				buyer: 'new buyer',
				// 0 审核 1 直售 2 竞拍中 3 待定
				status: 0
			}}
		>
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

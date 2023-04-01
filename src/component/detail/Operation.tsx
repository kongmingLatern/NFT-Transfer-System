import { Icon } from '@iconify-icon/react';
import BidModal from './BidModal';
import { useContext } from 'react';
import { DetailProvider } from '@/pages/Detail';

export default function Operation() {
	const { nft_id } = useContext(DetailProvider as any);

	function addCart(nft_id) {
		// NOTE: 添加购物车
		console.log('nft_id', nft_id);
	}

	return (
		<>
			<div className="w-1/3  text-center inline-block">
				<button
					className="btn bg-blue-400 h-8 rounded-xl w-full"
					onClick={() => addCart(nft_id)}
				>
					<Icon
						icon="material-symbols:shopping-cart-rounded"
						color="rgba(204, 204, 204, 0.8)"
					/>
					加入购物车
				</button>
			</div>
			<div className="w-1/3 text-center inline-block">
				<BidModal />
			</div>
		</>
	);
}

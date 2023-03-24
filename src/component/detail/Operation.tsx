import { Icon } from '@iconify-icon/react';
import BidModal from './BidModal';

export default function Operation() {
	return (
		<>
			<div className="w-1/3  text-center inline-block">
				<button className="btn bg-blue-400 h-8 rounded-xl w-full">
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

import { Icon } from '@iconify-icon/react';
import BidModal from './BidModal';
import { useContext } from 'react';
import { DetailProvider } from '@/pages/Detail';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '@/api';
import message from '../common/message/Message';

export default function Operation() {
	const { transfer_type } = useContext(DetailProvider);
	const { nft_id } = useParams();
	const navigate = useNavigate();

	async function addCart(nft_id) {
		// NOTE: 添加购物车
		const res: any = await api.post('/add/shoppingcart', {
			uid: localStorage.getItem('uid') || '',
			nft_id
		});
		if (res.code === 200) {
			message.success('添加成功');
		}
	}
	async function immediately() {
		navigate('/submit', {
			state: { nft_id }
		});
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
				{transfer_type !== 1 ? (
					<button
						className="btn  bg-red-600 h-8 rounded-xl w-full"
						onClick={() => navigate('/submit/' + nft_id)}
					>
						立即购买
					</button>
				) : (
					<BidModal />
				)}
			</div>
		</>
	);
}

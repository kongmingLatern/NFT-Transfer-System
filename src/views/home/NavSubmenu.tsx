import { Icon } from '@iconify-icon/react';
import { Link } from 'react-router-dom';
import Shoppingcart from '../../component/home/Shoppingcart';

export default function NavSubmenu() {
	return (
		<ul className="menu menu-horizontal px-1">
			<li>
				<Link to={'/home'}>
					<Icon
						icon="material-symbols:home"
						color="rgba(204, 204, 204, 0.8)"
						width={25}
						height={25}
					/>
					主页
				</Link>
			</li>
			<li tabIndex={0}>
				<span>
					<Icon
						icon="mingcute:classify-fill"
						color="rgba(204, 204, 204, 0.8)"
						width={25}
						height={25}
					/>
					<Link to={'/nft_gallery'}>NFT 画展</Link>
				</span>
			</li>
			<li>
				<Link to={'/paint'}>
					<Icon
						icon="mdi:draw"
						color="rgba(204, 204, 204, 0.8)"
						width={25}
						height={25}
					/>
					创作画板
				</Link>
			</li>
			<li>
				<Shoppingcart />
				{/* <span>
          <Icon
            icon="material-symbols:shopping-cart-rounded"
            color="rgba(204, 204, 204, 0.8)"
            width={25}
            height={25}
          />
          购物车
        </span> */}
			</li>
		</ul>
	);
}

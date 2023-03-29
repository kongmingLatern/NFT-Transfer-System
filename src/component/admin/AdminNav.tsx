import { Icon } from '@iconify-icon/react';
import { Link } from 'react-router-dom';
import Space from '../common/space/Space';

export default function AdminNav() {
	return (
		<>
			<ul className="menu bg-base-100 w-56 p-2 rounded-box">
				{/* NOTE: 用户管理 */}
				<li className="menu-title ">
					<Space size={0} className="items-center">
						<Icon icon="mdi:user-multiple" />
						<span>用户管理</span>
					</Space>
				</li>
				<li className="bordered">
					<Link to="/admin/user">用户信息</Link>
				</li>

				{/* NOTE: NFT管理 */}
				<li className="menu-title">
					<Space size={0} className="items-center">
						<Icon icon="material-symbols:currency-bitcoin" />
						<span>NFT 管理</span>
					</Space>
				</li>
				<li>
					<Link to="/admin/nft">NFT 信息</Link>
				</li>
				<li>
					<Link to="/admin/review">NFT 审核</Link>
				</li>

				{/* NOTE: 管理设置 */}
				<li className="menu-title">
					<Space size={0} className="items-center">
						<Icon icon="ant-design:setting-outlined" />
						<span>管理设置</span>
					</Space>
				</li>
				<li>
					<Link to="/admin/setting/swiper">轮播图管理</Link>
				</li>
				<li>
					<Link to="/admin/setting/order">分类管理</Link>
				</li>

				{/* NOTE: 订单管理 */}
				<li className="menu-title">
					<Space size={0} className="items-center">
						<Icon icon="openmoji:chains" />
						<span>订单管理</span>
					</Space>
				</li>
				<li>
					<Link to="/admin/order">
						<Icon icon="openmoji:chains" />
						订单信息
					</Link>
				</li>
			</ul>
		</>
	);
}

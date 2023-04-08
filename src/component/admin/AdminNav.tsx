import { Icon } from '@iconify-icon/react';
import { Link } from 'react-router-dom';
import Space from '../common/space/Space';
import { useState } from 'react';

interface IconType {
	[key: string]: string;
}
export default function AdminNav() {
	const [active, setActive] = useState(1);
	const navArray = [
		{
			label: '用户管理',
			icon: 'usermanage',
			type: 'menu-title'
		},
		{
			label: '用户信息',
			type: 'bordered',
			path: '/admin/user'
		},
		{
			label: 'NFT管理',
			type: 'menu-title',
			icon: 'nftmanage'
		},
		{
			label: 'NFT 信息',
			type: 'bordered',
			path: '/admin/nft'
		},
		{
			label: 'NFT 审核',
			type: 'bordered',
			path: '/admin/review'
		},
		{
			label: '管理设置',
			type: 'menu-title',
			icon: 'setmanage'
		},
		{
			label: '轮播图管理',
			type: 'bordered',
			path: '/admin/setting/swiper'
		},
		{
			label: '分类管理',
			type: 'bordered',
			path: '/admin/setting/type'
		},
		{
			label: '订单管理',
			type: 'menu-title',
			icon: 'ordermanage'
		},
		{
			label: '订单信息',
			type: 'bordered',
			path: '/admin/order'
		}
	];
	const iconObj: IconType = {
		usermanage: 'mdi:user-multiple',
		nftmanage: 'material-symbols:currency-bitcoin',
		setmanage: 'ant-design:setting-outlined',
		ordermanage: 'openmoji:chains'
	};
	return (
		<>
			<ul className="menu bg-base-100 w-56 p-2 rounded-box">
				{navArray.map((item, index) =>
					item.type === 'menu-title' ? (
						<li className="menu-title" key={index}>
							<Space size={0} className="items-center">
								<Icon icon={iconObj[item.icon]} />
								<span>{item.label}</span>
							</Space>
						</li>
					) : (
						<li key={index}>
							<Link
								onClick={() => setActive(index)}
								className={index === active ? 'bg-slate-200' : ''}
								to={item.path}
							>
								{item.label + index}
							</Link>
						</li>
					)
				)}
			</ul>
		</>
	);
}

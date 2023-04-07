import Admin from '@/pages/Admin';
import NFTManage from '@/pages/admin/NFTManage';
import OrderManage from '@/pages/admin/OrderManage';
import SwiperManage from '@/pages/admin/SwiperManage';
import UserManage from '@/pages/admin/UserManage';
import Collection from '@/pages/Collection';
import Create from '@/pages/Create';
import Detail from '@/pages/Detail';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import BuyMessage from '@/pages/Message';
import Personal from '@/pages/Personal';
import Register from '@/pages/Register';
import Transaction from '@/pages/Transaction';
import ReviewNFTManage from '@/pages/admin/ReviewNFTManage';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import TypeManage from '@/pages/admin/TypeManage';
import SearchResult from '@/pages/SearchResult';
import Submit from '@/pages/Submit';
import message from '@/component/common/message/Message';
import NotFound from '@/pages/404';

export const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				index: true,
				element: <Navigate to="/login" />
			}
		]
	},
	{
		path: '/home',
		element: (
			<AuthLogin>
				<Home />
			</AuthLogin>
		)
	},
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '/register',
		element: <Register />
	},
	{
		path: '/submit/:nft_id',
		element: (
			<AuthLogin>
				<Submit />
			</AuthLogin>
		)
	},
	{
		path: '/detail/:nft_id',
		element: (
			<AuthLogin>
				<Detail />
			</AuthLogin>
		)
	},
	{
		path: '/personal',
		element: (
			<AuthLogin>
				<Personal />
			</AuthLogin>
		)
	},
	{
		path: '/paint',
		element: (
			<AuthLogin>
				<Create />
			</AuthLogin>
		)
	},
	{
		path: '/transaction',
		element: (
			<AuthLogin>
				<Transaction />
			</AuthLogin>
		)
	},
	{
		path: '/submit',
		element: (
			<AuthLogin>
				<Submit />
			</AuthLogin>
		)
	},
	{
		path: '/message',
		element: (
			<AuthLogin>
				<BuyMessage />
			</AuthLogin>
		)
	},
	{
		path: '/collection',
		element: (
			<AuthLogin>
				<Collection />
			</AuthLogin>
		)
	},
	{
		path: '/search/nft',
		element: (
			<AuthLogin>
				<SearchResult />
			</AuthLogin>
		)
	},
	{
		path: '/admin',
		element: (
			<AuthLogin isAdmin>
				<Admin />
			</AuthLogin>
		),
		children: [
			{
				index: true,
				element: <Navigate to="/admin/user" />
			},
			{
				path: 'user',
				element: (
					<AuthLogin isAdmin>
						<UserManage />
					</AuthLogin>
				)
			},
			{
				path: 'nft',
				element: (
					<AuthLogin isAdmin>
						<NFTManage />
					</AuthLogin>
				)
			},
			{
				path: 'review',
				element: (
					<AuthLogin isAdmin>
						<ReviewNFTManage />
					</AuthLogin>
				)
			},
			{
				path: 'setting',
				children: [
					{
						index: true,
						element: <Navigate to="/admin/setting/swiper" />
					},
					{
						path: 'swiper',
						element: (
							<AuthLogin isAdmin>
								<SwiperManage />
							</AuthLogin>
						)
					},
					{
						path: 'type',
						element: (
							<AuthLogin isAdmin>
								<TypeManage />
							</AuthLogin>
						)
					},
					{
						path: '*',
						element: <NotFound />
					}
				]
			},
			{
				path: 'order',
				element: (
					<AuthLogin isAdmin>
						<OrderManage />
					</AuthLogin>
				)
			}
		]
	},
	{
		path: '*',
		element: <NotFound />
	}
]);

// 路由守卫
export function AuthLogin({ isAdmin, children }: any) {
	const token = localStorage.getItem('token') || '';
	const isAuth = localStorage.getItem('isAuth') || 0;
	if (token !== '') {
		// 说明有登录状态
		if (isAdmin && isAuth !== '1') {
			message.error('您没有权限访问此页面');
			return <Navigate to="/home" />;
		} else {
			return children;
		}
	} else {
		// 没有登录
		if (message) {
			message.error('请先登录');
		}
		// message.error('请先登录');
		return <Navigate to="/login" />;
	}
}

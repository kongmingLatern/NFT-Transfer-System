import Admin from '@/pages/Admin';
import NFTManage from '@/pages/admin/NFTManage';
import OrderManage from '@/pages/admin/OrderManage';
import SettingManage from '@/pages/admin/SettingManage';
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
import Main from '@/views/admin/Main';
import { createBrowserRouter, Navigate } from 'react-router-dom';

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
		element: <Home />
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
		path: '/detail',
		element: <Detail />
	},
	{
		path: '/personal',
		element: <Personal />
	},
	{
		path: '/paint',
		element: <Create />
	},
	{
		path: '/transaction',
		element: <Transaction />
	},
	{
		path: '/message',
		element: <BuyMessage />
	},
	{
		path: '/collection',
		element: <Collection />
	},
	{
		path: '/admin',
		element: <Admin />,
		children: [
			{
				index: true,
				element: <Navigate to="/admin/user" />
			},
			{
				path: 'user',
				element: <UserManage />
			},
			{
				path: 'nft',
				element: <NFTManage />
			},
			{
				path: 'review',
				element: <ReviewNFTManage />
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
						element: <SettingManage />
					},
					{
						path: 'order',
						element: <SettingManage />
					}
				]
			},
			{
				path: 'order',
				element: <OrderManage />
			}
		]
	}
]);

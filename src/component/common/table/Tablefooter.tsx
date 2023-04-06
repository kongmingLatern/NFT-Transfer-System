import { api } from '@/api';
import React from 'react';
const Tablefooter: React.FC<any> = ({ total, data }: any) => {
	async function submit(data) {
		// 获取 id 以及 count
		const result = data.map((item) => {
			return {
				nft_id: item.nft_id,
				count: item.num
			};
		});
		const res: any = await api.post('/direct/order', {
			data: result,
			price: total,
			uid: localStorage.getItem('uid') || ''
		});

		if (res.code === 200) {
			data.map((item) => {
				removeItem(item.nft_id);
			});
		}

		console.log(res);
	}
	async function removeItem(nft_id) {
		const data1 = {
			nft_id,
			uid: localStorage.getItem('uid') || ''
		};
		const res = await api.delete('/shoppingcart', {
			data: data1
		});
		console.log(res);
	}
	return (
		<div>
			<div className="mr-6 w-56 h-24 float-right rounded-lg justify-between">
				<div className="text-lg">
					总价:{' '}
					<label className="text-2xl text-red-500 font-bold">
						{'￥' + total}
					</label>
				</div>
				<div className="w-auto float-right mt-6">
					<button
						className="btn btn-secondary w-36"
						onClick={() => submit(data)}
					>
						提交
					</button>
				</div>
			</div>
		</div>
	);
};
export default Tablefooter;

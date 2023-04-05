import React, { useEffect, useState } from 'react';
import { Button, Checkbox } from '@chakra-ui/react';
const Tableitem: React.FC<any> = (props: any) => {
	const {
		num,
		shopping_id,
		price,
		checkItems,
		status,
		nft_img,
		nft_desc,
		nft_name,
		owner_name,
		lower_bid,
		high_bid
	} = props.data;

	let [total, setTotal] = useState(price);
	const [count, setCount] = useState(num);

	useEffect(() => {
		if (count === num) {
			return;
		} else {
			if (count > num) {
				total -= lower_bid;
			} else {
				total += lower_bid;
			}
			setTotal(total);
			setCount(num);
		}
	}, [num]);

	return (
		<>
			<td>
				{status === 3 ? null : (
					<Checkbox
						defaultChecked
						isChecked={checkItems && !checkItems?.includes(shopping_id)}
						onChange={(e) => props.changeChecked(shopping_id)}
					/>
				)}
			</td>
			<td className="text-center">{owner_name}</td>
			<td>
				<div className="flex items-center space-x-3">
					<div className="avatar">
						<div className="mask mask-squircle w-12 h-12">
							<img src={nft_img} alt="Shoppingcart Img" />
						</div>
					</div>
					<div>
						<div className="font-bold">{nft_name}</div>
						{status === 0 ? (
							<div className="badge badge-info">审核</div>
						) : status === 1 ? (
							<div className="badge badge-success">直售</div>
						) : status === 2 ? (
							<div className="badge badge-error text-white font-bold">拍卖</div>
						) : status === 3 ? (
							<div className="badge badge-danger">已售</div>
						) : null}
					</div>

					<div>
						{total >= high_bid ? (
							<div className="badge badge-warning ">
								<span className="font-bold">￥{high_bid}</span>
								<span>&nbsp;已达一口价</span>
							</div>
						) : // 显示竞拍价格

						status === 2 ? (
							<div className="badge badge-success ">
								<span>当前竞拍价&nbsp;</span>
								<span className="font-bold">￥{total}</span>
							</div>
						) : null}
					</div>

					<div>
						{/* 如果是竞拍，就显示一口价 */}
						{status === 2 ? (
							<div className="badge badge-error text-white">
								<span>&nbsp;一口价</span>
								<span className="font-bold">￥{high_bid}</span>
							</div>
						) : null}
					</div>
				</div>
			</td>
			<td className="h-[80px] leading-[45px] inline-block w-[100%] overflow-hidden text-ellipsis ">
				{/* <span className="h-[80px] flex items-center  overflow-hidden text-ellipsis"> */}
				{nft_desc}
				{/* </span> */}
			</td>
			<td className="w-10">
				<label>
					￥{status === 2 ? <span>{`${lower_bid}(最低加价)`}</span> : price}
				</label>
			</td>
			<td className="w-10">
				<Button onClick={() => props.subcount(shopping_id)}>-</Button>
				<label className="mx-3" htmlFor="">
					{num}
				</label>
				<Button onClick={() => props.addcount(shopping_id)}>+</Button>
			</td>
		</>
	);
};
export default Tableitem;

import React, { useState } from 'react';
import { Button, Checkbox } from '@chakra-ui/react';
import Image from '@/assets/gd1.png';
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
		owner_username
	} = props.data;

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
			<td className="text-center">{owner_username}</td>
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
				</div>
			</td>
			<td className="h-[80px] leading-[45px] inline-block w-[100%] overflow-hidden text-ellipsis ">
				{/* <span className="h-[80px] flex items-center  overflow-hidden text-ellipsis"> */}
				{nft_desc}
				{/* </span> */}
			</td>
			<td className="w-10">
				<label>￥{price}</label>
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

import React, { useState } from 'react';
import { Button, Checkbox } from '@chakra-ui/react';
import Image from '@/assets/gd1.png';
const Tableitem: React.FC<any> = (props: any) => {
	const { num, shopping_id, price, checkItems } = props.data;

	return (
		<>
			<td>
				<Checkbox
					defaultChecked
					isChecked={checkItems && !checkItems?.includes(shopping_id)}
					onChange={(e) => props.changeChecked(shopping_id)}
				/>
			</td>
			<td className="text-center">hhhh</td>
			<td>
				<div className="flex items-center space-x-3">
					<div className="avatar">
						<div className="mask mask-squircle w-12 h-12">
							<img src={Image} alt="Avatar Tailwind CSS Component" />
						</div>
					</div>
					<div>
						<div className="font-bold">Hart Hagerty</div>
						<div className="text-sm opacity-50">United States</div>
					</div>
				</div>
			</td>
			<td className="h-[80px] leading-[45px] inline-block w-[20vw] overflow-hidden text-ellipsis ">
				{/* <span className="h-[80px] flex items-center  overflow-hidden text-ellipsis"> */}
				Desktop Support Technician Desktop Support Technician Desktop Support
				Technician Desktop Support Technician Desktop Support Technician Desktop
				Support Technician Desktop Support Technician Desktop Support Technician
				Desktop Support Technician Desktop Support Technician Desktop Support
				Technician
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

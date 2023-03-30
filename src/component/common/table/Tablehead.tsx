import { Checkbox } from '@chakra-ui/react';

export default function Tablehead({ len, checkItems, changeAllChecked }) {
	return (
		<>
			<th>
				选择
				{/* <Checkbox
					defaultChecked
					isChecked={checkItems && checkItems?.length === len}
					onChange={(e) => changeAllChecked()}
				/> */}
			</th>
			<th>作者</th>
			<th>商品</th>
			<th>详细</th>
			<th>单价</th>
			<th>数量</th>
		</>
	);
}

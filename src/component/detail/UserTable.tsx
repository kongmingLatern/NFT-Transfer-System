import Empty from '../empty/Empty';

export default function UserTable({ transaction }) {
	return (
		<table className="table table-zebra w-full">
			{/* head */}
			<thead>
				<tr>
					<th>序号</th>
					<th>买家</th>
					<th>竞标价格</th>
					<th>竞标时间</th>
				</tr>
			</thead>
			<tbody>
				{transaction.length === 0 ? (
					// 显示暂无数据
					<tr>
						<td colSpan={4} className="text-center">
							<Empty width={'100'} height={'80'} />
							暂无拍卖数据
						</td>
					</tr>
				) : (
					transaction.map((item, index) => {
						return (
							<tr>
								<td>{index + 1}</td>
								{Object.keys(item).map((it) => {
									if (it === 'price') {
										return (
											<td className="font-bold text-red-600 text-lg">
												{item[it]} CS
											</td>
										);
									} else if (it === 'pay_date') {
										// 格式化
										const date = new Date(item[it]);
										const year = date.getFullYear();
										const month =
											date.getMonth() + 1 > 10
												? date.getMonth() + 1
												: '0' + (date.getMonth() + 1);
										const day =
											date.getDate() > 10
												? date.getDate() + 1
												: '0' + (date.getDate() + 1);
										return (
											<td>
												{year}-{month}-{day}
											</td>
										);
									}
									return <td>{item[it]}</td>;
								})}
							</tr>
						);
					})
				)}
				{/* row 2 */}
				{/* <tr className="active font-bold">
          <th>2</th>
          <td>Hart Hagerty</td>
          <td>Desktop Support Technician</td>
          <td>Purple</td>
          <td>100 CS</td>
        </tr> */}
				{/* row 3 */}
			</tbody>
		</table>
	);
}

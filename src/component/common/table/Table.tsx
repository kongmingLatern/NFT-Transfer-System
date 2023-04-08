import {
	TableContainer,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Table,
	TableCaption
} from '@chakra-ui/react';
import { getColumnIndexByKey } from '@/utils';
import { Fragment, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { log } from 'console';
import Empty from '@/component/empty/Empty';
import Spin from '../spin/Spin';

interface TypeProps {
	dataSource: any[];
	columns: any;
	loading: boolean;
	loadingRender: any;
	itemsPerPage: number;
}

export default function AdminTable({
	dataSource,
	columns,
	loading,
	loadingRender,
	itemsPerPage = 10
}: Partial<TypeProps>) {
	const [itemOffset, setItemOffset] = useState(0);

	const endOffset = itemOffset + itemsPerPage;
	const currentItems = dataSource.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(dataSource.length / itemsPerPage);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % dataSource.length;
		setItemOffset(newOffset);
	};
	return (
		<>
			<TableContainer className="border w-[80vw] overflow-x-scroll">
				<Table size={'md'} variant="striped" colorScheme="blackAlpha">
					<TableCaption>
						<ReactPaginate
							breakLabel="..."
							nextLabel="next >"
							onPageChange={handlePageClick}
							pageRangeDisplayed={5}
							pageClassName={'btn'}
							activeClassName={'btn-active'}
							breakClassName={'btn'}
							pageCount={pageCount}
							previousLabel="< previous"
							previousClassName='btn btn-outline"'
							nextClassName='btn btn-outline"'
							renderOnZeroPageCount={null}
						/>
					</TableCaption>
					<Thead>
						<ShowTableTitle columns={columns} />
					</Thead>
					<Tbody>
						<Spin loading={loading}>
							<ShowData dataSource={currentItems} columns={columns} />
						</Spin>
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
}
function ShowTableTitle({ columns }: any) {
	return (
		<Tr>
			{columns.map((item) => {
				if (item.type === 'number') {
					return (
						<Th isNumeric key={item.key}>
							{item.title}
						</Th>
					);
				} else {
					return <Th key={item.key}>{item.title}</Th>;
				}
			})}
		</Tr>
	);
}

function ShowData({ dataSource, columns }) {
	return dataSource.length === 0 ? (
		<EmptyComponent columns={columns} />
	) : (
		dataSource.map((item, index) => {
			// 元素个数为0时，证明没有数据，显示没有数据
			return (
				<Tr key={index}>
					{columns.map((column, index) => {
						if (column.type === 'number') {
							return (
								<Td isNumeric key={column.key}>
									{column.render
										? column.render(item[column.key], item)
										: item[column.key]}
								</Td>
							);
						} else {
							return (
								<Td key={column.key}>
									{column.render
										? column.render(item[column.key], item)
										: item[column.key]}
								</Td>
							);
						}
					})}
				</Tr>
			);
		})
	);
}
export function EmptyComponent({ columns }: any) {
	return (
		<Tr key={'Empty'}>
			<Td
				key={columns}
				colSpan={columns.length}
				style={{ textAlign: 'center' }}
			>
				<div>
					<Empty width={100} height={80} />
					<p className="mt-2">没有数据</p>
				</div>
			</Td>
		</Tr>
	);
}

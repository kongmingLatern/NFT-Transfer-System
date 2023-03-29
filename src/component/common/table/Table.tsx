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

interface TypeProps {
	dataSource: any[];
	columns: any;
	itemsPerPage: number;
}

export default function AdminTable({
	dataSource,
	columns,
	itemsPerPage = 10
}: TypeProps) {
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
			<TableContainer className="border">
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
						<ShowData dataSource={currentItems} columns={columns} />
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
	return dataSource.map((item) => {
		return (
			<Tr key={item.key}>
				{Object.keys(item).map((key, index) => {
					return (
						<Fragment key={key + index}>
							{key !== 'key' && (
								<Td>
									{columns[getColumnIndexByKey(columns, key)]?.render
										? columns[getColumnIndexByKey(columns, key)].render(
												item[key],
												item
										  )
										: item[key]}
								</Td>
							)}
						</Fragment>
					);
				})}
			</Tr>
		);
	});
}

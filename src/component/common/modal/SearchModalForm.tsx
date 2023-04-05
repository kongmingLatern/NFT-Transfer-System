import SearchInput from '@/component/home/SearchInput';
import {
	TableContainer,
	TableCaption,
	Button,
	Table as TableUI,
	Thead,
	Tr,
	Th,
	Tbody,
	Td
} from '@chakra-ui/react';
import Modal from './Modal';
import { useEffect, useState } from 'react';
import Empty from '@/component/empty/Empty';
import { EmptyComponent } from '../table/Table';

interface SearchModalFormType {
	placeholder: string;
	search: (...args: any) => any;
	result: any;
	columns: any;
	tableTitle: Array<Record<string, any>>;
}

export function SearchModalForm({
	placeholder,
	search,
	result,
	tableTitle
}: Partial<SearchModalFormType>) {
	return (
		<Modal
			open={(onOpen) => {
				return (
					<div className="flex justify-end mb-2 pr-4 mt-2">
						<SearchInput
							className={'w-[300px]'}
							placeholder={placeholder || '请输入要查询的订单编号'}
							search={search}
							onOpen={onOpen}
						/>
					</div>
				);
			}}
			title="查询结果"
			bodyContent={(onClose) => {
				return (
					<TableContainer>
						<TableUI variant="simple">
							<TableCaption>
								<Button onClick={() => onClose()}>关闭</Button>
							</TableCaption>
							<Thead>
								<Tr>
									{tableTitle.map((item, index) => {
										if (item?.type === 'number') {
											return (
												<Th key={index} isNumeric>
													{item.title}
												</Th>
											);
										} else {
											return <Th key={index}>{item.title}</Th>;
										}
									})}
								</Tr>
							</Thead>
							<Tbody>
								{result?.length === 0 ? (
									<EmptyComponent columns={tableTitle} />
								) : (
									<Tr>
										{result &&
											Object.keys(result).map((item, index) => (
												<Td key={index}>{result[item]}</Td>
											))}
									</Tr>
								)}
							</Tbody>
						</TableUI>
					</TableContainer>
				);
			}}
		/>
	);
}

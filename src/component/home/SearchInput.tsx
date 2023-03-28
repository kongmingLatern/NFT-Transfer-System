import { Icon } from '@iconify-icon/react';
import classNames from 'classnames';

export default function SearchInput({ search, className }) {
	return (
		<div className={classNames('relative', className)}>
			<input
				type="text"
				placeholder="请输入要查找的物品"
				className={classNames(
					'input',
					'input-bordered',
					'text-black',
					className
				)}
				onKeyDown={(e) => {
					return e.code === 'Enter' ? search(e.target.value) : null;
				}}
			/>
			<Icon
				icon="ic:outline-search"
				className="absolute right-2 top-[20%] z-1 rounded-lg"
				style={{ color: '#ccc' }}
				width="30"
				height="30"
			/>
		</div>
	);
}

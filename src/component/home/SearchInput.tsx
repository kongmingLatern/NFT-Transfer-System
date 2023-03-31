import { Icon } from '@iconify-icon/react';
import classNames from 'classnames';

export default function SearchInput({
	placeholder,
	search,
	onOpen,
	className
}: any) {
	return (
		<div className={classNames('relative', className)}>
			<input
				type="text"
				placeholder={placeholder || '请输入要查找的物品'}
				className={classNames(
					'input',
					'input-bordered',
					'text-black',
					className
				)}
				onKeyDown={(e) => {
					if (e.code === 'Enter') {
						if (onOpen) {
							return search((e.target as any).value, onOpen);
						}
						return search((e.target as any).value);
					} else {
						return null;
					}
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

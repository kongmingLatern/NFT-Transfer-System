import classNames from 'classnames';

export function TextBadge({ status, className }: any) {
	return status === 0 ? (
		<span className={classNames('badge', 'badge-accent', className)}>
			审核中
		</span>
	) : status === 1 ? (
		<span className={classNames('badge', 'badge-success', className)}>
			直售中
		</span>
	) : status === 2 ? (
		<span className={classNames('badge', 'badge-warning', className)}>
			拍卖中
		</span>
	) : (
		<span className="badge text-gray-500">下架</span>
	);
}

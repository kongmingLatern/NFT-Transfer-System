import styles from '@/assets/message.module.css';
import { Icon } from '@iconify-icon/react';
import classNames from 'classnames';

enum MessageType {
	Success = 'success',
	Error = 'error',
	Warning = 'warning',
	Info = 'info'
}

interface MessageProps {
	id: string;
	type: MessageType;
	content: string;
	onRemove?: (id: string) => void;
}

export default function Messageitem({
	onRemove,
	id,
	type,
	content
}: MessageProps) {
	function showIcon() {
		switch (type) {
			case MessageType.Success:
				return (
					<Icon
						icon="clarity:success-standard-line"
						color="green"
						width={30}
						height={30}
					/>
				);
			case MessageType.Error:
				return (
					<Icon
						icon="fluent-mdl2:error-badge"
						color="red"
						width={30}
						height={30}
					/>
				);
			case MessageType.Warning:
				return (
					<Icon
						icon="ep:warn-triangle-filled"
						color="#382800"
						width={30}
						height={30}
					/>
				);
			case MessageType.Info:
				return (
					<Icon
						icon="mdi:warning-circle-outline"
						color="#1769aa"
						width={30}
						height={30}
					/>
				);
		}
	}
	setTimeout(() => {
		onRemove?.(id);
	}, 5000);
	return (
		<>
			<div
				className={classNames(
					'alert',
					'shadow-lg',
					type ? `alert-${type}` : null,
					styles.move,
					'transition'
				)}
			>
				<span>
					{' '}
					{showIcon()} {content}
				</span>
			</div>
		</>
	);
}

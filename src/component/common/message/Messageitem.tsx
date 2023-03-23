import styles from '@/assets/message.module.css';
import { Icon } from '@iconify-icon/react';
import classNames from 'classnames';

enum MessageType {
	Success = 'success',
	Error = 'error',
	Warn = 'warn',
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
						style={{
							color: 'green'
						}}
						width={30}
						height={30}
					/>
				);
			case MessageType.Error:
				return (
					<Icon
						icon="fluent-mdl2:error-badge"
						style={{
							color: 'red'
						}}
						width={30}
						height={30}
					/>
				);
			case MessageType.Warn:
				return (
					<Icon
						icon="ep:warn-triangle-filled"
						style={{
							color: '#382800'
						}}
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
	function getColorByType() {
		switch (type) {
			case MessageType.Success:
				return 'text-black';
			case MessageType.Error:
				return 'text-[#fff]';
			case MessageType.Warn:
				return 'text-[#382800]';
			case MessageType.Info:
				return 'text-[#1769aa]';
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
					type ? (type === 'warn' ? `alert-warning` : `alert-${type}`) : '',
					getColorByType(),
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

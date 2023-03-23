import classNames from 'classnames';
import { useState } from 'react';
import Messageitem from './Messageitem';

// 消息对象类型
type Message = {
	success: (message: string) => void;
	error: (message: string) => void;
	warning: (message: string) => void;
	info: (message: string) => void;
};
// 消息的类型枚举
enum MessageType {
	Success = 'success',
	Error = 'error',
	Warning = 'warning',
	Info = 'info'
}
// 消息组件参数
type MessageProps = {
	id: string;
	type: MessageType;
	content: string;
	onRemove?: (id: string) => void;
};

// 消息对象
const message: Partial<Message> = {};

// 标识消息的ID
let incrementId = 0;
// 消息列表对象
const messageList: { [key: string]: MessageProps } = {};

// 消息列表组件
const MessageList = () => {
	const [flagId, setFlagId] = useState(0);

	const removeById = (id: string) => {
		delete messageList[id];
		setFlagId(flagId + 1);
	};

	const _message = (type: MessageType, content: string) => {
		const id = `${++incrementId}`;
		messageList[id] = {
			id: id,
			type: type,
			content: content
		};
		setFlagId(flagId + 1);
	};

	message.success = (content: string) => {
		_message(MessageType.Success, content);
	};

	message.error = (content: string) => {
		_message(MessageType.Error, content);
	};

	message.warning = (content: string) => {
		_message(MessageType.Warning, content);
	};

	message.info = (content: string) => {
		_message(MessageType.Info, content);
	};

	return (
		<div
			className={classNames(
				'fixed',
				// 'top-[2%]',
				'top-0',
				'left-[30%]',
				'z-50',
				' w-[40%]',
				// styles.moveOut
			)}
		>
			{Object.keys(messageList).map((key) => {
				const item = messageList[key];
				return (
					<Messageitem
						key={item.id}
						id={item.id}
						type={item.type}
						content={item.content}
						onRemove={removeById}
					></Messageitem>
				);
			})}
		</div>
	);
};

export { MessageList };

export default message as Message;

import React, { useRef } from 'react';
import { HighLight } from './HighLight';

interface StepType {
	order: number;
	children: any;
	step: number;
  description: string
}
// NOTE: 新手导航步骤
export function Step({ order, children, step, description = '' }: Partial<StepType>) {
	const cover = useRef(null);
	// 根据order来渲染
	return (
		<>
			{/* 需要对这个children进行高亮处理 */}
			{/* 遮罩层 */}
			{step === order && (
				<div className="cover" id={'cover' + order} ref={cover}></div>
			)}
			<HighLight cover={cover}>
				<div className="relative">
					{typeof children === 'string'
						? children
						: React.Children.map(children, (child) => {
								return React.cloneElement(child, {
									key: child,
									order
								});
						  })}
				</div>
			</HighLight>
		</>
	);
}

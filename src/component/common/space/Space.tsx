import classNames from 'classnames';
import React, { Fragment } from 'react';

interface SpaceType {
	size?: number | 'small' | 'medium' | 'large';
	direction?: 'horizontal' | 'vertical';
	align?: 'start' | 'end' | 'center' | 'around' | 'between' | 'evenly';
	children?: React.ReactNode;
	className?: string;
}

export default function Space({
	size = 20,
	direction = 'horizontal',
	align = 'start',
	children,
	className
}: SpaceType) {
	function getStyle() {
		const defaultStyle = {
			marginBottom: direction === 'vertical' ? size + 'px ' : '0 ',
			marginRight: direction === 'horizontal' ? size + 'px ' : '0 '
		};

		return {
			...defaultStyle
		};
	}

	return (
		<>
			<div
				className={classNames(
					'flex',
					direction === 'vertical' ? 'flex-col' : '',
					align ? `justify-${align}` : '',
					className
				)}
			>
				{React.Children.toArray(children).map((child, index) => {
					return (
						<Fragment key={index}>
							{React.cloneElement(child as React.ReactElement, {
								style:
									index !== React.Children.count(children) - 1 ? getStyle() : {}
							})}
						</Fragment>
					);
				})}
			</div>
		</>
	);
}

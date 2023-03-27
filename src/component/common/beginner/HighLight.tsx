import React from 'react';

export function HighLight({ cover, children }) {
	function helpers(node) {
		// 获取到children的位置
		if (!node) {
			return;
		}
		const body = document.body;
		const doc = document.documentElement;

		const targetWidth = node?.clientWidth,
			targetHeight = node?.clientHeight;
		// page size
		const pageWidth = doc?.scrollWidth,
			pageHeight = doc?.scrollHeight;
		// offset of node
		const offsetTop =
				node.getBoundingClientRect()?.top + (body?.scrollTop || doc?.scrollTop),
			offsetLeft =
				node.getBoundingClientRect()?.left +
				(body?.scrollLeft || doc?.scrollLeft);

		const top = offsetTop;
		const right = pageWidth - targetWidth - offsetLeft;
		const bottom = pageHeight - targetHeight - offsetTop;
		const left = offsetLeft;

		return {
			targetHeight,
			targetWidth,
			pageHeight,
			pageWidth,
			offsetTop,
			offsetLeft,
			top,
			right,
			bottom,
			left
		};
	}
	function addStyles(node, { targetHeight, targetWidth, offsetLeft, top }) {
		if (!node) {
			return;
		}
		node.style.width = targetWidth + 'px';
		node.style.height = targetHeight + 'px';
		node.style.top = top + 'px';
		node.style.left = offsetLeft + 'px';

		const root: any = document.querySelector('#root');
		// 如果 top 大于 当前页面高度，页面就滚动到指定位置
		if (top > window.innerHeight) {
			root.style.transition = 'all .6s';
			root.style.transform = `translateY(-${top}px)`;
		}

		root.style.position = 'fixed';
		root.style.inset = 0;
		root.style.zIndex = 1001;
		node.style.display = 'block';

		// 找到节点 root
	}
	const renderChildren = () => {
		return React.Children.map(children, (child, index) => {
			return React.cloneElement(child, {
				ref: (node) => {
					if (index !== 0 || !node) {
						return;
					}
					const positionInfo = helpers(node);
					const coverNode = cover.current;
					addStyles(coverNode, positionInfo);
				},
				key: child + index
			});
		});
	};
	return (
		<>
			{/* 高亮显示 children   */}
			{renderChildren()}
		</>
	);
}

import { getChildrenOrderByProps, isLegalSortArray } from '@/utils';
import React, { Fragment, useMemo, useState } from 'react';
import Space from '../space/Space';
import { Confirm } from './Confirm';
import { Step } from './Step';
import './style/beginner.css';

interface BeginnerType {
	type: 'remove' | 'origin';
	children: any;
	render: (
		step: number,
		targetCover: Element & {
			style: Record<string, any>;
		},
		setStep: React.Dispatch<any>,
		onSkip: () => void
	) => void;
	isSkip: boolean;
}

// NOTE: 新手导航
function Beginner({
	type = 'remove',
	children,
	render,
	isSkip = false
}: Partial<BeginnerType>) {
	const orderList = useMemo(
		() => getChildrenOrderByProps(children),
		[children]
	);
	const [currentStep, setCurrentStep] = useState(orderList[0]);

	function removeCover(currentStep: number) {
		const cover: Element & {
			style: Record<string, any>;
		} = document.querySelector(`#cover${currentStep}`);
		const root: any = document.querySelector(`#root`);
		console.log('removeRoot', root);
		if (cover) {
			setCurrentStep(currentStep + 1);
			cover.style.display = 'none';
			root.style = '';
		}
	}

	function skip() {
		const cover: Element & {
			style: Record<string, any>;
		} = document.querySelector(`#cover${currentStep}`);
		const confirm: any = document.querySelector(`#confirm`);
		if (cover) {
			cover.style.display = 'none';
			confirm.style.display = 'none';
			// 设置到最大值
			setCurrentStep(Math.max);
		}
	}

	// 根据 orderList 的顺序进行渲染
	if (!isLegalSortArray(orderList)) {
		console.warn('order 顺序不合法，各个步骤之间的差值只为1');
		return;
	} else if (currentStep > orderList[orderList.length - 1]) {
		console.warn('已经是最后一步了');
		return type === 'remove' ? null : children;
	}

	return isSkip
		? // 渲染所有元素即可
		  children
		: React.Children.map(children, (child) => {
				// NOTE: 如果当前的 order 等于当前的步骤，就渲染出来

				// NOTE: 含有 order 属性
				if (child?.props?.order) {
					// NOTE: 当前执行的步骤为当前的 order
					if (child?.props?.order === currentStep) {
						console.log('child', child);
						return (
							<Fragment key={child}>
								{React.cloneElement(
									child,
									{
										order: currentStep,
										step: currentStep
									},
									<>
										{child}
										{render ? (
											render(
												currentStep,
												document.querySelector(`#cover${currentStep}`),
												setCurrentStep,
												skip
											)
										) : (
											<div
												className="absolute bottom-[-5] right-16 z-[10000] bg-blue-400 text-white w-[300px] h-[200px] rounded-lg"
												id="confirm"
											>
												<Confirm
													currentStep={currentStep}
													description={child.props.description}
													isSkip={false}
													render={() => (
														<Space size={10}>
															<button
																className="btn"
																onClick={() => removeCover(currentStep)}
															>
																下一步
															</button>
															<button className="btn" onClick={() => skip()}>
																跳过
															</button>
														</Space>
													)}
												/>
											</div>
										)}
									</>
								)}
							</Fragment>
						);
					} else {
						return type === 'remove' ? null : child;
					}
				} else {
					return child;
				}
		  });
}

Beginner.Step = Step;

export default Beginner;

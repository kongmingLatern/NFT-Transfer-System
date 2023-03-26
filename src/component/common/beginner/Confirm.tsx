export function Confirm({
	currentStep,
	isSkip = false,
	render,
	description = ''
}) {
	// 小型模态框
	return (
		<div className="flex flex-col justify-center items-center h-full">
			{isSkip ? (
				<div className="text-2xl">
					<div className="text-2xl font-bold text-center">确认跳过?</div>
					<div className="text-red-500 font-bold">跳过后将无法再次查看</div>
				</div>
			) : (
				<>
					<div className="text-2xl">{currentStep && `Step${currentStep}`}</div>
					<p>{description}</p>
				</>
			)}
			<div className="flex justify-center items-center w-full h-1/3">
				<div className="w-1/2 h-full flex justify-center items-center  cursor-pointer">
					{render && render()}
				</div>
			</div>
		</div>
	);
}

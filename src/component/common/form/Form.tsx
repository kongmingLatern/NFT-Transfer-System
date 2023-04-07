import { Input } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface FormType {
	formItem: Array<Record<string, any>>;
	render?: () => JSX.Element | Element;
	footer?: (fn?) => JSX.Element;
	onSubmit?: (fn?) => any;
	allType?: Array<any>;
	nft_type?: Array<any>;
}

export default function Form({
	formItem,
	footer,
	render,
	onSubmit,
	allType,
	nft_type
}: Partial<FormType>) {
	const { handleSubmit, register } = useForm();

	return (
		<form onSubmit={handleSubmit((data) => onSubmit(data))}>
			{/* NOTE: render FormItem */}
			{formItem.map((item) =>
				item.type === 'file' ? (
					<div className="flex items-center">
						<span className="whitespace-nowrap">{item.label}:</span>
						<Input
							{...register(item.name)}
							height={50}
							key={item.name}
							type={item.type}
							placeholder={item.label}
							className="file-input file-input-bordered  w-full"
							value={item?.value}
							onChange={(e) => {
								if (item.onChange) {
									// 修改 item.value 的值
									item.onChange(e.target.value);
								}
							}}
						/>
					</div>
				) : item.type === 'select' ? (
					<div className="flex items-center w-auto">
						<span className="whitespace-nowrap">{item.label}:</span>
						<select
							{...register(item.name)}
							height={50}
							key={item.name}
							type={item.type}
							placeholder={item.label}
							className=" text-xl rounded-md p-2.5 text-center border-2 "
							value={item?.value}
							onChange={(e) => {
								console.log(e.target.value);
								if (item.onChange) {
									// 修改 item.value 的值
									item.onChange(e.target.value);
								}
							}}
						>
							<option key="-1" value="-1">
								--请选择--
							</option>

							{item.name !== 'transfer_type'
								? allType.map((item) => {
										return (
											<option key={item.type} value={item.type}>
												{item.type}
											</option>
										);
								  })
								: nft_type.map((item) => {
										return (
											<option key={item.value} value={item.value}>
												{item.name}
											</option>
										);
								  })}
						</select>
					</div>
				) : (
					<div className="flex items-center">
						<span className="whitespace-nowrap">{item.label}:</span>
						<Input
							{...register(item.name)}
							height={50}
							key={item.name}
							type={item.type}
							disabled={item.disabled ? item.disabled : false}
							placeholder={item.label}
							value={item?.value}
							onChange={(e) => {
								if (item.onChange) {
									// 修改 item.value 的值
									item.onChange(e.target.value);
								}
							}}
						/>
					</div>
				)
			)}

			{render ? render() : null}

			{/* NOTE: render footer */}
			{footer ? footer(handleSubmit) : <Input type={'submit'} value="提交" />}
		</form>
	);
}

import { Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

interface FormType {
	formItem: Array<Record<string, any>>;
	footer?: () => JSX.Element;
}

export default function Form({ formItem, footer }: Partial<FormType>) {
	const { handleSubmit, register } = useForm();
	return (
		<form onSubmit={handleSubmit((data) => console.log(data))}>
			{/* NOTE: render FormItem */}
			{formItem.map((item) =>
				item.type === 'file' ? (
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
				) : (
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
				)
			)}

			{/* NOTE: render footer */}
			{footer ? footer() : <Input type={'submit'} value="提交" />}
		</form>
	);
}

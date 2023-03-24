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
						height={50}
						key={item.name}
						type={item.type}
						placeholder={item.label}
						{...register(item.name)}
						className="file-input file-input-bordered  w-full"
					/>
				) : (
					<Input
						height={50}
						key={item.name}
						type={item.type}
						placeholder={item.label}
						{...register(item.name)}
					/>
				)
			)}

			{/* NOTE: render footer */}
			{footer ? footer() : <Input type={'submit'} value="提交" />}
		</form>
	);
}

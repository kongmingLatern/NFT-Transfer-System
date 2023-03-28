import classNames from 'classnames';

type IProps = {
	title: string;
	className?: string;
};

const Title = ({ title, className }: IProps) => {
	return (
		<h1 className={classNames('mb-2', className)}>
			<span className="text-2xl font-bold tracking-wide font-['Poppins'] pl-3">
				{title}
			</span>
		</h1>
	);
};

export default Title;

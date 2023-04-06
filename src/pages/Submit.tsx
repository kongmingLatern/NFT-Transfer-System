import Header from '@/component/common/Header';
import Title from '@/component/common/Title';
import CommitCard from '@/views/submit/Card';

export default function Submit() {
	return (
		<>
			<Header />
			<Title title="确认订单" className="text-center mt-4 mb-[-5rem]" />
			<CommitCard />
		</>
	);
}

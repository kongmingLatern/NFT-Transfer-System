import Divider from '@/component/common/Divider';
import Header from '@/component/common/Header';
import Table from '@/views/transaction/Table';


export default function Transaction() {
	return (
		<>
			<Header />
			<div className="px-4">
				<Divider />
				<Table />
			</div>
		</>
	);
}

import Header from '@/component/common/Header';
import BuyTableList from '@/component/message/BuyTableList';
import Tabs from '@/component/common/Tabs';
import BuyTableListResponse from '@/component/message/BuyTableListResponse';
export default function BuyMessage() {
	const tabList = ['求购', '响应'];
	const tabPaneList = [<BuyTableList />, <BuyTableListResponse />];
	return (
		<>
			<Header />
			<Tabs tabList={tabList} tabPanelList={tabPaneList} />
		</>
	);
}

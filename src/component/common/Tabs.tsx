import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';

interface TabType {
	tabList: string[];
	tabPanelList: any[];
	className?: string;
}

export default function TabComponent({
	tabList,
	tabPanelList,
	className
}: Partial<TabType>) {
	return (
		<>
			<Tabs className={className}>
				<TabList justifyContent={'center'}>
					{tabList.map((item, index) => (
						<Tab key={index}>{item}</Tab>
					))}
				</TabList>

				<TabPanels>
					{tabPanelList.map((item, index) => (
						<TabPanel key={index}>{item}</TabPanel>
					))}
				</TabPanels>
			</Tabs>
		</>
	);
}

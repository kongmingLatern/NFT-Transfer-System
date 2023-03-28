import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';

interface TabType {
	tabList: string[];
	tabPanelList: any[];
	tabListClassName: string;
	className?: string;
}

export default function TabComponent({
	tabList,
	tabPanelList,
	tabListClassName,
	className
}: Partial<TabType>) {
	return (
		<>
			<Tabs className={className}>
				<TabList className={tabListClassName}>
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

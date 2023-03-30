import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';

interface TabType {
	tabList: string[];
	tabPanelList: any[];
	className?: string;
	tabPaneListJustify?: 'center' | 'end' | 'start';
}

export default function TabComponent({
	tabList,
	tabPanelList,
	className,
	tabPaneListJustify = 'start'
}: Partial<TabType>) {
	return (
		<>
			<Tabs className={className}>
				<TabList justifyContent={'center'}>
					{tabList.map((item, index) => (
						<Tab key={index}>{item}</Tab>
					))}
				</TabList>

				<TabPanels className="flex" justifyContent={tabPaneListJustify}>
					{tabPanelList.map((item, index) => (
						<TabPanel key={index}>{item}</TabPanel>
					))}
				</TabPanels>
			</Tabs>
		</>
	);
}

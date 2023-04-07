import { combineDate } from '@/utils';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import { useEffect, useState } from 'react';

interface EchartsProps {
	type: 'line' | 'bar' | 'pie' | 'scatter';
	data: number[];
	date: Date;
}

export default function Echarts({ type, data, date }: Partial<EchartsProps>) {
	const [options, setOptions] = useState<EChartsOption>({
		xAxis: {
			type: 'category',
			data: combineDate(new Date().getMonth() + 1, new Date().getDate())
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data,
				type,
				smooth: true
			}
		],
		tooltip: {
			trigger: 'axis'
		}
	});

	useEffect(() => {
		setOptions({
			...options,
			series: [{ data, type, smooth: true }]
		});
	}, [type, data]);

	return <ReactECharts option={options}></ReactECharts>;
}

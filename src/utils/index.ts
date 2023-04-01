import { Step } from '@/component/common/beginner/Step';
import { columnsType } from '@/views/admin/Main';

export function combineDate(month: number, day: number) {
	const result = [];
	for (let i = 0; i < 7; i++) {
		const date = new Date();
		date.setMonth(month - 1);
		date.setDate(day - 3 + i);
		result.push(`${date.getMonth() + 1}月${date.getDate()}日`);
	}
	return result;
}

export function timestampToTime(timestamp) {
	// 时间戳为10位需*1000，时间戳为13位不需乘1000
	var date = new Date(timestamp * 1000);
	var year = date.getFullYear();
	var month =
		date.getMonth() + 1 < 10
			? '0' + (date.getMonth() + 1)
			: date.getMonth() + 1;
	var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	var hour = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	return {
		year,
		month,
		day,
		hour,
		minutes,
		seconds
	};
}
export function getCurrentDate(target) {
	return timestampToTime(target - new Date().getTime());
}

export function getColumnIndexByKey(columns: columnsType[], key: string) {
	let index = -1;
	columns.forEach((item, i) => {
		if (item.key === key) {
			index = i;
		}
	});
	return index;
}

export function isLegalSortArray(arr: Array<number>) {
	const len = arr.length;
	for (let i = 0; i < len - 1; i++) {
		if (arr[i + 1] - arr[i] !== 1) {
			return false;
		}
	}
	return true;
}

export function getChildrenOrderByProps(children: any) {
	const orderList = [];
	console.log('children', children);
	if (!children) return orderList;
	else if (isObject(children) && children.type === Step) {
		orderList.push(children.props.order);
	} else if (Array.isArray(children)) {
		children.map((item) => {
			if (item.type === Step) {
				orderList.push(item.props.order);
			}
		});
	}
	return orderList.sort();
}
export function isObject(obj: any) {
	return obj !== null && typeof obj === 'object';
}

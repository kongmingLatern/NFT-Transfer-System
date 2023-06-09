import { columnsType } from '@/views/admin/Main';
import { Step } from '@/component/common/beginner/Step';

export function combineDate(month: number, day: number) {
  const result = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setMonth(month - 1);
    date.setDate(day - 1 + i);
    result.push(`${date.getMonth() + 1}月${date.getDate()}日`);
  }
  return result;
}

export function timestampToTime(timestamp) {
  // 时间戳为10位需*1000，时间戳为13位不需乘1000
  // 判断时间戳是否是10位
  if (timestamp.toString().length === 10) {
    timestamp = timestamp * 1000;
  }
  let date = new Date(timestamp);
  let year = date.getFullYear();
  let month =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

  // 连接年月日时分秒
  let result = `${year}年${month}月${day}日 ${hour}:${minutes}:${seconds}`;

  return {
    year,
    month,
    day,
    hour,
    minutes,
    seconds,
    result
  };
}
export function lastTime(diffTime) {
  const time = diffTime > 0 ? diffTime / 1000 : 0
  const day = (time / (24 * 60 * 60)) ^ 0
  const hour = ((time / (60 * 60)) % 24) ^ 0
  const minutes = ((time / 60) % 60) ^ 0
  const seconds = 60 - (diffTime % 60) ^ 0
  return {
    day,
    hour,
    minutes,
    seconds
  }
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

export function timeTransformation(datestr: string) {
  const dateObj = new Date(datestr);
  const year = dateObj.getUTCFullYear();
  const month = ('0' + (dateObj.getUTCMonth() + 1)).slice(-2)
  const day = ('0' + dateObj.getUTCDate()).slice(-2);

  const formattedDate = `${year}-${month}-${day}-`
}

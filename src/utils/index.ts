import { Step } from '@/component/common/beginner/Step'
import { columnsType } from '@/views/admin/Main'

export function combineDate(month: number, day: number) {
  const result = []
  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setMonth(month - 1)
    date.setDate(day - 3 + i)
    result.push(
      `${date.getMonth() + 1}月${date.getDate()}日`
    )
  }
  return result
}

export function getCurrentDate() {
  const time = new Date()
  const year = time.getFullYear() //  返回的是年份
  const month = time.getMonth() + 1 //  返回的月份上个月的月份，记得+1才是当月
  const dates = time.getDate() //  返回的是几号
  const hour = time.getHours()
  const minutes = time.getMinutes()
  const todaytime =
    year +
    '年' +
    month +
    '月' +
    dates +
    '日' +
    ' ' +
    hour +
    ':' +
    minutes
  return todaytime
}

export function getColumnIndexByKey(
  columns: columnsType[],
  key: string
) {
  let index = -1
  columns.forEach((item, i) => {
    if (item.key === key) {
      index = i
    }
  })
  return index
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
  if (!children) return orderList;
  else if (isObject(children) && children.type === Step) {
    orderList.push(children.props.order);
  } else {
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

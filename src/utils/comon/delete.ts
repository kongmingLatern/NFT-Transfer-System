import { api } from '@/api/index'
import message from '@/component/common/message/Message';

async function deleteHandle(path, data) {
  console.log(path, data);
  const res: any = await api.delete(path, {
    params: {
      ...data
    }
  })
  console.log(res);

  if (res.code === 200) {
    message.success('删除成功')
    window.location.reload()
    return true
  }
  else return false
}
export { deleteHandle }

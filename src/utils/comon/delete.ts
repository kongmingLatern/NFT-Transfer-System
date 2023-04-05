import {api} from '@/api/index'

async function deleteHandle(path,data) {
    console.log(path,data);
    const res: any = await api.post(path,{
        ...data
    })
    if(res.code === 200) return true
    else return false
}
export { deleteHandle}  
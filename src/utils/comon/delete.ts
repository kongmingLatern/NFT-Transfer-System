import {api} from '@/api/index'

async function deleteHandle(path,data) {
    console.log(path,data);
    const res: any = await api.delete(path,{
        params:{
            ...data
        }
    })
    console.log(res);
    
    if(res.code === 200) return true
    else return false
}
export { deleteHandle}  
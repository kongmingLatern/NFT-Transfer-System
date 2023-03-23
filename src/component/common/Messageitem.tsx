import classNames from "classnames"

enum MessageType{
    Success='success',
    Error='error',
    Warning='warning',
    Info='info'
}

interface MessageProps{
    id:string,
    type:MessageType,
    content:string,
    onRemove?:(id:string)=>void
}

export default function Messageitem(props:MessageProps) {
    setTimeout(()=>{
        props.onRemove?.(props.id)
    },1000)
  return (
    <>
      <div className={classNames(
        "alert","shadow-lg",
        
      )}>{props.content}</div>
    </>
  )
}

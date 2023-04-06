
export default function UserTable({transaction}) {
  return (
    <table className="table table-zebra w-full">
      {/* head */}
      <thead>
        <tr>
          <th>名字</th>
          <th>描述</th>
          <th>卖家</th>
          <th>价格</th>
        </tr>
      </thead>
      <tbody>
        {
          transaction.map((item)=>{
            return(
              <tr>{
                Object.keys(item).map((it)=>{
                  return(
                    <th>{item[it]}</th>
                  )
                })
                }</tr>
                 )
          })
        }
        {/* row 2 */}
        {/* <tr className="active font-bold">
          <th>2</th>
          <td>Hart Hagerty</td>
          <td>Desktop Support Technician</td>
          <td>Purple</td>
          <td>100 CS</td>
        </tr> */}
        {/* row 3 */}

      </tbody>
    </table>
  )
}

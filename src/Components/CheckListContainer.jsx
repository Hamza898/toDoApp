import React from 'react'

function CheckListContainer(allTasks) {
  return (
    <div><h4>Title: {allTasks.title} </h4>
    {allTasks.checkList.map((list,index)=>(
        <div><input key={index} type='checkbox'/> -{list}</div>
    ))}</div>
  )
}

export default CheckListContainer
import React, { useState } from "react";

function Checklist({ setCheckList, checkList = [] }) {
  const [task, setTask] = useState("");
  const [editedTask,setEditedTask]=useState()
  const [isEditActive, setisEditActive] = useState(false);
  const [editIndex, setEditIndex] = useState();
  const onChangeHandle = (e) => {
    setTask(e.target.value);
  };
  const handleAddTask = () => {
    if (task.trim() !== "" && task !== "") {
      setCheckList((prev) => [...prev, {'task':task.trim(),'status':false}]);
      setTask("");
    }
  };
  const handleEdit = (index) => {
    setEditedTask(checkList[index])
    setisEditActive(true);
    setEditIndex(index);
  };
  const handleAdd = () => {
    const arr =checkList
    arr[editIndex]=editedTask
    setCheckList(arr)
    setisEditActive(false)
    setTask('')
  };
  return (
    <>
      <div>
        <input
          type="text"
          value={!isEditActive ? task : ""}
          className="w-1/2 h-10 p-4 border border-gray-300 rounded-lg"
          placeholder="Enter your task"
          onChange={onChangeHandle}
        />
        <button
          onClick={handleAddTask}
          className="bg-pink-900 text-white p-2 rounded-md m-2 mt-5"
        >
          Add Task
        </button>
      </div>
      <div className="mt-4 mb-4">
        <label className="text-3xl bg-pink-100 p-2 rounded-md ">
          Your Checklist
        </label>
      </div>
      <div className="h-3/4 bg-pink-900 overflow-auto rounded-lg">
        {checkList.map((task, index) => (
          <div
            className="text-2xl m-2 p-4 flex flex-row justify-between bg-pink-950 rounded-lg text-white "
            key={index}
          >
            {isEditActive && editIndex === index ? (
              <>
                <input className='w-1/2 h-10 p-4 border border-gray-300 rounded-lg'
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                ></input>
                <button
                  onClick={() => handleAdd(index)}
                  className="bg-pink-100 text-black shadow-md hover:bg-pink-400 p-2 rounded-lg text-sm"
                >
                  Add
                </button>
              </>
            ) : (
              <>
                <span>- {task.task}</span>
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-pink-100 text-black shadow-md hover:bg-pink-400 p-2 rounded-lg text-sm"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Checklist;

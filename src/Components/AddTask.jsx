import React, { useState, useEffect } from "react";
import Checklist from "./Checklist";

function AddTask({
  setAllTasks,
  setIsCreateNewActive,
  isEditActive,
  setIsEditActive,
  editTitle,
  editDes,
  taskType,
  allTasks,
  setTaskType,
  indexForEdit,
}) {
  const [title, setTitle] = useState(isEditActive ? editTitle : "");
  const [description, setDescription] = useState(isEditActive ? editDes : "");
  const [checkList, setCheckList] = useState([]);

  useEffect(() => {
    if (isEditActive) {
      setTitle(editTitle);
      setDescription(editDes);
    }
  }, [isEditActive, editTitle, editDes]);

  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangeDes = (e) => setDescription(e.target.value);


  const handleAddTask = () => {
    console.log(taskType)
    console.log(checkList.length)
    if (taskType === "checklist"&& Checklist.length!==0) {
      if (title === "") {
        setTitle("No Title");
      }
      setAllTasks((prev) => [
        ...prev,
        { isAllChecked: false, taskType, title, checkList },
      ]);
      // console.log(`hhhh`, [...allTasks] );
    }

    if (taskType==='description') {


      setAllTasks((prev) =>
        isEditActive
          ? prev.map((task,i) =>
              indexForEdit===i
                ? { taskType, title, description }
                : task
            )
          : [
              ...prev,
              { taskType: taskType, title: title, description: description },
            ]
            
      );
    }
      // setAllTasks((prev) =>
      //   isEditActive
      //     ? prev.map((task,i) =>
      //         i===indexForEdit
      //           ? <>{ 'taskType':taskType,'title':title,'description':description }
      //           console.log(task)</>
      //           : task
      //       )
      //     : [
      //         ...prev,
      //         { 'taskType':taskType,'title':title,'description':description },
      //       ]
      // );
    // if (isEditActive) {
    //   const arr = [...allTasks];
    //   arr[indexForEdit] = {
    //     'taskType':taskType,'title':title,'description':description
    //   };
    //   console.log('reached')
    //   setAllTasks(arr)
    // } 
    // else{ setAllTasks((prev)=>[...prev,{'taskType':taskType,'title':title,'description':description}])}
   
    // setTaskType('description')

    if (setIsCreateNewActive) {
      setIsCreateNewActive(false);
    }
    if (isEditActive) {
      setIsEditActive(false);
    }
    setTaskType("description");
  };

  const handleAddCheckList = () => {
    setAllTasks((prev) => [...prev, { taskType, title, checkList }]);
    console.log(allTasks);
    // setIsCreateNewActive(false)
  };

  const handleClose = () => {
    if (setIsCreateNewActive) {
      setIsCreateNewActive(false);
    }
    setTaskType("description");
    if (setIsEditActive) {
      setIsEditActive(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-pink-100 flex items-center justify-center">
      <div className="w-5/6 h-5/6 p-4 bg-white shadow-lg flex flex-col rounded-lg justify-start">
        <label>Title</label>
        <input
          value={title}
          onChange={onChangeTitle}
          className="w-1/2 h-10 p-4 border border-gray-300 rounded-lg"
          type="text"
          placeholder="Enter your Title"
        />

        {taskType === "checklist" ? (
          <Checklist setCheckList={setCheckList} checkList={checkList} />
        ) : (
          <>
            <label>Description</label>
            <textarea
              value={description}
              onChange={onChangeDes}
              className="w-3/4 h-40 p-4 border border-gray-300 rounded-lg"
              placeholder="Enter your Text here..."
            />
            <button
              onClick={handleAddTask}
              className="bg-pink-900 text-white p-2 rounded-md mt-5"
            >
              {isEditActive ? "Update Task" : "Add Task"}
            </button>
          </>
        )}
        <div className="flex flex-row justify-center">
          {taskType === "checklist" && (
            <button
              onClick={handleAddTask}
              className="bg-pink-900 text-white p-2 rounded-md m-2"
            >
              Add list
            </button>
          )}
          <button
            onClick={handleClose}
            className="bg-gray-600 text-white p-2 rounded-md m-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTask;

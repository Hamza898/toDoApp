import React, { useState, useEffect } from "react";
import Checklist from "./Checklist";

function AddTask({
  setAllTasks,
  setIsCreateNewActive,
  isEditActive,
  taskType,
  allTasks,
  setTaskType,
  setSelectedTask,
  selectedTask,
  isCreateNewActive,
}) {
  const [checkList, setCheckList] = useState([]);

  const onChangeTitle = (e) => {
    setSelectedTask((prev) => ({ ...prev, title: e.target.value }));
  };

  const onChangeDes = (e) => {
    setSelectedTask((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleAddTask = () => {
    if (taskType === "checklist" && Checklist.length !== 0) {
      setAllTasks((prev) => [
        ...prev,
        { isAllChecked: false, taskType, title: selectedTask.title, checkList },
      ]);

    }

    let taskList = [...allTasks];

    if (!isCreateNewActive) {
      if (taskType === "description") {
        const taskToUpdate = taskList[selectedTask.index];
        taskToUpdate.title = selectedTask.title;
        taskToUpdate.description = selectedTask.description;
      }
    } else {
      let data = {
        taskType,
        title: selectedTask.title,
      };

      if (taskType === "description") {
        data = {
          ...data,
          description: selectedTask.description,
        };
      } else {
        data = {
          ...data,
          isAllChecked: false,
          checkList,
        };
      }

      taskList.push(data);
    }

    setAllTasks(taskList);
    setSelectedTask(null);

    if (setIsCreateNewActive) {
      setIsCreateNewActive(false);
    }

    setTaskType("description");
  };


  const handleClose = () => {
    setSelectedTask(null);

    if (setIsCreateNewActive) {
      setIsCreateNewActive(false);
    }
    setTaskType("description");
  };

  return (
    <div className="h-screen w-screen bg-pink-100 flex items-center justify-center">
      <div className="w-5/6 h-5/6 p-4 bg-white shadow-lg flex flex-col rounded-lg justify-start">
        <label>Title</label>
        <input
          value={selectedTask?.title}
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
              value={selectedTask?.description}
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

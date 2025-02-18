import React, { useState } from "react";

function DataStorage({
  allTasks,
  setAllTasks,
  setDoneTasks,
  handleTaskEdit,
  selectedTask
}) {
  // const [indexForEdit, setIndexForEdit] = useState(null);
  const [isChecked, setIsChecked] = useState();
  const [divIndex, setDivIndex] = useState();

  const onDoneHandle = (index) => {
    const newObj = allTasks[index];
    setDoneTasks((prev) => [...prev, newObj]);
    handleDelete(index);
  };

  const handleEdit = (index) => {
    handleTaskEdit(index)
  };

  const handleDelete = (index) => {
    const newObj = allTasks.filter((_, i) => i !== index);
    setAllTasks(newObj);
  };

  const onCheckHandle = (index, taskIndex) => {
    // console.log(taskIndex, index)
    // console.log("allTasks: ", allTasks)

    const array = [...allTasks];
    const bools = [];
    array[taskIndex].checkList[index].status =
      !array[taskIndex].checkList[index].status;
    setAllTasks(array);
    const checkLIst = allTasks[taskIndex].checkList;
    for (let i = 0; i < checkLIst.length; i++) {
      bools.push(checkLIst[i].status);
    }
    const check = bools.find((bools) => bools === false);
    if (check === undefined) {
      array[taskIndex].isAllChecked = true;
      setAllTasks(array);
    }
    if (allTasks[taskIndex].isAllChecked === true) {
      const task = allTasks[taskIndex];
      setDoneTasks((prev) => [...prev, task]);
      const newData = allTasks.filter((task, i) => task.isAllChecked !== true);
      setAllTasks(newData);
    }
  };
  const controllCheck = (taskIndex, index) => {
    if (
      allTasks[taskIndex] &&
      allTasks[taskIndex].checkList &&
      allTasks[taskIndex].checkList[index]
    ) {
      return allTasks[taskIndex].checkList[index].status;
    }
    return false;
  };

  return (
    <div className="flex flex-row justify-start">
      {allTasks.map(
        (task, index) =>
          task.taskType === "description" &&
          task.title &&
          task.description && (
            <div className="bg-pink-950 m-3 p-4 rounded-lg" key={index}>
              <p className="text-2xl font-bold mb-2">Title: {task.title}</p>
              <p>Description: {task.description}</p>
              <div className="flex flex-row justify-between">
                <button
                  className="bg-pink-100 rounded-md text-black p-2 m-2"
                  onClick={() => onDoneHandle(index)}
                >
                  Done
                </button>
                <button
                  className="bg-pink-100 rounded-md text-black p-2 m-2"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="bg-pink-100 rounded-md text-black p-2 m-2"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          )
      )}
      {allTasks.map(
        (task, taskIndex) =>
          task.taskType === "checklist" &&
          task.title &&
          task.checkList && (
            <div className="bg-pink-950 m-3 p-4 rounded-lg" key={taskIndex}>
              <p className="text-2xl font-bold mb-2">Title: {task.title}</p>
              <div>
                <p className="font-semibold">Checklist:</p>
                <ul className="list-disc ml-5">
                  {task.checkList.map((list, index) => (
                    <li key={index}>
                      {list.status ? (
                        <>
                          <input
                            type="checkbox"
                            onChange={() => onCheckHandle(index, taskIndex)}
                            className="mr-2 text-gray-500"
                          />
                          - <s>{list.task}</s>
                        </>
                      ) : (
                        <>
                          <input
                            checked={controllCheck(taskIndex, index)}
                            type="checkbox"
                            onChange={() => onCheckHandle(index, taskIndex)}
                            className="mr-2 text-gray-500"
                          />
                          - {list.task}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-row justify-between">
                <button
                  className="bg-pink-100 rounded-md text-black p-2 m-2"
                  onClick={() => handleDelete(taskIndex)}
                >
                  Delete
                </button>
              </div>
            </div>
          )
      )}
    </div>
  );
}

export default DataStorage;

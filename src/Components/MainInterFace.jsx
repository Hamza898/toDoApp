import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import DataStorage from "./DataStorage";
import Select from "./Select";

function MainInterface() {
  const dataFromLocalSt = JSON.parse(localStorage.getItem("items")) || [];
  const doneDataFromLocalSt =
    JSON.parse(localStorage.getItem("doneItems")) || [];

  const [isCreateNewActive, setIsCreateNewActive] = useState(false);
  const [allTasks, setAllTasks] = useState(dataFromLocalSt);
  const [doneTasks, setDoneTasks] = useState(doneDataFromLocalSt);
  const [taskType, setTaskType] = useState("description");

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(allTasks));
    localStorage.setItem("doneItems", JSON.stringify(doneTasks));
  }, [allTasks, doneTasks]);

  const handleIsVisible = () => {
    setIsCreateNewActive(true);
  };

  const handleDeleteDoneTasks = (index) => {
    const newData = doneTasks.filter((__, i) => i !== index);
    setDoneTasks(newData);
  };

  const [selectedTask, setSelectedTask] = useState(null);

  const handleEdit = (index) => {
    const obj = allTasks.find((_, i) => i === index);
    if(obj) setSelectedTask({...obj, index});
  }

  console.log(allTasks)

  return (
    <>
      { (!selectedTask && !isCreateNewActive)  && (
        <div className="h-screen w-screen bg-pink-100 flex items-center justify-center">
          <div className="w-5/6 h-5/6 bg-white shadow-lg rounded-lg flex-col justify-center">
            <div className="m-2 text-xl font-bold shadow-md h-10 p-2 text-amber-800 w-1/6 text-center self-start">
              To Do Application
            </div>
            <div className="flex flex-row">
              <Select setTaskType={setTaskType} />
              <div
                onClick={handleIsVisible}
                className="bg-pink-900 justify-end h-10 p-2 cursor-pointer text-pink-100 rounded-md shadow-lg mt-5 ml-5 w-30 text-center hover:bg-pink-950"
              >
                Create New
              </div>
            </div>

            <div className="bg-pink-100 text-white m-6 p-6 rounded-md">
              <DataStorage
                allTasks={allTasks}
                setAllTasks={setAllTasks}

                // // yeh wala
                handleTaskEdit={handleEdit}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
                setDoneTasks={setDoneTasks}
              />
            </div>
            <div>
              <span className="text-2xl font-bold m-6">All Done Tasks</span>
              <span className="flex flex-row justify-start">
                {doneTasks.map((task, index) => (
                  <div className="bg-pink-100 m-3 p-4 rounded-lg" key={index}>
                    <p className="text-2xl font-bold mb-2">
                      Title: {task.title}
                    </p>
                    {task.taskType === "checklist" && (
                      <>
                        <ul>
                          {task.checkList.map((list, i) => (
                            <li key={i}>- {list.task}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    {task.taskType === "description" && (
                      <p>Description: {task.description}</p>
                    )}
                    <div className="flex flex-row justify-between">
                      <button
                        className="bg-pink-100 rounded-md text-black p-2 m-2"
                        onClick={() => handleDeleteDoneTasks(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </span>
            </div>
          </div>
        </div>
      )}
      {isCreateNewActive && (
        <AddTask
          setAllTasks={setAllTasks}
          setIsCreateNewActive={setIsCreateNewActive}
          taskType={taskType}
          setTaskType={setTaskType}
          allTasks={allTasks}
          setSelectedTask={setSelectedTask}
          selectedTask={selectedTask}
          isCreateNewActive={isCreateNewActive}
        />
      )}
      {!!selectedTask && (
        <AddTask
          setAllTasks={setAllTasks}
          isEditActive={!!selectedTask}
          setIsCreateNewActive={setIsCreateNewActive}
          editTitle={selectedTask.title}
          setTaskType={setTaskType}
          editDes={selectedTask.description}
          allTasks={allTasks}
          taskType={taskType}
          indexForEdit={selectedTask.index}
          setSelectedTask={setSelectedTask}
          selectedTask={selectedTask}
        />
      )}
    </>
  );
}

export default MainInterface;

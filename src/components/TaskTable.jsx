import React, { useEffect, useState } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator.min.css";
import Swal from "sweetalert2";

const TaskTable = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        status: "To Do",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null); // For the selected task in the modal
    const [statusFilter, setStatusFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); // Search bar state

    // Fetch tasks
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos?_limit=20")
            .then((response) => response.json())
            .then((data) => {
                const formattedData = data.map((task) => ({
                    id: task.id,
                    title: task.title,
                    description: task.completed ? "Completed" : "Not Completed",
                    status: task.completed ? "Done" : "To Do",
                }));
                setTasks(formattedData);
            });
    }, []);

    // Add Task
    const handleAddTask = () => {
        const newTaskData = {
            id: tasks.length + 1,
            title: newTask.title,
            description: newTask.description,
            status: newTask.status,
        };
        setTasks([...tasks, newTaskData]);
        setNewTask({ title: "", description: "", status: "To Do" });
        setIsModalOpen(false);

        Swal.fire({
            icon: "success",
            title: "Task Added",
            text: "The task was successfully added!",
            timer: 2000,
            showConfirmButton: false,
        });
    };

    // Delete Task
    const handleDelete = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));

        Swal.fire({
            icon: "success",
            title: "Task Deleted",
            text: "The task was successfully deleted!",
            timer: 2000,
            showConfirmButton: false,
        });
    };

    // Edit Task Alert
    const handleEditAlert = () => {
        Swal.fire({
            icon: "info",
            title: "Task Edited",
            text: "Changes to the task were saved!",
            timer: 2000,
            showConfirmButton: false,
        });
    };

    // Tabulator columns
    const columns = [
        { title: "Task ID", field: "id", width: 100 },
        {
            title: "Title",
            field: "title",
            editor: true,
            cellEdited: () => handleEditAlert(), // Show alert on edit
        },
        {
            title: "Description",
            field: "description",
            editor: true,
            cellEdited: () => handleEditAlert(), // Show alert on edit
        },
        {
            title: "Status",
            field: "status",
            editor: "select",
            editorParams: { values: ["To Do", "In Progress", "Done"] },
            cellEdited: (cell) => {
                const updatedTask = cell.getRow().getData(); // Get updated task data
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === updatedTask.id ? { ...task, status: updatedTask.status } : task
                    )
                ); // Update state with the new status
                Swal.fire({
                    icon: "info",
                    title: "Status Updated",
                    text: `Task status has been updated to "${updatedTask.status}".`,
                    timer: 2000,
                    showConfirmButton: false,
                });
            },
            cellClick: (e, cell) => handleTaskStatusClick(cell.getRow().getData()), // Open modal on status click
        },
        {
            title: "Action",
            field: "action",
            width: 100,
            formatter: "buttonCross",
            align: "center",
            cellClick: (e, cell) => handleDelete(cell.getRow().getData().id),
        },
    ];

    // Handle Task Click to open modal
    const handleTaskStatusClick = (task) => {
        setSelectedTask(task); // Open the modal with selected task details
    };

    // Filter Tasks
    const filteredTasks = tasks
        .filter((task) => {
            // Filter by title, description, or status
            const lowerCaseQuery = searchQuery.toLowerCase();
            return (
                task.title.toLowerCase().includes(lowerCaseQuery) ||
                task.description.toLowerCase().includes(lowerCaseQuery)
            );
        })
        .filter((task) => (statusFilter ? task.status === statusFilter : true));

    // Handle Status Change in Modal
    const handleStatusChange = (newStatus) => {
        const updatedTask = { ...selectedTask, status: newStatus };
        setTasks(tasks.map((task) => (task.id === selectedTask.id ? updatedTask : task)));
        setSelectedTask(null); // Close the modal
        Swal.fire({
            icon: "info",
            title: "Status Updated",
            text: `Task status has been updated to "${newStatus}".`,
            timer: 2000,
            showConfirmButton: false,
        });
    };

    // Task Counters
    const taskCounters = {
        "To Do": tasks.filter((task) => task.status === "To Do").length,
        "In Progress": tasks.filter((task) => task.status === "In Progress").length,
        "Done": tasks.filter((task) => task.status === "Done").length,
    };

    return (
        <div className="mt-4 p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                {/* Add Task Button */}
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Task
                </button>

                {/* Filter Dropdown */}
                <div>
                    <label htmlFor="statusFilter" className="mr-2 text-gray-700">
                        Filter by Status:
                    </label>
                    <select
                        id="statusFilter"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border text-black border-gray-300 rounded px-3 py-2"
                    >
                        <option value="">All</option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Title or Description"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-black border border-gray-300 rounded px-3 py-2"
                />
            </div>

            {/* Task Counters */}
            <div className="text-black mb-4 flex space-x-6">
                <div>
                    <strong>To Do:</strong> {taskCounters["To Do"]}
                </div>
                <div>
                    <strong>In Progress:</strong> {taskCounters["In Progress"]}
                </div>
                <div>
                    <strong>Done:</strong> {taskCounters["Done"]}
                </div>
            </div>

            {/* Tabulator Table */}
            <ReactTabulator
                data={filteredTasks}
                columns={columns}
                layout="fitColumns"
                reactiveData
                className="bg-white shadow-md rounded"
            />

            {/* Modal */}
            {selectedTask && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Edit Task Status</h3>

                        <p><strong>Title:</strong> {selectedTask.title}</p>

                        <div className="my-4">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                id="status"
                                value={selectedTask.status}
                                onChange={(e) => handleStatusChange(e.target.value)}
                                className="w-full text-black border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={() => handleStatusChange(selectedTask.status)}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={() => setSelectedTask(null)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Task Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Add New Task</h3>

                        <input
                            type="text"
                            placeholder="Title"
                            value={newTask.title}
                            onChange={(e) =>
                                setNewTask({ ...newTask, title: e.target.value })
                            }
                            className="w-full text-black border border-gray-300 rounded px-3 py-2 mb-4"
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={newTask.description}
                            onChange={(e) =>
                                setNewTask({ ...newTask, description: e.target.value })
                            }
                            className="w-full text-black border border-gray-300 rounded px-3 py-2 mb-4"
                        />
                        <select
                            value={newTask.status}
                            onChange={(e) =>
                                setNewTask({ ...newTask, status: e.target.value })
                            }
                            className="w-full text-black border border-gray-300 rounded px-3 py-2 mb-4"
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>

                        <div className="flex justify-between">
                            <button
                                onClick={handleAddTask}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Add Task
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskTable;

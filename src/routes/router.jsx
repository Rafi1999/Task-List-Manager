import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../layout/Main";
import Home from "../components/Home";
import TaskTable from "../components/TaskTable";

export const router = createBrowserRouter([
    {
        path : '/',
        element : <Main />,
        children : [
            {
                path : '/',
                element : <Home />
            },
            {
                path : 'tasks',
                element : <TaskTable />
            }
        ]
    }
])
import { Box, IconButton, Modal } from '@mui/material';
import React, { useEffect } from 'react';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TaskUpdateModal from './TaskUpdateModal';
import { useSelector, useDispatch } from 'react-redux';
import { deletetask, getAllTasks } from '../States/Task/Action';

function TodoList() {

    const jwt= localStorage.getItem("jwt");

    const { auth, task } = useSelector((state) => state); 

    const dispatch = useDispatch(); 

    // Modal state
    const [open, setOpen] = React.useState(false);

    const [selectedTask, setSelectedTask] = React.useState(null);//store selected task

    const handleTaskUpdateButton = (taskItem,formattedDate) => {
        setSelectedTask(taskItem,formattedDate);
        setOpen(true);
    }

    const handleClose=()=>{
        setOpen(false)
        setSelectedTask(null)
    }

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            dispatch(getAllTasks(jwt));  // Dispatch action to fetch all tasks
        }
    }, [dispatch]); 

    // Check task data exists
    console.log('Task data:', task); 


    const handleDeleteButton = (taskId) => {

        dispatch(deletetask(taskId, jwt)).then(() => {
            dispatch(getAllTasks(jwt));
        });
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'black',
        boxShadow: 24,
        p: 4,
    };

    // Access tasks from the Redux store
    const tasks =  task.allTasks;

    return (
        <div className="overflow-x-auto w-full">
            <table className="min-w-full text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border-b">#</th>
                        <th className="px-4 py-2 border-b">Task</th>
                        <th className="px-4 py-2 border-b">Deadline</th>
                        <th className="px-4 py-2 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center py-2">No tasks available</td>
                        </tr>
                    ) : (
                        [...tasks].reverse().map((taskItem, index) => {


                            const formattedDate = taskItem.deadLine
                                ? new Date(taskItem.deadLine).toLocaleDateString('en-GB')
                                : 'No Deadline';

                            return (
                                <tr key={taskItem.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b">{index + 1}</td>
                                    <td className="px-4 py-2 border-b">{taskItem.description}</td>
                                    <td className="px-4 py-2 border-b">{formattedDate}</td>
                                    <td className="px-4 py-2 border-b">
                                        <IconButton style={{ color: 'black' }} onClick={()=>handleTaskUpdateButton(taskItem,formattedDate)}>
                                            <EditDocumentIcon />
                                        </IconButton>
                                        <IconButton style={{ color: 'black' }} onClick={()=>handleDeleteButton(taskItem?.id)}>
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <TaskUpdateModal task={selectedTask} onClose={handleClose}/>
                </Box>
            </Modal>
        </div>
    );
}

export default TodoList;

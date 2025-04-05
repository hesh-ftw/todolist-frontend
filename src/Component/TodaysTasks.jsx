import { Box, IconButton, Modal } from '@mui/material';
import React, { useEffect } from 'react';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TaskUpdateModal from './TaskUpdateModal';
import { useSelector, useDispatch } from 'react-redux';
import { deletetask, getAllTasks, getAllTodayTasks } from '../States/Task/Action';

function TodaysTasks() {

    const jwt= localStorage.getItem("jwt");

    const { auth, task } = useSelector((state) => state); 

    const dispatch = useDispatch(); 

    // Modal state
    const [open, setOpen] = React.useState(false);

    const [selectedTask, setSelectedTask] = React.useState(null);//store the selected task

    const handleTaskUpdateButton = (taskItem) => {
        setSelectedTask(taskItem);
        setOpen(true);
    }

    const handleClose=()=>{
        setOpen(false)
        setSelectedTask(null)
    }

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            dispatch(getAllTodayTasks(jwt));  // Dispatch action to fetch all todays tasks
        }
    }, [dispatch]); 

    // Check task data exists
    console.log('Task data:', task); 


    const handleDeleteButton = (taskId) => {

        dispatch(deletetask(taskId, jwt)).then(() => {
            dispatch(getAllTodayTasks(jwt));
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

    // Access todays task array from the Redux store
    const tasks =  task.todaysTasks;

    return (
    <main className="max-w-4xl mx-auto mt-10 px-4">
        <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-6"> Your Tasks for Today</h1>  
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
                                    <td colSpan="4" className="text-center py-2">No tasks available for today</td>
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
                                                <IconButton style={{ color: 'black' }} onClick={()=>handleTaskUpdateButton(taskItem)}>
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

                            <TaskUpdateModal 
                            task={selectedTask} 
                            onClose={handleClose} 
                            onTaskUpdated={() => dispatch(getAllTodayTasks(jwt))}/>
                        </Box>
                    </Modal>
                </div>
        </div>
    </main>
    );
}

export default TodaysTasks;

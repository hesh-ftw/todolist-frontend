import { Box, Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../States/Task/Action';

function TaskUpdateModal({ task, onClose , onTaskUpdated }) { 
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    description: '',
    deadline: '',
  });

  useEffect(() => {
    if (task) {
      setValues({
        description: task.description || '',    
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();

    let formattedDeadline = null;
    if (values.deadline) {
      try {
        const selectedDate = new Date(values.deadline);
        formattedDeadline = selectedDate.toISOString().split('.')[0];
      } catch (err) {
        console.error('Invalid date format:', err);
        return;
      }
    }

    const reqData = {
      taskId: task?.id,
      jwt: localStorage.getItem('jwt'),
      data: {
        description: values.description,
        deadLine: formattedDeadline,
      },
    };
        //call action function
        dispatch(updateTask(reqData)).then(() => {
            if (onTaskUpdated) onTaskUpdated(); // refresh today's tasks
            onClose(); // close modal
         });
  };

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
      onSubmit={handleUpdateTask}
    >
      <h1 className="text-white text-lg font-semibold mb-3">Update Task</h1>

      <div>
        <TextField
          label="Description"
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="description"
          size="small"
          InputLabelProps={{ style: { color: 'white' } }}
          inputProps={{ style: { color: 'white' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' },
            },
          }}
        />

        <TextField
          label="Deadline"
          name="deadline"
          type="date"
          value={values.deadline}
          onChange={handleChange}
          size="small"
          InputLabelProps={{ style: { color: 'white' } }}
          inputProps={{ style: { color: 'white' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' },
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: 'gray', color: 'white', mt: 1, ml: 1 }}
        >
          Update Task
        </Button>
      </div>
    </Box>
  );
}

export default TaskUpdateModal;

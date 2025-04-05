import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../States/Task/Action';

function AddTaskModal({onClose}) {
    
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");


  const [values, setValues] = useState({
    description: '',
    deadline: '',
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmitTask = (e) => {
    e.preventDefault(); // prevent page reload
    if (!values.description || !values.deadline) {
      alert("Please fill all fields");
      return;
    }

    // Format the deadline to match the backend format "yyyy-MM-ddTHH:mm:ss"
    const selectedDate = new Date(values.deadline);
    
    const formattedDeadline = selectedDate.toISOString().split('.')[0]; // Format to "yyyy-MM-ddTHH:mm:ss"

    // Prepare the request data
    const reqData = {
      jwt,
      data: {
        description: values.description,
        deadLine: formattedDeadline, 
      },
    }

    dispatch(createTask(reqData));
    onClose();
  };


  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmitTask}
    >
      <h1 className="text-white text-lg font-semibold mb-3">Add New Task Todo</h1>

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
          Add Task
        </Button>
      </div>
    </Box>
  );
}

export default AddTaskModal;

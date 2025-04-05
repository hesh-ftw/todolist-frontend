import { Box, Button, Modal } from '@mui/material';
import React from 'react';
import TodoList from './TodoList';
import AddTaskModal from './AddTaskModal';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const handleAddButton=()=>setOpen(true);
  
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

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

  const navigate = useNavigate();



  return (
    <main className="max-w-4xl mx-auto mt-10 px-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Add Your Tasks</h1>
        
        
        <Button
          variant="contained"
          style={{ backgroundColor: 'black', color: 'white' }}
          onClick={handleAddButton}
        >
          Add
        </Button>

      
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddTaskModal  onClose={handleClose}/>
        </Box>
      </Modal>

      </div>

      <TodoList />
    </main>
  );
}

export default Dashboard;

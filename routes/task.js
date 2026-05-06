const express = require("express");
const router = express.Router();

const { restrictToLoggedinUserOnly } = require("../middleware/auth");
const { handleCreateTask,handleGetTask,handleUpdateTask,handleDeleteTask,handleAddComment,handleGetComments} = require("../controller/task");


router.post('/',restrictToLoggedinUserOnly,handleCreateTask );
router.get('/:workspaceId',restrictToLoggedinUserOnly,handleGetTask);
router.patch('/:id',restrictToLoggedinUserOnly,handleUpdateTask);
router.delete('/:id',restrictToLoggedinUserOnly,handleDeleteTask);
router.post('/:id/comment',restrictToLoggedinUserOnly,handleAddComment);
router.get('/:id/comments',restrictToLoggedinUserOnly,handleGetComments);

module.exports = router;







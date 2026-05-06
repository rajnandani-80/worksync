const express = require("express");
const router = express.Router();

const { restrictToLoggedinUserOnly } = require("../middleware/auth");
const { handleCreateWorkspace, handleAddMemberToWorkspace, handleGetWorkspace } = require("../controller/workspace");

router.post('/create',restrictToLoggedinUserOnly,handleCreateWorkspace);
router.post('/add-member',restrictToLoggedinUserOnly,handleAddMemberToWorkspace);
router.get('/:id',restrictToLoggedinUserOnly,handleGetWorkspace);

module.exports = router;

const { Router } = require("express");
const uuid = require("uuid");
const {
  getAllTasks,
  deleteTask,
  createTask,
  getTaskById,
} = require("../db/queries");

const router = Router();

/* task model
   task = {
     id: string,  
     description: string,
     dueDate: number,
   }
*/
const tasks = [];

//--------------------------------
// get tasks

router.get("/", async (req, res) => {
  const tasks = await getAllTasks();
  res.send(tasks);
});

//--------------------------------
// delete a task

router.delete("/:id", async (req, res) => {
  // DELETE /abc-487-ddd
  const { id } = req.params;
  if (!id) {
    res.status(400).send('expected query param "id"');
    return;
  }

  try {
    const isTaskDeleted = deleteTask(id);
    if (!isTaskDeleted) {
      res.status(404).send("no task with specified id");
      return;
    }
  } catch (e) {
    console.error(e);
    return res.status(500).send("an unexpected error, please try again");
  }

  // send a 200 OK response with no content
  res.end();
});

// -------------------------------

// create a task
router.post("/", async (req, res) => {
  const { description, dueDate } = req.body;

  const missingFields = [];
  if (!description) {
    missingFields.push("description");
  }

  if (!dueDate) {
    missingFields.push("dueDate");
  }

  if (missingFields.length) {
    res
      .status(400)
      .send(`the following fields are missing: ${missingFields.join(", ")}`);
    return;
  }

  const id = await createTask(description, dueDate);
  const task = await getTaskById(id);

  res.send(task);
});

module.exports = {
  taskRouter: router,
};

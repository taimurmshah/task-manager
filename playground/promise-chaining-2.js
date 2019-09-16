const Task = require("../src/models/task");
require("../src/db/mongoose");

// Task.findOneAndRemove({ _id: "5d7eadd3389ff36afa4d60af" })
//   .then(res => {
//     console.log({ res });
//     return Task.countDocuments({ completed: false });
//   })
//   .then(res => {
//     console.log({ res });
//   })
//   .catch(err => console.log({ err }));

//5d7fbe5644f70e7ce7b6d300

const deleteTaskAndCount = async id => {
  await Task.findByIdAndDelete(id);
  const count = Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("5d7fe5e877c4f98292b0f59d")
  .then(res => console.log({ res }))
  .catch(error => console.log({ error }));

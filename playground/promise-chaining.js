require("../src/db/mongoose");
const User = require("../src/models/user");

// User.findByIdAndUpdate("5d7fe312908b7081dab0d49d", { age: 24 })
//   .then(user => {
//     console.log({ user });
//     return User.countDocuments({ age: 24 });
//   })
//   .then(result => {
//     console.log({ result });
//   })
//   .catch(error => console.log({ error }));

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  // console.log({ user });
  // console.log({ count });
  return count;
};

updateAgeAndCount("5d7fe312908b7081dab0d49d", 23)
  .then(res => console.log({ res }))
  .catch(error => console.log({ error }));

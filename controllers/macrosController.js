const knex = require("knex")(require("../knexfile"));

//CALLBACK METHOD TO CREATE A NEW MACRO
exports.postNewMacro = (req, res) => {
  if (req.user) {
    const {
      user_id,
      macro_name,
      targeted_weight,
      activity,
      tdee,
      tdee_need,
      goal,
      body_type,
      gender,
      age,
      weight,
      height,
    } = req.body;
    if (
      !user_id ||
      !macro_name ||
      !targeted_weight ||
      !activity ||
      !tdee ||
      !tdee_need ||
      !goal ||
      !body_type ||
      !gender ||
      !age ||
      !weight ||
      !height
    ) {
      res.status(201).send("Please post a correct macro");
    } else {
      knex("macros")
        .insert(req.body)
        .then((data) => {
          res.status(201).send("New macro has been posted");
        });
    }
  } else {
    res.status(400).send("Can not find the user profile");
  }
};

//CALLBACK METHOD TO GET ALL MACRO OF THE CURRENT USER
exports.getAllMacros = (req, res) => {
  if (req.user) {
    knex("macros")
      .where("user_id", req.user.id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => res.status(500).send("Can not get macros from server"));
  } else {
    res.status(400).send("Can not find the user");
  }
};

//CALLBACK METHOD TO GET A DETAILED MACRO OF THE CURRENT USER
exports.getOneMacro = (req, res) => {
  if (req.user) {
    knex("macros")
      .where("id", req.params.id)
      .then((data) => {
        res.status(200).json(data[0]);
      })
      .catch((error) => res.status(500).send("Can not get the macro"));
  } else {
    res.status(400).send("Can not find the user");
  }
};

//CALLBACK FUNCTION TO DELETE A MACRO OF A USER
exports.deleteMacro = (req, res) => {
  if (req.user) {
    knex("macros")
      .del()
      .where("id", req.params.id)
      .then((data) => {
        console.log("running");
        res.status(200).send("The macro has been deleted");
      })
      .catch((error) => {
        res.status(500).send("Can not delete the macro");
      });
  } else {
    res.status(400).send("Can not find the user");
  }
};

//CALLBACK FUNCTION TO UPDATE A MACRO
exports.updateMacro = (req, res) => {
  if (req.user) {
    knex("macros")
      .where("id", req.params.id)
      .update(req.body)
      .then((data) => {
        res.status(200).send("The macro has been updated");
      })
      .catch((error) => {
        res.status(500).send("Can not update the macro");
      });
  } else {
    res.status(400).send("Can not find the user");
  }
};

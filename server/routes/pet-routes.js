const router = require("express").Router();
const Pet = require("../models/pet-model");

router.get("/get", async (req, res) => {
  let { petId } = req.query;
  let petList;

  try {
    if (petId) {
      petList = await Pet.find({ _id: petId });
      if (petList.length === 0) throw "user not found";
    } else {
      petList = await Pet.find();
    }

    res.status(200).json(petList);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/create", async (req, res) => {
  let { name, gender, condition, ...toCreate } = req.body;

  try {
    let newPet = await Pet.create({
      name: name || "unnamed",
      gender: gender || "unidentified",
      condition: condition || "healthy",
      toCreate,
    });

    res.status(200).json("new pet created", newPet);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/update", async (req, res) => {
  let { petId, ...toUpdate } = req.body;

  try {
    if (petId) {
      let data = await Pet.updateOne({ _id: petId }).set(toUpdate);
      res.status(200).json("pet updated", data);
    } else {
      throw "no user found";
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

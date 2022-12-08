const router = require("express").Router();
const Pet = require("../models/pet-model");

router.get("/get", async (req, res) => {
  let { petId } = req.query;
  let petList;

  try {
    if (petId) {
      petList = await Pet.find({ _id: petId });
      if (petList.length === 0) throw "pet not found";
    } else {
      petList = await Pet.find();
    }

    res.status(200).json(petList);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/search", async (req, res) => {
  let { term } = req.body;
  let petResult;

  try {
    petResult = await Pet.find({ animal: { $regex: term, $options: "ix" } });
    if (petResult.length === 0) throw "pet not found";

    res.status(200).json(petResult);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/filter", async (req, res) => {
  let { animal, gender, condition } = req.body;
  let petResult;

  try {
    petResult = await Pet.find({ animal, gender, condition });
    if (petResult.length === 0) throw "pet not found";

    res.status(200).json(petResult);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/create", async (req, res) => {
  let { name, gender, condition, animal, ...toCreate } = req.body;

  try {
    let newPet = await Pet.create({
      name: name || "unnamed",
      gender: gender || "unidentified",
      condition: condition || "healthy",
      animal: animal || "unidentified",
      tags: [gender, animal, condition],
      toCreate,
    });

    res.status(200).json(newPet);
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
      throw "no pet found";
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

const { Accommodation } = require("../models");
const router = require("express").Router();

// Skapa ett nytt boende
router.post("/", async (req, res) => {
  try {
    const accommodation = await Accommodation.create(req.body);
    res.status(201).json(accommodation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Hämta alla boenden
router.get("/", async (req, res) => {
  try {
    const accommodations = await Accommodation.findAll();
    res.json(accommodations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Hämta ett specifikt boende med ID
router.get("/:id", async (req, res) => {
  try {
    const accommodation = await Accommodation.findByPk(req.params.id);
    if (accommodation) {
      res.json(accommodation);
    } else {
      res.status(404).json({ message: "Boende hittades inte" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Uppdatera ett boende
router.put("/:id", async (req, res) => {
  try {
    const accommodation = await Accommodation.findByPk(req.params.id);
    if (accommodation) {
      await accommodation.update(req.body);
      res.json(accommodation);
    } else {
      res.status(404).json({ message: "Boende hittades inte" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ta bort ett boende
router.delete("/:id", async (req, res) => {
  try {
    const accommodation = await Accommodation.findByPk(req.params.id);
    if (accommodation) {
      await accommodation.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Boende hittades inte" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Hämta alla boenden för en specifik användare
router.get("/user/:userId", async (req, res) => {
  try {
    const accommodations = await Accommodation.findAll({
      where: { userId: req.params.userId },
    });
    res.json(accommodations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
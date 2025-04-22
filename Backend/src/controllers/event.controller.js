import Event from "../models/event.model.js";


export const createEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const createdBy = req.user._id;

    const newEvent = new Event({ title, description, date, createdBy });
    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (err) {
    console.error("Event creation failed:", err.message);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};


export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "fullName");
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

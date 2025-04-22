import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddEventModal = ({ onClose, onEventCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate date
    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) {
      toast.error("Please select a valid date");
      return;
    }

    const payload = {
      title,
      description,
      date: selectedDate.toISOString(), // Send as ISO, adjust if backend expects different format
    };
    console.log("Event Creation Payload:", payload);

    try {
      const response = await axiosInstance.post("/events", payload); // Adjusted to "/events" to match backend
      console.log("Event Creation Response:", response.data);
      toast.success("Event added successfully!");
      setTitle("");
      setDescription("");
      setDate("");
      onEventCreated?.();
      onClose();
    } catch (error) {
      console.error("Event Creation Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.error || "Failed to add event");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[400px] p-6 space-y-4">
        <h2 className="text-lg font-semibold">Add New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            className="input input-bordered w-full"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
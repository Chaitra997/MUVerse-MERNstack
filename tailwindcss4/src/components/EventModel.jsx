// components/EventModel.jsx
import { useState } from "react";
import axios from "axios";
import { useEventModalStore } from "../store/useEventModalStore";
import toast from "react-hot-toast";

const EventModel = () => {
  const { isOpen, closeModal } = useEventModalStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: ""
  });

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    console.log("🔑 Token:", token);
    console.log("📤 Form Data:", formData);

    if (!token) {
      toast.error("You must be logged in.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/api/events", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      console.log("✅ Success:", res.data);
      toast.success("Event created!");
      closeModal();
      setFormData({ title: "", description: "", date: "" });
    } catch (err) {
      console.error("❌ Event create error:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Failed to create event");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create Event</h2>

        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full mb-2"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="border p-2 w-full mb-2"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <input
          type="datetime-local"
          className="border p-2 w-full mb-2"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />

        <div className="flex justify-end gap-2 mt-2">
          <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">Create</button>
        </div>
      </div>
    </div>
  );
};

export default EventModel;

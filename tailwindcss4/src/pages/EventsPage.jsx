import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import AddEventModal from "../components/AddEventModal";
import { useEventModalStore } from "../store/useEventModalStore";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const { isOpen: showModal, openModal: openEventModal, closeModal: closeEventModal } = useEventModalStore();

  const fetchEvents = async () => {
    try {
      const res = await axiosInstance.get("/events");
      console.log("Fetch Events Response:", res.data);
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
      toast.error(err.response?.data?.error || "Failed to load events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Campus Events</h2>
        <button className="btn btn-primary" onClick={openEventModal}>
          Add Event
        </button>
      </div>

      {events.length === 0 && <p className="text-gray-500">No events yet.</p>}

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event._id} className="card bg-base-100 shadow-md p-4">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-sm text-gray-600">
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="mt-2">{event.description}</p>
            <p className="text-sm mt-1 text-gray-400">
              Posted by: {event.createdBy?.fullName || "Anonymous"}
            </p>
          </div>
        ))}
      </div>

      {showModal && (
        <AddEventModal onClose={closeEventModal} onEventCreated={fetchEvents} />
      )}
    </div>
  );
};

export default EventsPage;
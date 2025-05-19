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
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
      toast.error(err.response?.data?.error || "Failed to load events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="pt-14 h-screen w-screen overflow-hidden bg-white flex flex-col">
      <div className="flex justify-between items-center px-6 py-4">
        <h2 className="text-3xl font-bold">Campus Events</h2>
        <button className="btn btn-sm btn-neutral" onClick={openEventModal}>
          Add Event
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
        {events.length === 0 ? (
          <p className="text-gray-500">No events yet.</p>
        ) : (
          events.map((event) => (
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
          ))
        )}
      </div>

      {showModal && (
        <AddEventModal onClose={closeEventModal} onEventCreated={fetchEvents} />
      )}
    </div>
  );
};

export default EventsPage;

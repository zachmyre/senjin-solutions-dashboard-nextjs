import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from "react-big-calendar";
import moment from "moment";
import { useCallback, useState } from "react";
import { addCalendarEvent, deleteCalendarEvent } from "../../utils/http/events";
import { ToastContainer, toast } from "react-toastify";
import { Backdrop, Box, Card, CircularProgress, Fade, Modal, Typography } from "@mui/material";

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const eventTemplate = {
  _id: '',
  user_id: '',
  title: '',
  start: '',
  end: '',
  allDay: false
};

const Calendar = ({ events, profile }: any) => {
  const [myEvents, setEvents] = useState(events);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(eventTemplate);
  const dayLayoutAlgorithm = "no-overlap";

  const handleSelectSlot = useCallback(
    async ({ start, end }: any) => {
      const title = window.prompt("New Event Name");
      if (title) {
        setEvents((prev: any) => [...prev, { start, end, title }]);
        const req = await addCalendarEvent({
          user_id: profile._id,
          start,
          end,
          title,
        });
        if (!req) {
          toast.error("Error!");
          return;
        }
        toast.success("Added successfully!");
        return;
      }
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback(
    (event: any) =>
      {
      //   toast.info(event.title, {
      //   position: "top-center",
      //   hideProgressBar: true,
      //   autoClose: 7000,
      // });
      setCurrentEvent(event);
    setShowModal(true);},
    []
  );

  const updateEvent = async () => {
    const req = await addCalendarEvent(currentEvent);
    if (!req) {
      toast.error("Error!");
      return;
    }
    const objIndex = myEvents.findIndex(((event: any) => event._id == currentEvent._id ));
    const newEvents = myEvents;
    newEvents[objIndex] = currentEvent;
    setEvents(newEvents);
    toast.success("Updated successfully!");
    resetModal();
    return;
  };

  const deleteEvent = async () => {
    const req = await deleteCalendarEvent(currentEvent);
    if (!req) {
      toast.error("Error!");
      return;
    }
    setEvents(myEvents.filter((event: any) => event._id != currentEvent._id))
    toast.success("Deleted successfully!");
    resetModal();
    return;
  }

  const resetModal = () => {
    setShowModal(false); 
    setCurrentEvent(eventTemplate);
  }

  function eventStyleGetter(
    event: any,
    start: any,
    end: any,
    isSelected: any
  ): any {
    var style = {
      backgroundColor: isSelected ? "#e5e0bb" : "black",
      borderRadius: "30px",
      color: isSelected ? "black" : "white",
      outline: "none",
      textAlign: "center",
      fontWeight: "bold",
    };
    return {
      style: style,
    };
  }

  
const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '30px',
  boxShadow: 24,
  p: 4,
};

  return (
    <div className="h-full w-full md:h-[83%] md:w-[83%]">
      {myEvents.length > 0 ? <BigCalendar
        dayLayoutAlgorithm={dayLayoutAlgorithm}
        defaultView={Views.MONTH}
        localizer={localizer}
        events={myEvents}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        eventPropGetter={eventStyleGetter}
      /> : <div className="w-full h-full md:h-[83%] md:w-[83%] flex items-center justify-center"><CircularProgress size={48} color="inherit" /></div>}
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showModal}
        onClose={() => resetModal()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <Box sx={modalStyle}>
          <textarea
          rows={4}
          cols={4}
                onChange={(event) =>
                  {setCurrentEvent({...currentEvent, user_id: profile._id, title: event.target.value}); }
                               }
                value={currentEvent.title}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none ring-1 ring-primary"
              />
              <div className="flex items-center justify-around my-4 space-x-2">
               <button className="w-1/3 px-6 py-2 text-white bg-primary rounded-lg hover:bg-gray-300" onClick={() => updateEvent()}>Update</button>
               <button className="w-1/3 px-6 py-2 text-white bg-black rounded-lg hover:bg-primary" onClick={() => deleteEvent()}>Delete</button>
            <button className="w-1/3 px-6 py-2 text-white bg-gray-300 rounded-lg hover:bg-gray-400" onClick={() => resetModal()}>Cancel</button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Calendar;

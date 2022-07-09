import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from "react-big-calendar";
import moment from "moment";
import { useCallback, useState } from "react";
import { addCalendarEvent } from "../../utils/http/events";
import { ToastContainer, toast } from "react-toastify";
import { Backdrop, Box, Card, Fade, Modal, Typography } from "@mui/material";

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
    toast.success("Updated successfully!");
    return;
  };

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
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

  return (
    <div className="h-full w-full md:h-[85%] md:w-[87%]">
      <BigCalendar
        dayLayoutAlgorithm={dayLayoutAlgorithm}
        defaultView={Views.MONTH}
        localizer={localizer}
        events={myEvents}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        eventPropGetter={eventStyleGetter}
      />
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
          <input
                onChange={(event) =>
                  {setCurrentEvent({...currentEvent, user_id: profile._id, title: event.target.value}); }
                               }
                type="text"
                value={currentEvent.title}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <div className="flex items-center justify-around my-4">
               <button className="w-1/3 px-6 py-2 text-white bg-primary rounded-lg hover:bg-gray-300" onClick={() => {updateEvent(); resetModal();}}>Update</button>
            <button className="w-1/3 px-6 py-2 text-white bg-gray-300 rounded-lg hover:bg-primary" onClick={() => resetModal()}>Cancel</button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Calendar;

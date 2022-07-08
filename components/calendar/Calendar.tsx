import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
  DateLocalizer,
} from "react-big-calendar";
import moment from "moment";
import { useCallback, useState } from "react";
import { addCalendarEvent } from "../../utils/http/events";

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const Calendar = ({ events, profile }: any) => {
  const [myEvents, setEvents] = useState(events);
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
          window.alert("Error!");
          return;
        }
        window.alert("Added calendar event!");
        return;
      }
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback(
    (event: any) => window.alert(event.title),
    []
  );

  function eventStyleGetter(
    event: any,
    start: any,
    end: any,
    isSelected: any
  ): any {
    console.log(event);
    var backgroundColor = "#" + event.hexColor;
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
    </div>
  );
};

export default Calendar;

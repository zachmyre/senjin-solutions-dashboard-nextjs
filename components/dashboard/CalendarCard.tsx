import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCalendarEvents } from "../../utils/http/events";

const eventTemplate = {
  allDay: false,
  end: "",
  start: "",
  title: "No events today!",
  _id: "",
};

const CalendarCard = ({ className, profile }: any) => {
  const router = useRouter();
  const [events, setEvents] = useState([eventTemplate]);
  useEffect(() => {
    if (!profile) {
      router.push("/login");
      return;
    }
    const getData = async () => {
      const fetchedEvents = await getEvents();
      const currentEvents = fetchedEvents.filter((event: any) => {
        if (isToday(event.start)) {
          return event;
        }
      });

      if (currentEvents.length > 0) {
        setEvents(currentEvents);
      }

      return;
    };
    getData();
  }, []);

  const getEvents = async () => {
    if (profile._id) {
      const fetchedEvents = await getCalendarEvents(profile._id);
      return fetchedEvents;
    }
    return null;
  };

  const isToday = (date: any) => {
    const otherDate = new Date(date);
    const todayDate = new Date();

    if (
      otherDate.getDate() === todayDate.getDate() &&
      otherDate.getMonth() === todayDate.getMonth() &&
      otherDate.getFullYear() === todayDate.getFullYear()
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Card className={`${className} p-6 pb-0`}>
      <CardContent className="space-y-4 p-0 m-0">
        <div className="space-y-2">
          <h1 className="text-2xl border-b-4 border-primary pb-2">
            Today's Calendar
          </h1>
          <ul>
            {events.map((event, i) => (
              <li key={i}>{event?.title}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarCard;

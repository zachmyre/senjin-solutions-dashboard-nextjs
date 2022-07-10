const API_URL =
  process.env.ENVIRONMENT == "development"
    ? process.env.DEV_URL
    : process.env.PROD_URL ?? "";

export const getCalendarEvents = async (id: string) => {
  const eventRequest = await fetch(`${API_URL}/api/calendar/getEvents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: id }),
  });

  const events = await eventRequest.json();

  return events.message;
};

export const addCalendarEvent = async (eventObject: any) => {
  eventObject.allDay = isAllDayEvent(eventObject.start, eventObject.end);
  const eventRequest = await fetch(`${API_URL}/api/calendar/addEvent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventObject),
  });

  const events = await eventRequest.json();
  if (events.error) {
    return false;
  }
  return true;
};

export const deleteCalendarEvent = async (eventObject: any) => {
  const eventRequest = await fetch(`${API_URL}/api/calendar/deleteEvent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventObject),
  });

  const events = await eventRequest.json();
  if (events.error) {
    return false;
  }
  return true;
};

export const isAllDayEvent = (start: any, end: any) => {
  if (start - end == -86400000) {
    return true;
  }
  return false;
};

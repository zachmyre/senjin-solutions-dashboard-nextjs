import Calendar from "./Calendar";

const CalendarLayout = ({ events, profile }: any) => {
  return (
    <div className="w-full h-full">
      <h1 className="text-4xl text-black font-bold mb-4">Calendar</h1>
      <Calendar profile={profile} events={events} />
    </div>
  );
};

export default CalendarLayout;

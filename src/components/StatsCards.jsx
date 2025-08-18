import Card from "./Card";

const StatsCards = () => {
  const cardData = [
    {
      title: "Attendance",
      value: "19/20",
      description: "Well done! You're attending all lessons. Keep going!",
    },
    {
      title: "Homework",
      value: "53/56",
      description: "Don't forget about your next homework",
    },
    {
      title: "Rating",
      value: "89/100",
      description: "Go to report",
    },
  ];
  return (
    <div className="flex my-4 space-x-4 space-y-4 flex-wrap xl:flex-nowrap justify-between">
      {cardData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

export default StatsCards;

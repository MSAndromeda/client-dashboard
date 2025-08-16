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
    <div className="grid grid-cols-3 gap-6 mb-6">
      {cardData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
      ;
    </div>
  );
};

export default StatsCards;

import React from "react";

const dummyNotes = [
	{
		id: "n1",
		title: "Outreach Campaign",
		content:
			"Sent personalized emails to 30 prospects. Follow up scheduled in 3 days.",
		tags: ["email", "outreach"],
		createdAt: new Date().toISOString(),
		metrics: {
			newLeads: 30,
			meetings: 4,
			conversions: 1,
			source: "email",
		},
	},
	{
		id: "n2",
		title: "Acme Intro Call",
		content: "Intro call with Acme. Good fit, next step: proposal.",
		tags: ["meeting", "acme"],
		createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
		metrics: {
			newLeads: 2,
			meetings: 1,
			conversions: 1,
			source: "referral",
		},
	},
	{
		id: "n3",
		title: "Cold-Call Blitz",
		content: "Cold calls to 50 numbers; 6 warm leads, 1 demo booked.",
		tags: ["cold-call"],
		createdAt: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
		metrics: {
			newLeads: 6,
			meetings: 1,
			conversions: 0,
			source: "phone",
		},
	},
	{
		id: "n4",
		title: "Follow-up Round",
		content: "Sent follow-up messages to older leads. 3 re-engaged.",
		tags: ["followup"],
		createdAt: new Date(Date.now() - 9 * 24 * 3600 * 1000).toISOString(),
		metrics: {
			newLeads: 3,
			meetings: 0,
			conversions: 0,
			source: "email",
		},
	},
	{
		id: "n5",
		title: "Referral Tap",
		content: "Asked existing clients for referrals; 2 intros received.",
		tags: ["referral"],
		createdAt: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString(),
		metrics: {
			newLeads: 2,
			meetings: 1,
			conversions: 0,
			source: "referral",
		},
	},
	{
		id: "n6",
		title: "Product Demo",
		content:
			"Demo given to prospective client — positive feedback, follow-up next week.",
		tags: ["demo"],
		createdAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
		metrics: {
			newLeads: 1,
			meetings: 1,
			conversions: 0,
			source: "demo",
		},
	},
];

const NoteCard = ({ n }) => (
	<div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<h4 className="font-bold text-blue-600">{n.title}</h4>
				<span className="text-xs text-slate-500">
					{new Date(n.createdAt).toLocaleDateString()}
				</span>
			</div>
		</div>

		<p className="mt-2 text-sm text-black">{n.content}</p>

		<div className="mt-3 flex flex-wrap gap-2">
			{(n.tags || []).map((t) => (
				<span
					key={t}
					className="text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200"
				>
					#{t}
				</span>
			))}
		</div>

		<div className="mt-3 text-sm text-slate-600 flex gap-4">
			<span>Leads: {n.metrics?.newLeads ?? 0}</span>
			<span>Conv: {n.metrics?.conversions ?? 0}</span>
			<span>Source: {n.metrics?.source || "-"}</span>
		</div>
	</div>
);

const Dashboard = () => {
	return (
		<div className="min-h-screen bg-slate-100 p-8 text-black">
			<div className="max-w-6xl mx-auto">
				<header className="mb-6">
					<h1 className="text-2xl font-bold">Notes Preview</h1>
					<p className="text-sm text-slate-600">
						A simple display of client-acquisition notes (read-only).
					</p>
				</header>

				<section>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{dummyNotes.map((n) => (
							<NoteCard key={n.id} n={n} />
						))}
					</div>
				</section>
			</div>
		</div>
	);
};

export default Dashboard;

// import WelcomeSection from "../components/Home/WelcomeSection";
// import StatsCards from "../components/Home/StatsCards";
// import Timetable from "../components/Home/Timetable";
// import UpcomingEvents from "../components/Home/UpcomingEvents";
// import HomeWorkProgress from "../components/Home/HomeWorkProgress";

// const Dashboard = () => {
//   return (
//     <>
//       {/* Main Dashboard */}
//       <div className="flex-1 px-6 pt-6">
//         {/* Welcome Section */}
//         <WelcomeSection />

//         {/* Stats Cards */}
//         <StatsCards />

//         {/* Timetable and Upcoming Events */}
//         <div className="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-4">
//           {/* Timetable */}
//           <Timetable />

//           {/* Upcoming Events */}
//           <UpcomingEvents />
//         </div>
//       </div>
//       {/* Right Sidebar */}
//       <HomeWorkProgress />
//     </>
//   );
// };

// export default Dashboard;

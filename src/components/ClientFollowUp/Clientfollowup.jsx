import React, { useState } from "react";

const sampleClients = [
	{
		name: "Acme Corp",
		contact: "John Doe",
		email: "john@acme.com",
		phone: "555-1234",
		last: "2025-08-01",
		next: { type: "Call", date: "2025-08-21" },
		owner: "Priya",
		priority: "High",
		notes: ["Called about renewal", "Waiting for proposal approval"],
	},
	{
		name: "Beta LLC",
		contact: "Sarah Li",
		email: "sarah@beta.com",
		phone: "555-5678",
		last: "2025-07-28",
		next: { type: "Email", date: "2025-08-19" },
		owner: "Raj",
		priority: "Medium",
		notes: ["Emailed contract draft", "Need to follow up next week"],
	},
	{
		name: "Gamma Industries",
		contact: "Mark Spencer",
		email: "mark@gamma.com",
		phone: "555-2345",
		last: "2025-08-10",
		next: { type: "Meeting", date: "2025-08-25" },
		owner: "Aisha",
		priority: "Low",
		notes: ["Discussed project scope", "Schedule design review"],
	},
	{
		name: "Delta Partners",
		contact: "Emily Wong",
		email: "emily@delta.com",
		phone: "555-6789",
		last: "2025-08-15",
		next: { type: "Call", date: "2025-08-23" },
		owner: "Carlos",
		priority: "High",
		notes: ["Requested budget details", "Need update by Friday"],
	},
	{
		name: "Omega Solutions",
		contact: "Liam Patel",
		email: "liam@omega.com",
		phone: "555-8765",
		last: "2025-08-05",
		next: { type: "Email", date: "2025-08-22" },
		owner: "Maya",
		priority: "Medium",
		notes: ["Sent product demo", "Follow up with technical doc"],
	},
];

export default function ClientFollowUpPage() {
	const [filter, setFilter] = useState("All");
	const [search, setSearch] = useState("");
	const [selectedClient, setSelectedClient] = useState(null);

	const filtered = sampleClients.filter(
		(c) =>
			(filter === "All" ||
				(filter === "Overdue" && new Date(c.next.date) < new Date()) ||
				(filter === "Today" &&
					c.next.date === new Date().toISOString().slice(0, 10)) ||
				(filter === "Upcoming" && new Date(c.next.date) > new Date())) &&
			(c.name.toLowerCase().includes(search.toLowerCase()) ||
				c.contact.toLowerCase().includes(search.toLowerCase()))
	);

	const priorityColors = {
		High: "text-red-600 font-bold",
		Medium: "text-yellow-600 font-semibold",
		Low: "text-green-600",
	};

	return (
		<div className="p-6 space-y-6 min-h-screen bg-slate-100">
			<div className="backdrop-blur-sm bg-white/60 rounded-2xl p-4">
				{/* Top bar */}
				<div className="flex items-center justify-between gap-2 bg-sky-100/80 p-4 rounded-md">
					<h1 className="text-2xl font-semibold text-sky-900">
						Client Follow‑up
					</h1>

					<div className="flex items-center gap-2">
						{["All", "Overdue", "Today", "Upcoming"].map((f) => (
							<button
								key={f}
								onClick={() => setFilter(f)}
								className={`px-3 py-1 rounded text-sm ${
									filter === f
										? "bg-sky-600 text-white"
										: "bg-white border border-sky-200 text-sky-700"
								}`}
							>
								{f}
							</button>
						))}

						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search clients..."
							className="ml-2 px-3 py-1 border border-sky-200 rounded-md bg-white"
						/>
					</div>
				</div>

				{/* Table (display card) */}
				<div className="mt-6">
					<div className="bg-white/90 border border-sky-200 rounded-md overflow-hidden">
						<div className="w-full text-sm">
							<div className="grid grid-cols-6 text-left bg-sky-50 text-sky-800 border-b border-sky-200">
								<div className="p-3 col-span-1 font-medium">Client</div>
								<div className="p-3 col-span-1">Contact</div>
								<div className="p-3 col-span-1">Last Contacted</div>
								<div className="p-3 col-span-1">Next Action</div>
								<div className="p-3 col-span-1">Owner</div>
								<div className="p-3 col-span-1">Priority</div>
							</div>

							<div>
								{filtered.map((c) => (
									<div
										key={c.name}
										onClick={() => setSelectedClient(c)}
										className="grid grid-cols-6 border-b border-sky-100 cursor-pointer hover:bg-sky-50 transition-colors"
									>
										<div className="p-3 col-span-1 font-medium text-sky-800">
											{c.name}
										</div>
										<div className="p-3 col-span-1">{c.contact}</div>
										<div className="p-3 col-span-1">{c.last}</div>
										<div className="p-3 col-span-1">
											{c.next.type} {c.next.date}
										</div>
										<div className="p-3 col-span-1">{c.owner}</div>
										<div
											className={`p-3 col-span-1 ${priorityColors[c.priority]}`}
										>
											{c.priority}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Right-side panel (simple drawer replacement) */}
			{selectedClient && (
				<>
					<div
						className="fixed inset-0 bg-black/40"
						onClick={() => setSelectedClient(null)}
					/>
					<aside className="fixed right-0 top-0 h-full w-full md:w-96 bg-white border-l border-slate-200 p-6 overflow-auto">
						<div className="flex items-start justify-between">
							<h2 className="text-2xl font-bold text-sky-700">
								{selectedClient.name}
							</h2>
							<button
								onClick={() => setSelectedClient(null)}
								className="text-slate-600 px-2 py-1 rounded hover:bg-slate-100"
							>
								Close
							</button>
						</div>

						<p className="mt-3">
							<strong>Contact:</strong> {selectedClient.contact} (
							{selectedClient.email})
						</p>

						<div className="mt-4 flex gap-2">
							<a
								href={`tel:${selectedClient.phone}`}
								className="inline-flex items-center gap-2 px-3 py-1 bg-sky-600 text-white rounded text-sm"
							>
								Call
							</a>
							<a
								href={`mailto:${selectedClient.email}`}
								className="inline-flex items-center gap-2 px-3 py-1 border border-sky-200 text-sky-700 rounded text-sm"
							>
								Email
							</a>
						</div>

						<div className="mt-6">
							<h3 className="font-semibold text-sky-800">Notes</h3>
							<ul className="list-disc pl-5 mt-2 space-y-1 text-sky-700">
								{selectedClient.notes.map((n, i) => (
									<li key={i}>{n}</li>
								))}
							</ul>
						</div>

						<div className="mt-6">
							<h3 className="font-semibold text-sky-800">Add Follow‑up</h3>
							<div className="mt-2 grid grid-cols-1 gap-2">
								<input
									placeholder="Type (Call/Email)"
									className="p-2 border rounded"
								/>
								<input type="date" className="p-2 border rounded" />
								<input placeholder="Owner" className="p-2 border rounded" />
								<button className="mt-2 px-4 py-2 bg-sky-600 text-white rounded">
									Add
								</button>
							</div>
						</div>
					</aside>
				</>
			)}
		</div>
	);
}

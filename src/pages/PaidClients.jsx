import React, { useMemo, useState } from "react";

const MOCK_CLIENTS = [
	{
		id: "C-1001",
		firstName: "Aisha",
		lastName: "Khan",
		email: "aisha@example.com",
		phone: "+1-555-0100",
		company: "Acme Co",
		jobTitle: "Product Manager",
		industry: "SaaS",
		location: { city: "Austin", state: "TX", country: "USA" },
		demographics: { ageRange: "30-39", gender: "Female", tags: ["enterprise"] },
		plan: { name: "Pro", tier: "Tier 2", amount: 199, currency: "USD", billingCycle: "Monthly" },
		billing: { status: "Paid", lastPaymentDate: "2025-07-01", nextRenewalDate: "2025-08-01" },
		metadata: { createdAt: "2024-01-01", updatedAt: "2025-07-01" },
	},
	{
		id: "C-1002",
		firstName: "Liam",
		lastName: "Ng",
		email: "liam@startup.io",
		phone: "+44-20-7000-0002",
		company: "Startup.io",
		jobTitle: "CTO",
		industry: "Fintech",
		location: { city: "London", state: "", country: "UK" },
		demographics: { ageRange: "25-29", gender: "Male", tags: ["small-business"] },
		plan: { name: "Basic", tier: "Tier 1", amount: 49, currency: "GBP", billingCycle: "Monthly" },
		billing: { status: "Overdue", lastPaymentDate: "2025-05-15", nextRenewalDate: "2025-06-15" },
		metadata: { createdAt: "2024-03-12", updatedAt: "2025-05-15" },
	},
	{
		id: "C-1003",
		firstName: "Maya",
		lastName: "Fernandes",
		email: "maya@enterprise.io",
		phone: "+1-555-0202",
		company: "Enterprise.io",
		jobTitle: "Head of Sales",
		industry: "SaaS",
		location: { city: "San Francisco", state: "CA", country: "USA" },
		demographics: { ageRange: "40-49", gender: "Female", tags: ["enterprise", "priority"] },
		plan: { name: "Enterprise", tier: "Tier 3", amount: 999, currency: "USD", billingCycle: "Monthly" },
		billing: { status: "Paid", lastPaymentDate: "2025-07-15", nextRenewalDate: "2025-08-15" },
		metadata: { createdAt: "2023-11-01", updatedAt: "2025-07-15" },
	},
];

export default function PaidClients() {
	const [clients] = useState(MOCK_CLIENTS);
	const [query, setQuery] = useState("");
	const [sortBy, setSortBy] = useState("name"); // name | renewal | status
	const [planFilter, setPlanFilter] = useState("All"); // All or plan name
	const [statusFilter, setStatusFilter] = useState("All"); // All | Paid | Overdue
	const [selected, setSelected] = useState(null);

	const plans = useMemo(() => ["All", ...Array.from(new Set(clients.map((c) => c.plan.name)))], [clients]);
	const statuses = useMemo(() => ["All", ...Array.from(new Set(clients.map((c) => c.billing.status)))], [clients]);

	const filtered = useMemo(
		() => {
			const q = query.trim().toLowerCase();
			let list = clients.filter((c) => {
				if (planFilter !== "All" && c.plan.name !== planFilter) return false;
				if (statusFilter !== "All" && c.billing.status !== statusFilter) return false;
				if (!q) return true;
				return (
					`${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
					(c.email || "").toLowerCase().includes(q) ||
					(c.company || "").toLowerCase().includes(q)
				);
			});

			if (sortBy === "name") {
				list.sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));
			} else if (sortBy === "renewal") {
				list.sort((a, b) => new Date(a.billing.nextRenewalDate) - new Date(b.billing.nextRenewalDate));
			} else if (sortBy === "status") {
				list.sort((a, b) => a.billing.status.localeCompare(b.billing.status));
			}
			return list;
		},
		[clients, query, sortBy, planFilter, statusFilter]
	);

	return (
		<div className="min-h-screen bg-slate-50 p-6">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
					<div>
						<h1 className="text-2xl font-semibold text-black">Paid Clients</h1>
						<p className="text-sm text-slate-600">Prototype: list of paid clients and quick details.</p>
					</div>
					<div className="flex items-center gap-3">
						<div className="text-sm text-slate-700">
							<div>Total clients</div>
							<div className="text-lg font-bold">{clients.length}</div>
						</div>
					</div>
				</div>

				{/* Controls */}
				<div className="bg-white border border-slate-200 p-4 rounded-md mb-6">
					<div className="flex flex-col md:flex-row md:items-center md:gap-4">
						<input
							aria-label="Search clients"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search by name, email or company..."
							className="flex-1 p-2 border border-slate-200 rounded-md bg-white"
						/>

						<div className="flex items-center gap-2 mt-3 md:mt-0">
							<label className="text-sm text-slate-600">Sort</label>
							<select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-2 border rounded-md">
								<option value="name">Name</option>
								<option value="renewal">Renewal date</option>
								<option value="status">Billing status</option>
							</select>

							<label className="text-sm text-slate-600">Plan</label>
							<select value={planFilter} onChange={(e) => setPlanFilter(e.target.value)} className="p-2 border rounded-md">
								{plans.map((p) => (
									<option key={p} value={p}>
										{p}
									</option>
								))}
							</select>

							<label className="text-sm text-slate-600">Status</label>
							<select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="p-2 border rounded-md">
								{statuses.map((s) => (
									<option key={s} value={s}>
										{s}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				{/* List: table on md+, cards on small screens */}
				<div>
					{/* Table (desktop) */}
					<div className="hidden md:block bg-white border border-slate-200 rounded-md overflow-hidden">
						<div className="grid grid-cols-7 text-sm bg-slate-100 text-slate-700 border-b">
							<div className="p-3 col-span-2 font-medium">Client</div>
							<div className="p-3">Client ID</div>
							<div className="p-3">Company</div>
							<div className="p-3">Contact</div>
							<div className="p-3">Plan</div>
							<div className="p-3">Billing</div>
							<div className="p-3">Renewal</div>
						</div>

						<div>
							{filtered.map((c) => (
								<div
									key={c.id}
									onClick={() => setSelected(c)}
									className="grid grid-cols-7 border-b hover:bg-slate-50 cursor-pointer"
								>
									<div className="p-3 col-span-2">
										<div className="font-medium text-black">
											{c.firstName} {c.lastName}
										</div>
										<div className="text-xs text-slate-600">{c.jobTitle}</div>
									</div>
									<div className="p-3 text-sm text-slate-700">{c.id}</div>
									<div className="p-3">{c.company}</div>
									<div className="p-3 text-sm text-slate-700">
										{c.email} • {c.phone}
									</div>
									<div className="p-3 text-sm">{c.plan.name}</div>
									<div className="p-3 text-sm">{c.billing.status}</div>
									<div className="p-3 text-sm">{c.billing.nextRenewalDate}</div>
								</div>
							))}
						</div>
					</div>

					{/* Cards (mobile) */}
					<div className="md:hidden grid grid-cols-1 gap-3">
						{filtered.map((c) => (
							<div
								key={c.id}
								onClick={() => setSelected(c)}
								className="bg-white border border-slate-200 p-4 rounded-md cursor-pointer"
							>
								<div className="flex items-center justify-between">
									<div>
										<div className="font-semibold text-black">
											{c.firstName} {c.lastName}
										</div>
										<div className="text-xs text-slate-600">
											{c.company} • {c.jobTitle}
										</div>
									</div>
									<div className="text-sm text-slate-700">{c.billing.status}</div>
								</div>
								<div className="mt-2 text-sm text-slate-600">
									{c.email} • {c.phone}
								</div>
								<div className="mt-2 text-sm">
									<span className="font-medium">Plan:</span> {c.plan.name} •{" "}
									<span className="font-medium">Renewal:</span> {c.billing.nextRenewalDate}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Details drawer */}
				{selected && (
					<>
						<div className="fixed inset-0 bg-black/40" onClick={() => setSelected(null)} />
						<aside className="fixed right-0 top-0 h-full w-full md:w-96 bg-white border-l border-slate-200 p-6 overflow-auto">
							<div className="flex items-start justify-between">
								<div>
									<div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center text-xl font-bold text-slate-700">
										{selected.firstName?.[0] || "C"}
									</div>
								</div>
								<button
									onClick={() => setSelected(null)}
									className="text-slate-600 px-2 py-1 rounded hover:bg-slate-100"
								>
									Close
								</button>
							</div>

							<h2 className="text-xl font-semibold mt-4">
								{selected.firstName} {selected.lastName}
							</h2>
							<div className="text-sm text-slate-600">{selected.id}</div>

							<div className="mt-4">
								<h3 className="font-medium">Contact</h3>
								<div className="text-sm text-slate-700 mt-1">
									{selected.email} • {selected.phone}
								</div>
							</div>

							<div className="mt-4">
								<h3 className="font-medium">Company</h3>
								<div className="text-sm text-slate-700 mt-1">
									{selected.company} — {selected.jobTitle}
								</div>
								<div className="text-sm text-slate-600 mt-1">
									{selected.industry} • {selected.location.city}
									{selected.location.state ? `, ${selected.location.state}` : ""} •{" "}
									{selected.location.country}
								</div>
							</div>

							<div className="mt-4">
								<h3 className="font-medium">Demographics</h3>
								<div className="text-sm text-slate-700 mt-1">
									Age: {selected.demographics?.ageRange || "-"}
								</div>
								<div className="text-sm text-slate-700">
									Gender: {selected.demographics?.gender || "-"}
								</div>
								<div className="mt-2 flex flex-wrap gap-2">
									{(selected.demographics?.tags || []).map((t) => (
										<span
											key={t}
											className="text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200"
										>
											#{t}
										</span>
									))}
								</div>
							</div>

							<div className="mt-4">
								<h3 className="font-medium">Billing Summary</h3>
								<div className="text-sm text-slate-700 mt-1">
									Plan: {selected.plan.name} ({selected.plan.tier})
								</div>
								<div className="text-sm text-slate-700">
									Amount: {selected.plan.currency} {selected.plan.amount} /{" "}
									{selected.plan.billingCycle}
								</div>
								<div className="text-sm text-slate-700">
									Last payment: {selected.billing.lastPaymentDate}
								</div>
								<div className="text-sm text-slate-700">
									Next renewal: {selected.billing.nextRenewalDate}
								</div>
								<div className="mt-3 flex gap-2">
									<button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
										Edit
									</button>
									<button className="px-3 py-1 border border-slate-200 rounded text-sm">
										Send invoice
									</button>
									<button className="px-3 py-1 border border-slate-200 rounded text-sm">
										Message
									</button>
								</div>
							</div>
						</aside>
					</>
				)}
			</div>
		</div>
	);
}

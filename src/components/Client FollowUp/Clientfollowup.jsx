import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

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
    notes: ["Called about renewal", "Waiting for proposal approval"]
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
    notes: ["Emailed contract draft", "Need to follow up next week"]
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
    notes: ["Discussed project scope", "Schedule design review"]
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
    notes: ["Requested budget details", "Need update by Friday"]
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
    notes: ["Sent product demo", "Follow up with technical doc"]
  }
];

export default function ClientFollowUpPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);

  const filtered = sampleClients.filter(c =>
    (filter === "All" ||
      (filter === "Overdue" && new Date(c.next.date) < new Date()) ||
      (filter === "Today" && c.next.date === new Date().toISOString().slice(0, 10)) ||
      (filter === "Upcoming" && new Date(c.next.date) > new Date())
    ) && (c.name.toLowerCase().includes(search.toLowerCase()) || c.contact.toLowerCase().includes(search.toLowerCase()))
  );

  const priorityColors = {
    High: "text-red-600 font-bold",
    Medium: "text-yellow-600 font-semibold",
    Low: "text-green-600"
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }} 
      className="p-6 space-y-6 min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="backdrop-blur-sm bg-white/60 rounded-3xl p-4 shadow-2xl">
        {/* Top bar */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center justify-between gap-2 bg-sky-200/80 p-4 rounded-2xl shadow-md">
          <h1 className="text-2xl font-extrabold text-sky-900 drop-shadow">Client Follow‑up</h1>
          <div className="flex gap-2">
            {['All','Overdue','Today','Upcoming'].map(f => (
              <Badge
                key={f}
                variant={filter===f?"default":"outline"}
                className={`cursor-pointer transition-transform duration-200 hover:scale-105 ${filter===f ? 'bg-sky-600 text-white' : 'bg-sky-100 text-sky-700 border-sky-300'}`}
                onClick={() => setFilter(f)}
              >{f}</Badge>
            ))}
            <Input className="border-sky-300 focus:border-sky-500" placeholder="Search clients..." value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
        </motion.div>

        {/* Table */}
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }} className="mt-6">
          <Card className="bg-white/80 backdrop-blur-md shadow-2xl border-sky-200 rounded-2xl overflow-hidden">
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-sky-200 bg-sky-100 text-sky-800">
                    <th className="p-3">Client</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Last Contacted</th>
                    <th className="p-3">Next Action</th>
                    <th className="p-3">Owner</th>
                    <th className="p-3">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(c => (
                    <motion.tr
                      key={c.name}
                      whileHover={{ scale: 1.02, backgroundColor: "#e0f7fa" }}
                      className="border-b border-sky-100 cursor-pointer transition-all"
                      onClick={()=>setSelectedClient(c)}
                    >
                      <td className="p-3 font-medium text-sky-800">{c.name}</td>
                      <td className="p-3">{c.contact}</td>
                      <td className="p-3">{c.last}</td>
                      <td className="p-3">{c.next.type} {c.next.date}</td>
                      <td className="p-3">{c.owner}</td>
                      <td className={`p-3 ${priorityColors[c.priority]}`}>{c.priority}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Drawer */}
      <Drawer open={!!selectedClient} onOpenChange={()=>setSelectedClient(null)}>
        <DrawerContent className="bg-white/90 backdrop-blur-xl">
          {selectedClient && (
            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="p-6 space-y-6">
              <DrawerHeader>
                <DrawerTitle className="text-2xl font-bold text-sky-700 drop-shadow-md">{selectedClient.name}</DrawerTitle>
              </DrawerHeader>
              <p><strong>Contact:</strong> {selectedClient.contact} ({selectedClient.email})</p>
              <div className="flex gap-2">
                <Button size="sm" className="bg-sky-600 hover:bg-sky-700 text-white transition-transform hover:scale-105"><Phone className="h-4 w-4 mr-1"/>Call</Button>
                <Button size="sm" variant="secondary" className="border-sky-300 text-sky-700 hover:bg-sky-200 transition-transform hover:scale-105"><Mail className="h-4 w-4 mr-1"/>Email</Button>
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-sky-800">Notes</h3>
                <ul className="list-disc pl-5 space-y-1 text-sky-700">
                  {selectedClient.notes.map((n,i)=>(<li key={i}>{n}</li>))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-sky-800">Add Follow‑up</h3>
                <div className="flex gap-2">
                  <Input placeholder="Type (Call/Email)" className="border-sky-300" />
                  <Input type="date" className="border-sky-300" />
                  <Input placeholder="Owner" className="border-sky-300" />
                  <Button className="bg-sky-600 hover:bg-sky-700 text-white transition-transform hover:scale-105">Add</Button>
                </div>
              </div>
            </motion.div>
          )}
        </DrawerContent>
      </Drawer>
    </motion.div>
  );
}

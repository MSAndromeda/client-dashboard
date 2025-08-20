import React, { useState } from "react";
import { Phone, Mail, MapPin, Edit, Save, X, Copy } from "lucide-react";
import { HeaderDetails } from "../components/ClientDetails/Header";

// --- Mock Data ---
const mockClients = [
  {
    id: "CLI-000123",
    firstName: "Jane",
    lastName: "Doe",
    dob: "1986-04-17",
    gender: "Female",
    phone: "+1-555-555-1212",
    email: "jane.doe@example.com",
    address: {
      line: "123 Market St",
      city: "San Francisco",
      state: "CA",
      postal: "94103",
    },
    status: "Active",
    createdAt: "2024-07-01T10:00:00Z",
    updatedAt: "2025-01-15T14:30:00Z",
    notes: "Prefers email contact. Follow-up in 3 months.",
  },
  {
    id: "CLI-000456",
    firstName: "John",
    lastName: "Smith",
    dob: "1990-10-05",
    gender: "Male",
    phone: "+1-444-123-4567",
    email: "john.smith@example.com",
    address: null,
    status: "Inactive",
    createdAt: "2024-08-11T09:00:00Z",
    updatedAt: "2025-02-10T16:45:00Z",
    notes: "No current engagement.",
  },
  {
    id: "CLI-000789",
    firstName: "Alice",
    lastName: "Wong",
    dob: "1975-02-12",
    gender: "Female",
    phone: "+1-333-789-6543",
    email: "alice.wong@example.com",
    address: {
      line: "456 Broadway",
      city: "New York",
      state: "NY",
      postal: "10012",
    },
    status: "Active",
    createdAt: "2024-09-21T14:00:00Z",
    updatedAt: "2025-03-05T11:20:00Z",
    notes: "High-priority client.",
  },
];

// --- Utility ---
function getAge(dob) {
  const diff = Date.now() - new Date(dob).getTime();
  return Math.abs(new Date(diff).getUTCFullYear() - 1970);
}

export default function ClientDetails() {
  const [client, setClient] = useState(mockClients[0]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(client);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    setClient(formData);
    setEditMode(false);
  };

  return (
    <div className="w-full">
      {/* Header Card */}
      <HeaderDetails client={client} handleSave={handleSave}/>
      

      {/* Body Two Column */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Demographic */}
        <div className="shadow-md bg-white rounded-2xl p-4 space-y-2">
          <h3 className="font-semibold text-black">Demographics</h3>
          {editMode ? (
            <>
              <label className="block text-sm">
                Date of Birth
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  className="w-full border rounded p-1 mt-1"
                />
              </label>
              <label className="block text-sm">
                Gender
                <input
                  value={formData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="w-full border rounded p-1 mt-1"
                />
              </label>
            </>
          ) : (
            <>
              <p>
                <span className="font-medium">Age:</span> {getAge(client.dob)}
              </p>
              <p>
                <span className="font-medium">Gender:</span> {client.gender}
              </p>
            </>
          )}
        </div>

        {/* Contact */}
        <div className="shadow-md bg-white rounded-2xl p-4 space-y-2">
          <h3 className="font-semibold text-black">Contact</h3>
          {editMode ? (
            <>
              <label className="block text-sm">
                Phone
                <input
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full border rounded p-1 mt-1"
                />
              </label>
              <label className="block text-sm">
                Email
                <input
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full border rounded p-1 mt-1"
                />
              </label>
              <label className="block text-sm">
                Address
                <input
                  value={formData.address?.line || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, line: e.target.value },
                    })
                  }
                  className="w-full border rounded p-1 mt-1"
                />
              </label>
            </>
          ) : (
            <>
              <p className="flex items-center text-blue-500">
                <Phone size={16} className="mr-1" />
                <a href={`tel:${client.phone}`}>{client.phone}</a>
              </p>
              <p className="flex items-center text-blue-500">
                <Mail size={16} className="mr-1" />
                <a href={`mailto:${client.email}`}>{client.email}</a>
              </p>
              <p className="flex items-center text-blue-500">
                <MapPin size={16} className="mr-1" />
                {client.address
                  ? `${client.address.line}, ${client.address.city}, ${client.address.state} ${client.address.postal}`
                  : "No address on file"}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="shadow-md bg-white rounded-2xl p-4">
        <h3 className="font-semibold text-black">Notes</h3>
        {editMode ? (
          <input
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            className="w-full border rounded p-1 mt-1"
          />
        ) : (
          <p className="text-slate-700">{client.notes}</p>
        )}
      </div>
    </div>
  );
}



// src/App.js (or a similar root component)
import React, { useState, useEffect } from 'react';
import ClientList from './components/ClientList';
import ClientDrawer from './components/ClientDrawer';
import Header from './components/Header'; // You'll create this component
import './App.css'; // For basic styling

// Sample Data (replace with API calls later)
const initialClients = [
    {
        id: '1',
        name: 'Acme Corp',
        contact: 'John Doe - john.doe@acmecorp.com',
        lastContacted: '2025-08-01',
        nextAction: { type: 'Call', date: '2025-08-21' },
        owner: 'Priya',
        priority: 'High',
        notes: [
            { date: '2025-07-25', text: 'Initial contact via email.' },
            { date: '2025-08-01', text: 'Follow-up call to discuss proposal.' },
        ],
    },
    {
        id: '2',
        name: 'Beta LLC',
        contact: 'Sarah Li - sarah.li@betallc.com',
        lastContacted: '2025-07-28',
        nextAction: { type: 'Email', date: '2025-08-19' },
        owner: 'Raj',
        priority: 'Medium',
        notes: [
            { date: '2025-07-20', text: 'Met at industry event.' },
            { date: '2025-07-28', text: 'Sent follow-up email with brochure.' },
        ],
    },
    {
        id: '3',
        name: 'Gamma Corp',
        contact: 'David Chan - david.chan@gammacorp.com',
        lastContacted: '2025-08-05',
        nextAction: { type: 'Meeting', date: '2025-08-22' },
        owner: 'Priya',
        priority: 'High',
        notes: [
            { date: '2025-08-01', text: 'Discussed requirements for new project.' },
            { date: '2025-08-05', text: 'Confirmed meeting for next week.' },
        ],
    },
    {
        id: '4',
        name: 'Delta Inc',
        contact: 'Emily White - emily.white@deltainc.com',
        lastContacted: '2025-08-10',
        nextAction: { type: 'Call', date: '2025-08-18' },
        owner: 'Raj',
        priority: 'Low',
        notes: [{ date: '2025-08-10', text: 'Sent proposal, awaiting feedback.' }],
    },
    {
        id: '5',
        name: 'Epsilon Co',
        contact: 'Michael Brown - michael.brown@epsilonco.com',
        lastContacted: '2025-08-12',
        nextAction: { type: 'Email', date: '2025-08-20' },
        owner: 'Priya',
        priority: 'Medium',
        notes: [{ date: '2025-08-12', text: 'Responded to initial inquiry.' }],
    },
    {
        id: '6',
        name: 'Zeta Ltd',
        contact: 'Jessica Green - jessica.green@zetaltd.com',
        lastContacted: '2025-07-30',
        nextAction: { type: 'Meeting', date: '2025-08-25' },
        owner: 'Raj',
        priority: 'High',
        notes: [{ date: '2025-07-30', text: 'Introduced product features.' }],
    },
];

const App = () => {
    const [clients, setClients] = useState(initialClients);
    const [selectedClient, setSelectedClient] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All'); // All, Overdue, Today, Upcoming

    // Filter Logic
    const getFilteredClients = () => {
        let filtered = clients;

        // Apply search term
        if (searchTerm) {
            filtered = filtered.filter(
                (client) =>
                    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    client.owner.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply filters
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to start of day
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const upcomingStart = new Date(tomorrow);
        upcomingStart.setDate(upcomingStart.getDate() + 1);

        switch (filter) {
            case 'Overdue':
                filtered = filtered.filter(
                    (client) =>
                        client.nextAction && new Date(client.nextAction.date) < today
                );
                break;
            case 'Today':
                filtered = filtered.filter(
                    (client) =>
                        client.nextAction &&
                        new Date(client.nextAction.date) >= today &&
                        new Date(client.nextAction.date) < tomorrow
                );
                break;
            case 'Upcoming':
                filtered = filtered.filter(
                    (client) =>
                        client.nextAction && new Date(client.nextAction.date) >= upcomingStart
                );
                break;
            default:
                // "All" clients, no specific date filtering needed beyond search
                break;
        }

        return filtered;
    };

    const handleClientSelect = (clientId) => {
        setSelectedClient(clients.find((c) => c.id === clientId));
    };

    const handleCloseDrawer = () => {
        setSelectedClient(null);
    };

    const handleAddFollowUp = (clientId, newFollowUp) => {
        setClients(
            clients.map((client) =>
                client.id === clientId
                    ? {
                          ...client,
                          nextAction: {
                              type: newFollowUp.type,
                              date: newFollowUp.date,
                          },
                          owner: newFollowUp.owner, // Update owner for next action
                          notes: [
                              ...client.notes,
                              { date: new Date().toISOString().slice(0, 10), text: `Added new follow-up: ${newFollowUp.type} on ${newFollowUp.date}` },
                          ],
                      }
                    : client
            )
        );
        setSelectedClient(null); // Close drawer after adding follow-up
    };

    const handleMarkDone = (clientId) => {
        setClients(
            clients.map((client) =>
                client.id === clientId
                    ? {
                          ...client,
                          nextAction: null, // Clear next action
                          lastContacted: new Date().toISOString().slice(0, 10), // Update last contacted date
                          notes: [
                              ...client.notes,
                              { date: new Date().toISOString().slice(0, 10), text: 'Follow-up marked as done.' },
                          ],
                      }
                    : client
            )
        );
    };

    const handleQuickCall = (contact) => {
        alert(`Initiating call with: ${contact}`);
    };

    const handleQuickEmail = (contact) => {
        alert(`Opening email to: ${contact}`);
    };

    return (
        <div className="app-container">
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} filter={filter} setFilter={setFilter} />

            <div className="main-content">
                <ClientList clients={getFilteredClients()} onClientSelect={handleClientSelect} />
            </div>

            {selectedClient && (
                <ClientDrawer
                    client={selectedClient}
                    onClose={handleCloseDrawer}
                    onAddFollowUp={handleAddFollowUp}
                    onMarkDone={handleMarkDone}
                    onQuickCall={handleQuickCall}
                    onQuickEmail={handleQuickEmail}
                />
            )}
        </div>
    );
};

export default App;

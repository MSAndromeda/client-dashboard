import React, { useState, useMemo } from "react";

const initialMockNotes = [
  {
    id: 1,
    title: "Outreach",
    content: "Reached out to 5 new clients via email.",
    tags: ["email", "outreach"],
    pinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metrics: { newLeads: 5, meetings: 0, conversions: 0, source: "email" },
  },
  {
    id: 2,
    title: "Meeting",
    content: "Scheduled a meeting with Acme Corp for next week.",
    tags: ["meeting", "acme"],
    pinned: true,
    createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    metrics: { newLeads: 2, meetings: 1, conversions: 1, source: "referral" },
  },
  {
    id: 3,
    title: "Follow-up",
    content: "Followed up with pending leads.",
    tags: ["followup"],
    pinned: false,
    createdAt: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(), // 10 days ago
    updatedAt: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(),
    metrics: { newLeads: 3, meetings: 1, conversions: 0, source: "cold-call" },
  },
];

const ClientAquesitionStats = () => {
  const [notes, setNotes] = useState(initialMockNotes);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteTags, setNoteTags] = useState("");
  const [metricLeads, setMetricLeads] = useState("");
  const [metricMeetings, setMetricMeetings] = useState("");
  const [metricConversions, setMetricConversions] = useState("");
  const [metricSource, setMetricSource] = useState("");
  const [editingId, setEditingId] = useState(null);

  // new UI state
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(null); // string or null
  const [period, setPeriod] = useState("all"); // 'all' | '7' | '30'

  const resetForm = () => {
    setNoteTitle("");
    setNoteContent("");
    setNoteTags("");
    setMetricLeads("");
    setMetricMeetings("");
    setMetricConversions("");
    setMetricSource("");
    setEditingId(null);
  };

  const handleCreateOrUpdate = () => {
    const title = noteTitle.trim();
    const content = noteContent.trim();
    const tags = noteTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const metrics = {
      newLeads: Number(metricLeads) || 0,
      meetings: Number(metricMeetings) || 0,
      conversions: Number(metricConversions) || 0,
      source: metricSource.trim() || "",
    };

    if (!title) {
      // minimal validation: title required
      alert("Title is required");
      return;
    }

    const now = new Date().toISOString();

    if (editingId) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingId
            ? {
                ...n,
                title,
                content,
                tags,
                updatedAt: now,
                metrics,
              }
            : n
        )
      );
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
        tags,
        pinned: false,
        createdAt: now,
        updatedAt: now,
        metrics,
      };
      setNotes((prev) => [newNote, ...prev]);
    }
    resetForm();
  };

  const handleEdit = (note) => {
    setEditingId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteTags((note.tags || []).join(", "));
    setMetricLeads(String((note.metrics && note.metrics.newLeads) || ""));
    setMetricMeetings(String((note.metrics && note.metrics.meetings) || ""));
    setMetricConversions(
      String((note.metrics && note.metrics.conversions) || "")
    );
    setMetricSource((note.metrics && note.metrics.source) || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this note? This cannot be undone.")) return;
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (editingId === id) resetForm();
  };

  const togglePin = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  };

  // derived values: filter by period, query, tag
  const filteredNotes = useMemo(() => {
    const now = Date.now();
    let cutoff = 0;
    if (period === "7") cutoff = now - 7 * 24 * 3600 * 1000;
    else if (period === "30") cutoff = now - 30 * 24 * 3600 * 1000;

    return notes.filter((n) => {
      if (cutoff && new Date(n.createdAt).getTime() < cutoff) return false;
      if (selectedTag && !(n.tags || []).includes(selectedTag)) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      const inTitle = n.title.toLowerCase().includes(q);
      const inContent = n.content.toLowerCase().includes(q);
      const inTags = (n.tags || []).some((t) => t.toLowerCase().includes(q));
      return inTitle || inContent || inTags;
    });
  }, [notes, query, selectedTag, period]);

  // pinned + others based on filteredNotes to reflect filters
  const pinned = filteredNotes.filter((n) => n.pinned);
  const others = filteredNotes.filter((n) => !n.pinned);

  // totals for header (sums over filtered notes)
  const totals = useMemo(() => {
    const totalLeads = filteredNotes.reduce(
      (s, n) => s + ((n.metrics && Number(n.metrics.newLeads)) || 0),
      0
    );
    const totalConversions = filteredNotes.reduce(
      (s, n) => s + ((n.metrics && Number(n.metrics.conversions)) || 0),
      0
    );
    const conversionRate =
      totalLeads > 0
        ? ((totalConversions / totalLeads) * 100).toFixed(1) + "%"
        : "-";
    return { totalLeads, totalConversions, conversionRate };
  }, [filteredNotes]);

  // unique tags from all notes
  const allTags = useMemo(() => {
    const set = new Set();
    notes.forEach((n) => (n.tags || []).forEach((t) => set.add(t)));
    return Array.from(set);
  }, [notes]);

  return (
    <div className="h-fit w-full bg-slate-100 p-8 text-black">
      <div className="max-w-6xl mx-auto">
        {/* Header: Title + period selector + totals */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Client Acquisition Notes</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white p-2 rounded border border-slate-200">
              <button
                onClick={() => setPeriod("all")}
                className={`px-3 py-1 rounded ${
                  period === "all" ? "bg-blue-600 text-white" : "text-slate-700"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setPeriod("7")}
                className={`px-3 py-1 rounded ${
                  period === "7" ? "bg-blue-600 text-white" : "text-slate-700"
                }`}
              >
                Last 7d
              </button>
              <button
                onClick={() => setPeriod("30")}
                className={`px-3 py-1 rounded ${
                  period === "30" ? "bg-blue-600 text-white" : "text-slate-700"
                }`}
              >
                Last 30d
              </button>
            </div>

            <div className="bg-white p-3 rounded border border-slate-200 text-center">
              <div className="text-sm text-slate-600">Total leads</div>
              <div className="text-lg font-semibold">{totals.totalLeads}</div>
            </div>
            <div className="bg-white p-3 rounded border border-slate-200 text-center">
              <div className="text-sm text-slate-600">Total conversions</div>
              <div className="text-lg font-semibold">
                {totals.totalConversions}
              </div>
            </div>
            <div className="bg-white p-3 rounded border border-slate-200 text-center">
              <div className="text-sm text-slate-600">Conversion rate</div>
              <div className="text-lg font-semibold">
                {totals.conversionRate}
              </div>
            </div>
          </div>
        </div>

        {/* Top: full-width Take a Note form */}
        <div className="bg-white rounded-2xl p-6 shadow border border-slate-200 mb-6">
          <h2 className="text-xl font-semibold mb-4">Take a Note</h2>

          {/* Row layout: Title | Content */}
          <div className="flex flex-col gap-4 items-start">
            <div className="w-full">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Title
              </label>
              <input
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Add a short title"
                aria-label="Note title"
                className="w-full p-3 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50 text-black"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Content
              </label>
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows={4}
                placeholder="Write details..."
                aria-label="Note content"
                className="w-full p-3 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50 text-black resize-y h-28"
              />
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Tags (comma)
                </label>
                <input
                  value={noteTags}
                  onChange={(e) => setNoteTags(e.target.value)}
                  placeholder="e.g. email, outreach"
                  className="w-full p-2 border border-slate-200 rounded bg-slate-50"
                />
              </div>

              <div className="flex gap-2">
                <div className="w-1/3">
                  <label className="block text-sm text-slate-700 mb-1">
                    New leads
                  </label>
                  <input
                    value={metricLeads}
                    onChange={(e) =>
                      setMetricLeads(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="0"
                    className="w-full p-2 border border-slate-200 rounded bg-slate-50"
                  />
                </div>
                <div className="w-1/3">
                  <label className="block text-sm text-slate-700 mb-1">
                    Meetings
                  </label>
                  <input
                    value={metricMeetings}
                    onChange={(e) =>
                      setMetricMeetings(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="0"
                    className="w-full p-2 border border-slate-200 rounded bg-slate-50"
                  />
                </div>
                <div className="w-1/3">
                  <label className="block text-sm text-slate-700 mb-1">
                    Conversions
                  </label>
                  <input
                    value={metricConversions}
                    onChange={(e) =>
                      setMetricConversions(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="0"
                    className="w-full p-2 border border-slate-200 rounded bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Source
                </label>
                <input
                  value={metricSource}
                  onChange={(e) => setMetricSource(e.target.value)}
                  placeholder="e.g. email, referral"
                  className="w-full p-2 border border-slate-200 rounded bg-slate-50"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-4 justify-end">
            <button
              onClick={handleCreateOrUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
            >
              {editingId ? "Update Note" : "Create Note"}
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2 border border-slate-300 rounded bg-white text-black"
            >
              Clear
            </button>
            {editingId && (
              <button
                onClick={() => handleDelete(editingId)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            )}
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Mock frontend — actions update local UI only.
          </p>
        </div>

        {/* Search + tag filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 w-full md:w-1/2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, content or tags..."
              className="w-full p-2 border border-slate-200 rounded bg-white"
            />
            <button
              onClick={() => {
                setQuery("");
                setSelectedTag(null);
              }}
              className="px-3 py-1 border border-slate-200 rounded bg-white"
            >
              Clear
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-slate-600 mr-2">Tags:</span>
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-2 py-1 rounded ${
                selectedTag === null
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-slate-200"
              }`}
            >
              All
            </button>
            {allTags.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTag(selectedTag === t ? null : t)}
                className={`px-2 py-1 rounded ${
                  selectedTag === t
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-slate-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Notes: kept layout (pinned above, all below) */}
        <div className="space-y-6">
          {/* Pinned section */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Pinned</h3>
              <span className="text-sm text-slate-600">
                {pinned.length} pinned
              </span>
            </div>

            {pinned.length === 0 ? (
              <div className="p-4 rounded bg-white border border-slate-200 text-slate-600">
                No pinned notes
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {pinned.map((n) => (
                  <div
                    key={n.id}
                    className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-blue-600">{n.title}</h4>
                        <span className="text-xs text-slate-500">
                          {new Date(n.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-black">{n.content}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(n.tags || []).map((t) => (
                          <span
                            key={t}
                            onClick={() => setSelectedTag(t)}
                            className="text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200 cursor-pointer"
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
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => togglePin(n.id)}
                        className="text-sm px-2 py-1 rounded bg-slate-100 border border-slate-200 text-black"
                      >
                        Unpin
                      </button>
                      <button
                        onClick={() => handleEdit(n)}
                        className="text-sm px-2 py-1 rounded bg-blue-600 text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(n.id)}
                        className="text-sm px-2 py-1 rounded bg-red-500 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* All notes section */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">All Notes</h3>
              <span className="text-sm text-slate-600">
                {others.length} notes
              </span>
            </div>

            {others.length === 0 ? (
              <div className="p-4 rounded bg-white border border-slate-200 text-slate-600">
                No notes yet
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {others.map((n) => (
                  <div
                    key={n.id}
                    className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-blue-600">{n.title}</h4>
                        <span className="text-xs text-slate-500">
                          {new Date(n.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-black">{n.content}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(n.tags || []).map((t) => (
                          <span
                            key={t}
                            onClick={() => setSelectedTag(t)}
                            className="text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200 cursor-pointer"
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
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => togglePin(n.id)}
                        className="text-sm px-2 py-1 rounded bg-slate-100 border border-slate-200 text-black"
                      >
                        Pin
                      </button>
                      <button
                        onClick={() => handleEdit(n)}
                        className="text-sm px-2 py-1 rounded bg-blue-600 text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(n.id)}
                        className="text-sm px-2 py-1 rounded bg-red-500 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ClientAquesitionStats;

import { Copy, Edit, Save, X } from 'lucide-react';
import { useState } from 'react';
export const HeaderDetails = ({client, handleSave}) => {
    const [editMode, setEditMode] = useState(false);
    
  return (
    <div className="shadow-md bg-slate-100 rounded-2xl p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
          {client.firstName[0]}
          {client.lastName[0]}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-black">
            {client.firstName} {client.lastName}
          </h2>
          <p className="text-sm text-slate-700 flex items-center">
            {client.id}
            <button
              onClick={() => navigator.clipboard.writeText(client.id)}
              className="ml-1 text-blue-500"
            >
              <Copy size={14} />
            </button>
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <span
          className={`px-2 py-1 rounded text-white text-sm ${
            client.status === "Active" ? "bg-blue-500" : "bg-black"
          }`}
        >
          {client.status}
        </span>
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-3 py-1 rounded flex items-center"
            >
              <Save size={16} className="mr-1" /> Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="border border-slate-400 px-3 py-1 rounded flex items-center"
            >
              <X size={16} className="mr-1" /> Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded flex items-center"
          >
            <Edit size={16} className="mr-1" /> Edit
          </button>
        )}
      </div>
    </div>
  );
};

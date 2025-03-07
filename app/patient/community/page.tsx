"use client";

import { useState, useEffect } from "react";

interface Request {
  id: string;
  name: string;
  description: string;
  createdAt?: { seconds: number; nanoseconds: number };
  replies: { name: string; message: string }[];
}

export default function CommunityPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    const res = await fetch("/api/community");
    const data = await res.json();
    setRequests(data);
  }

  async function submitRequest() {
    if (!name || !description) return alert("Fill all fields!");

    await fetch("/api/community/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });

    fetchRequests();
    setName("");
    setDescription("");
  }

  async function submitReply(requestId: string, replyName: string, replyMessage: string) {
    if (!replyName || !replyMessage) return alert("Fill all fields!");

    await fetch("/api/community/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId, name: replyName, message: replyMessage }),
    });

    fetchRequests();
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Community Center</h1>

      {/* Submit Request Form */}
      <div className="bg-white p-4 shadow-md rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Submit a Help Request</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <textarea
          placeholder="Describe your request"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button onClick={submitRequest} className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>

      {/* Display Requests */}
      <h2 className="text-xl font-semibold mb-2">Help Requests</h2>
      {requests.map((req) => (
        <div key={req.id} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
          <strong>{req.name}</strong>
          <p>{req.description}</p>
          <div className="mt-2">
            <input type="text" placeholder="Your Name" className="border p-1" id={`name-${req.id}`} />
            <input type="text" placeholder="Your Message" className="border p-1 ml-2" id={`message-${req.id}`} />
            <button
              onClick={() => {
                const replyName = (document.getElementById(`name-${req.id}`) as HTMLInputElement).value;
                const replyMessage = (document.getElementById(`message-${req.id}`) as HTMLInputElement).value;
                submitReply(req.id, replyName, replyMessage);
              }}
              className="bg-green-500 text-white px-2 py-1 ml-2 rounded"
            >
              Reply
            </button>
          </div>
          {req.replies?.map((reply, idx) => (
            <p key={idx} className="ml-4 text-gray-700">
              <strong>{reply.name}:</strong> {reply.message}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

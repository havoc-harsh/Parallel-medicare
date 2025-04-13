import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseadmin";

export async function POST(req: Request) {
  try {
    const { requestId, name, message } = await req.json();

    if (!requestId || !name || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const requestRef = db.collection("requests").doc(requestId);
    const docSnapshot = await requestRef.get();
    
    // Handle undefined data safely
    const currentReplies = docSnapshot.exists ? (docSnapshot.data()?.replies || []) : [];
    
    await requestRef.update({
      replies: [...currentReplies, { name, message }]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reply error:", error);
    return NextResponse.json({ error: "Failed to submit reply" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { fetchGoogleReviews } from "@/lib/googleReviews";
import { updateReviews } from "@/lib/updateReviews";

export async function POST() {
  try {
    const reviews = await fetchGoogleReviews();
    await updateReviews(reviews);

    return NextResponse.json({
      code: "SUCCESS!",
      message: "Google reviews have successfully updated.",
    });
  } catch (e) {
    console.error("Error updating reviews:", e);
    return NextResponse.json({
      code: "ERROR",
      message: "Failed to update google reviews.",
    });
  }
}

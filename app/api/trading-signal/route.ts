import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://tradingview-webhook-trader-iota.vercel.app/api/status")
    const data = await response.json()
    return NextResponse.json({ signal: data.signal })
  } catch (error) {
    console.error("Error fetching trading signal:", error)
    return NextResponse.json({ error: "Failed to fetch trading signal" }, { status: 500 })
  }
}


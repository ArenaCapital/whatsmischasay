"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"

interface SignalData {
  signal: "BUY" | "SELL"
  updatedAt: number
}

export default function TradingSignal() {
  const [signalData, setSignalData] = useState<SignalData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchSignal = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/trading-signal")
      const data = await response.json()
      setSignalData({
        signal: data.status.items.status.toUpperCase() as "BUY" | "SELL",
        updatedAt: data.status.updatedAt,
      })
    } catch (error) {
      console.error("Error fetching signal:", error)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchSignal()
    const interval = setInterval(fetchSignal, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [fetchSignal])

  const formatTimestamp = (timestamp: number) => {
    return format(new Date(timestamp), "MMM d, yyyy HH:mm:ss")
  }

  return (
    <div className="relative w-full max-w-2xl">
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-white text-4xl font-bold text-center"
          >
            Loading...
          </motion.div>
        ) : signalData ? (
          <motion.div
            key={signalData.signal}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex flex-col items-center"
          >
            <div
              className={`w-64 h-64 rounded-full flex items-center justify-center mb-4 ${
                signalData.signal === "BUY" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                className="text-white text-6xl font-extrabold"
              >
                {signalData.signal}
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white text-xl">
              Updated: {formatTimestamp(signalData.updatedAt)}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="absolute inset-0 bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-full -z-10"></div>
      <motion.div
        className="absolute inset-0 rounded-full -z-20"
        animate={{
          background: [
            "radial-gradient(circle, rgba(255,0,0,0.5) 0%, rgba(0,0,255,0.5) 100%)",
            "radial-gradient(circle, rgba(0,0,255,0.5) 0%, rgba(255,0,0,0.5) 100%)",
          ],
        }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "linear" }}
      ></motion.div>
    </div>
  )
}

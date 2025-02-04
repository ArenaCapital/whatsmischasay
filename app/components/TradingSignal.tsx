"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function TradingSignal() {
  const [signal, setSignal] = useState<"BUY" | "SELL" | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchSignal = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/trading-signal")
      const data = await response.json()
      setSignal(data.signal === "buy" ? "BUY" : "SELL")
    } catch (error) {
      console.error("Error fetching signal:", error)
      setSignal(null)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSignal()
    const interval = setInterval(fetchSignal, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [fetchSignal]) // Added fetchSignal to dependencies

  return (
    <div className="relative w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-black text-4xl font-bold text-center"
          >
            Loading...
          </motion.div>
        ) : signal ? (
          <motion.div
            key={signal}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`w-full aspect-square rounded-full flex items-center justify-center ${
              signal === "BUY" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              className="text-white text-8xl font-extrabold"
            >
              {signal}
            </motion.div>
          </motion.div>
        ) : (
          <div className="text-black text-4xl font-bold text-center">Failed to fetch signal</div>
        )}
      </AnimatePresence>
    </div>
  )
}


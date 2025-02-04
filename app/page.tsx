import TradingSignal from "./components/TradingSignal"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-purple-600 to-blue-600">
      <TradingSignal />
    </main>
  )
}


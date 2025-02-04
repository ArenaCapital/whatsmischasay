import TradingSignal from "./components/TradingSignal"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100 text-black">
      <h1 className="text-4xl font-bold mb-8">Mischa Says....</h1>
      <TradingSignal />
      <p className="mt-8 text-xl">Dont be late to the party!</p>
    </div>
  )
}


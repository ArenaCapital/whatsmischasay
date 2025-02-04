import TradingSignal from "./components/TradingSignal"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100 text-black">
      <h1 className="text-4xl font-bold mb-8">Trading Signal SPA</h1>
      <TradingSignal />
      <p className="mt-8 text-xl">If you can see this, the app is working!</p>
    </main>
  )
}


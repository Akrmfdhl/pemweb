import { CreditCardForm } from "@/components/ui/payment-card"

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <CreditCardForm />
      </div>
    </div>
  )
}

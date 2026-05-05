"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Shield, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /[0-9]/.test(password) },
    { label: "12+ characters", pass: password.length >= 12 },
  ]
  const score = checks.filter((c) => c.pass).length
  const colors = ["bg-red-400", "bg-red-400", "bg-amber-400", "bg-green-500", "bg-green-600"]

  if (!password) return null
  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= score ? colors[score] : "bg-border"}`} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1">
        {checks.map((c) => (
          <div key={c.label} className={`flex items-center gap-1 text-xs ${c.pass ? "text-green-600" : "text-muted-foreground"}`}>
            <CheckCircle className={`w-3 h-3 ${c.pass ? "opacity-100" : "opacity-30"}`} />
            {c.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="min-h-screen flex">
      {/* ── Left Marketing Pane ── */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[520px] flex-col bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />

        <div className="relative flex-1 flex flex-col p-10 xl:p-14">
          <Link href="/" className="flex items-center gap-2.5 mb-auto">
            <Image src="/wasopay-logo.png" alt="WasoPay" height={32} width={32} className="h-8 w-8 object-contain brightness-0 invert" priority />
            <span className="font-bold text-lg text-white">WasoPay</span>
          </Link>

          <div className="py-12">
            <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-3 py-1.5 mb-8">
              <Shield className="w-3.5 h-3.5" />
              <span className="text-xs font-medium uppercase tracking-wide">Zero fees for 30 days</span>
            </div>

            <h2 className="font-serif text-4xl xl:text-5xl leading-tight mb-6">
              Your first trade is on us
            </h2>

            <p className="text-primary-foreground/75 text-base leading-relaxed mb-10">
              Sign up with your phone number. KYC takes about 4 minutes. Start trading USDT, BTC, and ETH instantly.
            </p>

            <div className="space-y-3">
              {[
                "Multi-sig escrow on every trade",
                "92-second average release time",
                "BVN-verified merchants only",
                "NIBSS real-time settlement",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-white/70 flex-none" />
                  <span className="text-sm text-white/80">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Form Pane ── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-background">
        <div className="w-full max-w-[400px] space-y-6">
          <div className="lg:hidden">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/wasopay-logo.png" alt="WasoPay" height={32} width={32} className="h-8 w-8 object-contain" priority />
              <span className="font-bold text-lg">WasoPay</span>
            </Link>
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-1">Create account</h1>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="fname">First name</Label>
                <Input id="fname" placeholder="Adaeze" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lname">Last name</Label>
                <Input id="lname" placeholder="Okafor" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone number</Label>
              <Input id="phone" type="tel" placeholder="+234 800 000 0000" autoComplete="tel" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="adaeze@example.com" autoComplete="email" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(v) => setAgreed(!!v)}
                className="mt-0.5"
              />
              <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-relaxed">
                I agree to the{" "}
                <Link href="/legal/terms" className="text-primary hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/legal/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={!agreed}>
              Create account
            </Button>
          </form>

          <div className="flex gap-2.5 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-none mt-0.5" />
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              We will <strong>never</strong> call you to ask for your password or 2FA code.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Shield, AlertTriangle } from "lucide-react"
import Link from "next/link"

function PasswordStrength({ password }: { password: string }) {
  const score = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    password.length >= 12,
  ].filter(Boolean).length

  const colors = ["bg-red-400", "bg-red-400", "bg-amber-400", "bg-green-500", "bg-green-600"]
  const labels = ["", "Weak", "Fair", "Good", "Strong"]

  if (!password) return null
  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= score ? colors[score] : "bg-border"}`} />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {labels[score]}
        {score >= 3 && " — uses number, capital, 12+ chars"}
      </p>
    </div>
  )
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [trustDevice, setTrustDevice] = useState(false)

  return (
    <div className="min-h-screen flex">
      {/* ── Left Marketing Pane ── */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[520px] flex-col bg-primary text-primary-foreground relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />

        <div className="relative flex-1 flex flex-col p-10 xl:p-14">
          {/* Logo */}
          <Link href="/" className="mb-auto">
            <Image src="/wasopay-logo.png" alt="WasoPay" height={32} width={140} className="h-8 w-auto brightness-0 invert" priority />
          </Link>

          <div className="py-12">
            <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-3 py-1.5 mb-8">
              <Shield className="w-3.5 h-3.5" />
              <span className="text-xs font-medium uppercase tracking-wide">Secured by multi-sig escrow</span>
            </div>

            <h2 className="font-serif text-4xl xl:text-5xl leading-tight mb-6">
              The fastest way to trade USDT in Nigeria
            </h2>

            <p className="text-primary-foreground/75 text-base leading-relaxed mb-10">
              Over ₦184 billion traded last month. 92-second average release. Join 14,200 verified merchants.
            </p>

            <div className="flex flex-wrap gap-2">
              {["SEC ARIP Provisional", "NDPR Compliant", "NIBSS Partner"].map((b) => (
                <span key={b} className="text-xs px-3 py-1.5 rounded-full bg-white/15 text-white/90">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Form Pane ── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-background">
        <div className="w-full max-w-[400px] space-y-6">
          {/* Mobile logo */}
          <div className="lg:hidden">
            <Link href="/">
              <Image src="/wasopay-logo.png" alt="WasoPay" height={32} width={140} className="h-8 w-auto" priority />
            </Link>
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              New here?{" "}
              <Link href="/auth/register" className="text-primary hover:underline font-medium">
                Create an account
              </Link>
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <Label htmlFor="identifier">Phone or email</Label>
              <Input id="identifier" type="text" placeholder="+234 800 000 0000" autoComplete="username" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/auth/forgot" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
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

            <div className="flex items-center gap-2">
              <Checkbox
                id="trust"
                checked={trustDevice}
                onCheckedChange={(v) => setTrustDevice(!!v)}
              />
              <Label htmlFor="trust" className="text-sm font-normal cursor-pointer">
                Trust this device for 30 days
              </Label>
            </div>

            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 border-t border-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 border-t border-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="bg-transparent" type="button">
              SMS code
            </Button>
            <Button variant="outline" className="bg-transparent" type="button">
              Email link
            </Button>
          </div>

          {/* Security notice */}
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

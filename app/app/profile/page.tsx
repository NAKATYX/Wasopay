"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Upload,
  AlertTriangle,
  Smartphone,
  Monitor,
  Shield,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

const TIERS = [
  {
    n: 1,
    label: "Basic",
    limit: "₦200K / day",
    items: ["Phone number", "Email"],
    done: true,
    current: false,
  },
  {
    n: 2,
    label: "Standard",
    limit: "₦5M / day",
    lifetime: "₦80M lifetime",
    items: ["BVN", "Government ID", "Selfie"],
    done: true,
    current: true,
  },
  {
    n: 3,
    label: "Enhanced",
    limit: "₦50M / day",
    items: ["Address proof", "Source of funds"],
    done: false,
    current: false,
  },
  {
    n: 4,
    label: "Institutional",
    limit: "Unlimited",
    items: ["CAC documents", "Director IDs", "Compliance call"],
    done: false,
    current: false,
  },
]

const DOCUMENTS = [
  {
    id: "address",
    label: "Proof of address",
    hint: "Utility bill or bank statement (last 3 months)",
    status: "verified" as const,
    filename: "utility-bill.pdf",
  },
  {
    id: "funds",
    label: "Source of funds declaration",
    hint: "Salary slip, business registration, or investment statement",
    status: "review" as const,
    filename: undefined,
  },
  {
    id: "selfie",
    label: "Selfie with ID",
    hint: "Hold your ID next to your face in good lighting",
    status: "optional" as const,
    filename: undefined,
  },
]

const SESSIONS = [
  { device: "iPhone 15", location: "Lagos", time: "Active now", active: true },
  { device: "Chrome · macOS", location: "Lagos", time: "2 hours ago", active: false },
  { device: "Android · Abuja", location: "Abuja", time: "3 days ago", active: false },
]

const DOC_STATUS = {
  verified: { label: "Verified", className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  review: { label: "In review", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  optional: { label: "Optional", className: "bg-muted text-muted-foreground" },
}

export default function ProfilePage() {
  const [currentTier] = useState(2)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md sticky top-0 z-50 h-14 flex items-center">
        <div className="max-w-[1100px] mx-auto w-full px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground" asChild>
              <Link href="/p2p">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/wasopay-logo.png" alt="WasoPay" height={28} width={28} className="h-7 w-7 object-contain" priority />
              <span className="font-bold text-sm">WasoPay</span>
            </Link>
          </div>
          <h1 className="font-semibold text-sm">Verification</h1>
          <div className="w-24" />
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        {/* ── Tier Stepper ── */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold">Verification levels</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                You are currently on <strong>Tier 2 · Standard</strong>
              </p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 font-medium">
              Tier 2 · Standard
            </Badge>
          </div>

          {/* Stepper */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TIERS.map((tier) => (
              <div
                key={tier.n}
                className={`rounded-xl border p-4 ${
                  tier.current
                    ? "border-primary bg-primary/5"
                    : tier.done
                    ? "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10"
                    : "border-border bg-background"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Tier {tier.n}
                  </span>
                  {tier.done && <CheckCircle className="w-4 h-4 text-green-600" />}
                  {tier.current && !tier.done && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                </div>
                <div className="font-semibold text-sm mb-1">{tier.label}</div>
                <div className="text-xs text-primary font-medium mb-1">{tier.limit}</div>
                {tier.lifetime && <div className="text-xs text-muted-foreground mb-2">{tier.lifetime}</div>}
                <ul className="space-y-0.5">
                  {tier.items.map((item) => (
                    <li key={item} className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <Button size="sm" className="text-sm">
              Continue to Tier 3 <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
          {/* Document upload zone */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-border">
              <h2 className="font-semibold">Tier 3 · Enhanced verification</h2>
              <p className="text-sm text-muted-foreground mt-1">Two short steps. Reviewed by a human within 4 hours.</p>
            </div>

            {/* Rejection warning */}
            <div className="mx-5 mt-5 flex gap-2.5 p-3.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                <strong>Earlier rejection:</strong> BVN photo did not match your selfie clearly. Re-take in daylight, no glasses.
              </p>
            </div>

            <div className="p-5 space-y-3">
              {DOCUMENTS.map((doc) => {
                const s = DOC_STATUS[doc.status]
                return (
                  <div
                    key={doc.id}
                    className="border border-border rounded-xl p-4 flex items-start gap-4"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      doc.status === "verified" ? "bg-green-100 dark:bg-green-900/30" :
                      doc.status === "review" ? "bg-amber-100 dark:bg-amber-900/30" :
                      "bg-muted"
                    }`}>
                      {doc.status === "verified" ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : doc.status === "review" ? (
                        <Clock className="w-5 h-5 text-amber-600" />
                      ) : (
                        <Upload className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="font-medium text-sm">{doc.label}</span>
                        <Badge className={`text-[10px] px-1.5 py-0 border-0 ${s.className}`}>{s.label}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{doc.hint}</p>
                      {doc.filename && (
                        <p className="text-xs font-mono text-muted-foreground mb-2">{doc.filename}</p>
                      )}
                      <Button size="sm" variant="outline" className="bg-transparent text-xs h-7 px-3">
                        {doc.status === "verified" ? "Replace" : "Upload"}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Profile card */}
          <div className="flex flex-col gap-4">
            {/* Identity */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-teal-400 flex items-center justify-center text-white text-lg font-bold shrink-0">
                  AO
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Adaeze Okafor</span>
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">Member since March 2024 · Lagos</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "BVN", value: "••• •••• 4421", verified: true },
                  { label: "Phone", value: "+234 803 ••• 2241", verified: false },
                  { label: "Email", value: "adaeze@—mail.com", verified: false },
                  { label: "2FA", value: "Authenticator app", verified: true },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground w-14">{row.label}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs">{row.value}</span>
                      {row.verified && <CheckCircle className="w-3.5 h-3.5 text-primary" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sessions */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm">Active sessions</h3>
              </div>
              <div className="space-y-3">
                {SESSIONS.map((s, i) => (
                  <div key={i} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        {s.device.includes("iPhone") || s.device.includes("Android") ? (
                          <Smartphone className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Monitor className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-medium truncate">{s.device}</span>
                          {s.active && <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />}
                        </div>
                        <span className="text-xs text-muted-foreground">{s.location} · {s.time}</span>
                      </div>
                    </div>
                    {!s.active && (
                      <Button size="sm" variant="ghost" className="text-xs text-muted-foreground h-7 px-2 shrink-0">
                        Sign out
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

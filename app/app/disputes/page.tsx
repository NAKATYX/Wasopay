"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Sparkles,
  Paperclip,
  Send,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  User,
  Shield,
} from "lucide-react"
import Link from "next/link"

const CASES = [
  {
    id: "D-2031",
    subject: "Non-payment · Tunde.Pay",
    amount: "₦1,672,100",
    token: "1,000 USDT",
    status: "Open" as const,
    time: "2h ago",
    orderId: "WP-8821-AOZ",
  },
  {
    id: "D-1894",
    subject: "Wrong amount sent",
    amount: "₦450,000",
    token: "270 USDT",
    status: "Open" as const,
    time: "1d ago",
    orderId: "WP-7712-KQP",
  },
  {
    id: "D-1722",
    subject: "Late release",
    amount: "0.012 BTC",
    token: "0.012 BTC",
    status: "Review" as const,
    time: "4d ago",
    orderId: "WP-7501-MSR",
  },
  {
    id: "D-1641",
    subject: "Funds not received",
    amount: "₦2,100,000",
    token: "1,250 USDT",
    status: "Resolved" as const,
    time: "8d ago",
    orderId: "WP-7200-ALP",
  },
]

const STATUS_STYLE: Record<string, string> = {
  Open: "bg-destructive/10 text-destructive",
  Review: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Resolved: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
}

const THREAD_EVENTS = [
  {
    id: 1,
    sender: "you",
    time: "14:08",
    text: "Opened dispute. I sent payment via Kuda (ref: WP-8821-AOZ) but the seller hasn't released funds. Screenshot attached.",
    attachment: "kuda-receipt.png",
  },
  {
    id: 2,
    sender: "counterparty",
    time: "14:14",
    text: "I haven't seen credit yet. Inter-bank transfers sometimes take time. Please wait a little longer.",
  },
  {
    id: 3,
    sender: "moderator",
    time: "15:01",
    text: "This is the WasoPay dispute team. We're reviewing the bank statements now.",
    system: true,
  },
  {
    id: 4,
    sender: "moderator",
    time: "15:42",
    text: "We have confirmed the credit at 14:09. We will release the escrow in 2 minutes unless you raise an objection.",
    system: true,
  },
]

export default function DisputesPage() {
  const [activeCase, setActiveCase] = useState(CASES[0])
  const [statusFilter, setStatusFilter] = useState<"all" | "Open" | "Review" | "Resolved">("all")
  const [draft, setDraft] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeCase])

  const filtered = CASES.filter((c) => statusFilter === "all" || c.status === statusFilter)
  const openCount = CASES.filter((c) => c.status === "Open").length
  const reviewCount = CASES.filter((c) => c.status === "Review").length
  const resolvedCount = CASES.filter((c) => c.status === "Resolved").length

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md sticky top-0 z-50 h-14 flex items-center">
        <div className="h-full w-full px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground" asChild>
              <Link href="/p2p">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <Link href="/">
              <Image src="/wasopay-logo.png" alt="WasoPay" height={28} width={120} className="h-7 w-auto" priority />
            </Link>
          </div>
          <h1 className="font-semibold text-sm">Dispute Centre</h1>
          <div className="w-24" />
        </div>
      </header>

      {/* 3-pane body */}
      <div className="flex flex-1 min-h-0 overflow-hidden" style={{ height: "calc(100vh - 56px)" }}>
        {/* ── Left: Case List ── */}
        <aside className="w-72 border-r border-border flex flex-col shrink-0">
          {/* Status pills */}
          <div className="p-3 border-b border-border flex flex-wrap gap-1.5">
            {([
              ["all", "All", openCount + reviewCount + resolvedCount],
              ["Open", "Open", openCount],
              ["Review", "Review", reviewCount],
              ["Resolved", "Resolved", resolvedCount],
            ] as const).map(([val, label, count]) => (
              <button
                key={val}
                onClick={() => setStatusFilter(val as typeof statusFilter)}
                className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                  statusFilter === val
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {label} · {count}
              </button>
            ))}
          </div>

          {/* Cases */}
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCase(c)}
                className={`w-full text-left px-4 py-4 flex flex-col gap-1.5 hover:bg-muted/40 transition-colors ${
                  activeCase.id === c.id ? "bg-primary/5 border-r-2 border-primary" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{c.id}</span>
                  <Badge className={`text-[10px] px-1.5 py-0 border-0 ${STATUS_STYLE[c.status]}`}>
                    {c.status}
                  </Badge>
                </div>
                <div className="font-medium text-sm truncate">{c.subject}</div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-mono">{c.amount}</span>
                  <span>{c.time}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* ── Center: Dispute Thread ── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Case header */}
          <div className="px-5 py-3.5 border-b border-border">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="font-semibold text-sm">{activeCase.subject}</h2>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <span className="font-mono">{activeCase.id}</span>
                  <span>·</span>
                  <span>{activeCase.token}</span>
                  <span>·</span>
                  <span>Order {activeCase.orderId}</span>
                  <span>·</span>
                  <span>Opened {activeCase.time}</span>
                </div>
              </div>
              <Badge className={`border-0 ${STATUS_STYLE[activeCase.status]}`}>
                {activeCase.status}
              </Badge>
            </div>
          </div>

          {/* Thread events */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {THREAD_EVENTS.map((ev) => {
              if (ev.system) {
                return (
                  <div key={ev.id} className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-xs font-semibold text-primary uppercase tracking-wide">Moderator</span>
                      <span className="text-xs text-muted-foreground ml-auto font-mono">{ev.time}</span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{ev.text}</p>
                  </div>
                )
              }

              const isYou = ev.sender === "you"
              return (
                <div key={ev.id} className={`flex flex-col gap-2 ${isYou ? "items-end" : "items-start"}`}>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="w-3 h-3" />
                    <span className="font-medium">{isYou ? "You" : "Tunde.Pay"}</span>
                    <span className="font-mono">{ev.time}</span>
                  </div>
                  <div
                    className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      isYou
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-card border border-border text-foreground rounded-bl-sm"
                    }`}
                  >
                    {ev.text}
                    {ev.attachment && (
                      <div className={`mt-2 flex items-center gap-1.5 text-xs ${isYou ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        <Paperclip className="w-3 h-3" />
                        {ev.attachment}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border">
            <div className="flex items-center gap-2">
              <button className="text-muted-foreground hover:text-foreground">
                <Paperclip className="w-4 h-4" />
              </button>
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && setDraft("")}
                placeholder="Add evidence or message to moderator..."
                className="flex-1 text-sm h-9"
              />
              <Button size="sm" className="h-9 w-9 p-0" disabled={!draft.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* ── Right: AI Triage Panel ── */}
        <aside className="w-80 border-l border-border flex flex-col shrink-0 hidden lg:flex">
          {/* AI header */}
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="font-semibold text-sm">Waso Copilot</span>
            <Badge className="bg-accent/10 text-accent border-accent/20 text-[10px] px-1.5 py-0">Beta</Badge>
          </div>

          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5">
            {/* Recommendation */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Recommended outcome</p>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800 dark:text-green-400">Release to buyer</span>
                </div>

                {/* Confidence bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="font-semibold text-green-700 dark:text-green-400">88%</span>
                  </div>
                  <div className="h-1.5 bg-green-200 dark:bg-green-900 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: "88%" }} />
                  </div>
                </div>

                {/* Evidence */}
                <div className="space-y-2">
                  {[
                    "Buyer's Kuda shows ₦1,672,100 outflow at 13:48",
                    "Reference WP-8821 matched on receiver side",
                    "Seller has 2 prior late-release flags this month",
                  ].map((e, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-green-800 dark:text-green-300">
                      <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-green-600" />
                      <span>{e}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <Button variant="outline" size="sm" className="bg-transparent text-xs">Override</Button>
                <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground text-xs">Apply</Button>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="flex gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                AI suggestions are advisory. A human moderator must confirm all decisions.
              </p>
            </div>

            {/* Internal notes */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Internal notes</p>
              <div className="bg-muted/60 rounded-xl p-3.5">
                <div className="text-xs text-muted-foreground mb-1 font-medium">Funmi A. · 15:38</div>
                <p className="text-xs text-foreground leading-relaxed">
                  Cross-checked NIBSS log. Inter-bank delay of 21 min — within tolerance. Payment confirmed. Recommend release.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

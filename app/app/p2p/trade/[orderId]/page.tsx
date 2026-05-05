"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  AlertTriangle,
  Copy,
  CheckCircle,
  Clock,
  Paperclip,
  Send,
  Flag,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

type Step = {
  id: number
  label: string
  sublabel?: string
  time?: string
  state: "done" | "active" | "pending"
}

const ESCROW_STEPS: Step[] = [
  { id: 1, label: "Order created", time: "14:00", state: "done" },
  { id: 2, label: "Funds locked in escrow", sublabel: "1,000.00 USDT held by multi-sig", time: "14:01", state: "done" },
  { id: 3, label: "Buyer marked as paid", time: "14:03", state: "done" },
  { id: 4, label: "Seller releases", state: "active" },
  { id: 5, label: "Settled", state: "pending" },
]

type Message = {
  id: number
  sender: "buyer" | "seller" | "system"
  text: string
  time: string
}

const INITIAL_MESSAGES: Message[] = [
  { id: 1, sender: "seller", text: "Hello, I have sent ₦1,672,100 to your GTBank account. Reference: WP-8821-AOZ", time: "14:02" },
  { id: 2, sender: "buyer", text: "Checking — give me 30 seconds.", time: "14:02" },
  { id: 3, sender: "seller", text: "Sure, take your time.", time: "14:03" },
  { id: 4, sender: "system", text: "Buyer marked trade as paid", time: "14:03" },
  { id: 5, sender: "buyer", text: "Confirmed ₦1,672,100 received. Releasing escrow now.", time: "14:04" },
]

function TimerBadge() {
  const [secs, setSecs] = useState(9 * 60 + 42)
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [])
  const m = String(Math.floor(secs / 60)).padStart(2, "0")
  const s = String(secs % 60).padStart(2, "0")
  return (
    <span className="font-mono text-sm px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-medium">
      {m}:{s} to release
    </span>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} className="text-primary hover:text-primary/70 transition-colors">
      {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  )
}

export default function TradeRoomPage() {
  const params = useParams()
  const orderId = params?.orderId ?? "WP-8821-AOZ"
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [draft, setDraft] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const send = () => {
    if (!draft.trim()) return
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "buyer", text: draft.trim(), time: new Date().toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit", hour12: false }) },
    ])
    setDraft("")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md sticky top-0 z-50 h-14">
        <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground" asChild>
              <Link href="/p2p">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm truncate">Buying 1,000 USDT from Chuka.Trades</span>
              </div>
              <span className="font-mono text-xs text-muted-foreground">#{orderId}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <TimerBadge />
            <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10 bg-transparent text-xs">
              <Flag className="w-3.5 h-3.5 mr-1" />
              Open dispute
            </Button>
          </div>
        </div>
      </header>

      {/* 3-pane body */}
      <div className="flex-1 flex min-h-0 overflow-hidden" style={{ height: "calc(100vh - 56px)" }}>
        {/* ── Left: Escrow Timeline ── */}
        <aside className="w-72 border-r border-border flex flex-col shrink-0 overflow-y-auto p-5 gap-5 hidden md:flex">
          <h2 className="font-semibold text-sm">Escrow timeline</h2>

          <div className="space-y-0">
            {ESCROW_STEPS.map((step, i) => (
              <div key={step.id} className="flex gap-3">
                {/* Dot + line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      step.state === "done"
                        ? "bg-primary border-primary"
                        : step.state === "active"
                        ? "border-primary bg-background animate-pulse"
                        : "border-border bg-background"
                    }`}
                  >
                    {step.state === "done" && <CheckCircle className="w-3.5 h-3.5 text-primary-foreground" />}
                    {step.state === "active" && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                  {i < ESCROW_STEPS.length - 1 && (
                    <div className={`w-px flex-1 min-h-[28px] ${step.state === "done" ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>

                {/* Content */}
                <div className="pb-5 min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-sm font-medium ${step.state === "pending" ? "text-muted-foreground" : "text-foreground"}`}>
                      {step.label}
                    </span>
                    {step.time && <span className="text-xs text-muted-foreground font-mono shrink-0">{step.time}</span>}
                  </div>
                  {step.sublabel && (
                    <p className="text-xs text-muted-foreground mt-0.5">{step.sublabel}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Escrow info box */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your funds are held in a <strong className="text-foreground">2-of-3 multi-sig escrow</strong>. Neither party can withdraw without consensus.
              </p>
            </div>
          </div>
        </aside>

        {/* ── Center: Chat ── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg) => {
              if (msg.sender === "system") {
                return (
                  <div key={msg.id} className="flex justify-center">
                    <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">
                      {msg.text} · {msg.time}
                    </span>
                  </div>
                )
              }
              const isBuyer = msg.sender === "buyer"
              return (
                <div key={msg.id} className={`flex ${isBuyer ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[72%] ${isBuyer ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        isBuyer
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-card border border-border text-foreground rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[11px] text-muted-foreground font-mono">{msg.time}</span>
                  </div>
                </div>
              )
            })}
            <div ref={bottomRef} />
          </div>

          {/* OTP warning */}
          <div className="px-4 py-2 border-t border-border bg-amber-50 dark:bg-amber-900/10 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <p className="text-xs text-amber-700 dark:text-amber-400">Never share OTPs or passwords in chat. WasoPay will never ask for your PIN.</p>
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border flex items-center gap-2">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Paperclip className="w-4 h-4" />
            </button>
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Type a message..."
              className="flex-1 text-sm h-9"
            />
            <Button size="sm" className="h-9 w-9 p-0" onClick={send} disabled={!draft.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* ── Right: Trade Details ── */}
        <aside className="w-72 border-l border-border flex flex-col shrink-0 overflow-y-auto hidden lg:flex">
          {/* Trade summary */}
          <div className="p-5 border-b border-border">
            <h2 className="font-semibold text-sm mb-4">Trade details</h2>
            <div className="space-y-3">
              {[
                { label: "You pay", value: "₦1,672,100.00", accent: true },
                { label: "You receive", value: "1,000.00 USDT", accent: true },
                { label: "Rate", value: "₦1,672.10 / USDT" },
                { label: "Fee", value: "₦0.00 · waived", muted: true },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between gap-2">
                  <span className="text-sm text-muted-foreground">{r.label}</span>
                  <span className={`font-mono text-sm font-semibold ${r.accent ? "text-primary" : r.muted ? "text-muted-foreground" : ""}`}>
                    {r.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pay to */}
          <div className="p-5 border-b border-border">
            <h2 className="font-semibold text-sm mb-4">Pay to</h2>
            <div className="bg-muted/60 rounded-xl p-4 space-y-2.5">
              {[
                { label: "Bank", value: "GTBank" },
                { label: "Account", value: "0123 456 789" },
                { label: "Name", value: "Chuka E. Adeyemi" },
                { label: "Reference", value: "WP-8821-AOZ" },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">{r.label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-medium">{r.value}</span>
                    <CopyButton text={r.value} />
                  </div>
                </div>
              ))}
            </div>
            <Button size="sm" variant="outline" className="w-full mt-3 bg-transparent text-xs">
              <Copy className="w-3.5 h-3.5 mr-1.5" />
              Copy all bank details
            </Button>
          </div>

          {/* Counterparty */}
          <div className="p-5 border-b border-border">
            <h2 className="font-semibold text-sm mb-4">Counterparty</h2>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                CT
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-sm">Chuka.Trades</span>
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span>Tier 3</span>
                  <span>·</span>
                  <span>4,218 trades</span>
                  <span>·</span>
                  <span>99.4%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="p-5 mt-auto">
            <div className="flex items-start gap-2 mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                Only confirm release after funds clear in your bank app.
              </p>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full bg-transparent text-sm">
                I haven't paid yet
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Release 1,000 USDT
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

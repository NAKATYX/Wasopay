"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import {
  RefreshCw,
  CheckCircle,
  Clock,
  Sparkles,
  Plus,
  X,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { ExpressTrading } from "@/components/p2p/express-trading"

const PAYMENT_METHODS = ["GTBank", "Access", "Kuda", "OPay", "PalmPay", "Zenith"]

const MERCHANTS = [
  {
    id: "1",
    name: "Chuka.Trades",
    initials: "CT",
    color: "bg-teal-600",
    trades: 4218,
    completion: 99.4,
    response: "~1m",
    verified: true,
    online: true,
    price: 1672.10,
    priceDiff: "+₦0.00 best",
    limitsMin: 50000,
    limitsMax: 5000000,
    methods: ["GTBank", "OPay"],
    side: "buy",
    token: "USDT",
  },
  {
    id: "2",
    name: "NaijaCoin Hub",
    initials: "NC",
    color: "bg-blue-600",
    trades: 3104,
    completion: 98.9,
    response: "~2m",
    verified: true,
    online: true,
    price: 1673.50,
    priceDiff: "+₦1.40",
    limitsMin: 100000,
    limitsMax: 2000000,
    methods: ["Access", "Kuda"],
    side: "buy",
    token: "USDT",
  },
  {
    id: "3",
    name: "Tunde.Pay",
    initials: "TP",
    color: "bg-purple-600",
    trades: 9817,
    completion: 99.8,
    response: "~1m",
    verified: true,
    online: true,
    price: 1674.00,
    priceDiff: "+₦1.90",
    limitsMin: 200000,
    limitsMax: 10000000,
    methods: ["GTBank", "PalmPay", "Zenith"],
    side: "buy",
    token: "USDT",
  },
  {
    id: "4",
    name: "Lagos Stables",
    initials: "LS",
    color: "bg-orange-600",
    trades: 1540,
    completion: 97.2,
    response: "~3m",
    verified: true,
    online: false,
    price: 1675.00,
    priceDiff: "+₦2.90",
    limitsMin: 50000,
    limitsMax: 1000000,
    methods: ["OPay", "PalmPay"],
    side: "buy",
    token: "USDT",
  },
  {
    id: "5",
    name: "Chuka.Trades",
    initials: "CT",
    color: "bg-teal-600",
    trades: 4218,
    completion: 99.4,
    response: "~1m",
    verified: true,
    online: true,
    price: 1671.00,
    priceDiff: "best price",
    limitsMin: 50000,
    limitsMax: 5000000,
    methods: ["GTBank", "OPay"],
    side: "sell",
    token: "USDT",
  },
  {
    id: "6",
    name: "NaijaCoin Hub",
    initials: "NC",
    color: "bg-blue-600",
    trades: 3104,
    completion: 98.9,
    response: "~2m",
    verified: true,
    online: true,
    price: 1670.00,
    priceDiff: "-₦1.00",
    limitsMin: 100000,
    limitsMax: 2000000,
    methods: ["Access", "Kuda"],
    side: "sell",
    token: "USDT",
  },
]

const METHOD_COLORS: Record<string, string> = {
  GTBank: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Access: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Kuda: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  OPay: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  PalmPay: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  Zenith: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
}

type Side = "buy" | "sell" | "express"
type Token = "USDT" | "BTC" | "ETH"

export default function P2PMarketPage() {
  const [side, setSide] = useState<Side>("buy")
  const [token, setToken] = useState<Token>("USDT")
  const [amount, setAmount] = useState("")
  const [methods, setMethods] = useState<string[]>(["GTBank", "OPay", "PalmPay"])
  const [verifiedOnly, setVerifiedOnly] = useState(true)
  const [minCompletion, setMinCompletion] = useState(false)
  const [minTrades, setMinTrades] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const toggleMethod = (m: string) =>
    setMethods((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]))

  const filtered = MERCHANTS.filter((m) => {
    if (side === "express") return false
    if (m.side !== side) return false
    if (m.token !== token) return false
    if (verifiedOnly && !m.verified) return false
    if (minCompletion && m.completion < 99) return false
    if (minTrades && m.trades < 1000) return false
    if (methods.length > 0 && !m.methods.some((x) => methods.includes(x))) return false
    return true
  })

  const refresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 900)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md sticky top-0 z-50 h-14 flex items-center">
        <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/wasopay-logo.png" alt="WasoPay" height={28} width={120} className="h-7 w-auto" priority />
          </Link>

          <nav className="hidden md:flex items-center gap-5 text-sm">
            <Link href="/p2p" className="text-foreground font-medium">P2P Market</Link>
            <Link href="/wallet" className="text-muted-foreground hover:text-foreground transition-colors">Wallet</Link>
            <Link href="/disputes" className="text-muted-foreground hover:text-foreground transition-colors">Disputes</Link>
            <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">Verification</Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button size="sm" variant="outline" className="bg-transparent hidden sm:flex" asChild>
              <Link href="/p2p/post">
                <Plus className="w-3.5 h-3.5 mr-1" />
                Post Ad
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex max-w-[1400px] mx-auto w-full">
        {/* ── Filters Sidebar — hidden in Express mode ── */}
        <aside className={`flex-col w-64 border-r border-border p-5 gap-6 shrink-0 ${side === "express" ? "hidden" : "hidden lg:flex"}`}>
          {/* Asset */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2.5">Asset</p>
            <div className="flex rounded-lg border border-border overflow-hidden">
              {(["USDT", "BTC", "ETH"] as Token[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setToken(t)}
                  className={`flex-1 py-1.5 text-xs font-medium transition-colors ${
                    token === t
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2.5 block">
              Amount (₦)
            </Label>
            <Input
              type="number"
              placeholder="500,000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-sm"
            />
          </div>

          {/* Payment methods */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2.5">Payment method</p>
            <div className="space-y-2">
              {PAYMENT_METHODS.map((m) => (
                <div key={m} className="flex items-center gap-2">
                  <Checkbox
                    id={`method-${m}`}
                    checked={methods.includes(m)}
                    onCheckedChange={() => toggleMethod(m)}
                  />
                  <Label htmlFor={`method-${m}`} className="text-sm font-normal cursor-pointer">{m}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Merchant tier */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2.5">Merchant tier</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox id="verified" checked={verifiedOnly} onCheckedChange={(v) => setVerifiedOnly(!!v)} />
                <Label htmlFor="verified" className="text-sm font-normal cursor-pointer">Verified only</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="completion" checked={minCompletion} onCheckedChange={(v) => setMinCompletion(!!v)} />
                <Label htmlFor="completion" className="text-sm font-normal cursor-pointer">≥ 99% completion</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="trades" checked={minTrades} onCheckedChange={(v) => setMinTrades(!!v)} />
                <Label htmlFor="trades" className="text-sm font-normal cursor-pointer">≥ 1,000 trades</Label>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground -ml-1 w-fit text-xs"
            onClick={() => {
              setMethods(["GTBank", "OPay", "PalmPay"])
              setVerifiedOnly(true)
              setMinCompletion(false)
              setMinTrades(false)
              setAmount("")
            }}
          >
            <X className="w-3.5 h-3.5 mr-1" />
            Reset filters
          </Button>
        </aside>

        {/* ── Offers Table ── */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Tabs bar */}
          <div className="border-b border-border px-5 py-3 flex items-center justify-between gap-4">
            <div className="flex gap-1">
              {(["buy", "sell"] as Side[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSide(s)}
                  className={`px-5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    side === s
                      ? s === "buy"
                        ? "bg-green-600 text-white"
                        : "bg-destructive text-destructive-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {s === "buy" ? "Buy" : "Sell"}
                </button>
              ))}
              <button
                onClick={() => setSide("express")}
                className={`px-5 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  side === "express"
                    ? "bg-accent/15 text-accent border border-accent/30"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                Express
              </button>
            </div>

            <div className="flex items-center gap-2">
              {(["USDT", "BTC", "ETH"] as Token[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setToken(t)}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                    token === t ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {t}
                </button>
              ))}
              <Button size="sm" variant="ghost" onClick={refresh} className="h-7 w-7 p-0 text-muted-foreground">
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>

          {/* Express Trading view */}
          {side === "express" && (
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-8">
              <ExpressTrading />
            </div>
          )}

          {/* Market table — hidden in Express mode */}
          {side !== "express" && (
            <>
              {/* Column headers */}
              <div className="px-5 py-3 grid grid-cols-[2fr_1fr_1fr_1.5fr_auto] gap-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground border-b border-border">
                <span>Merchant</span>
                <span>Price</span>
                <span>Limits</span>
                <span>Payment</span>
                <span className="min-w-[80px]" />
              </div>

              {/* Rows */}
              <div className="flex-1 divide-y divide-border">
                {filtered.length === 0 ? (
                  <div className="py-20 text-center text-muted-foreground text-sm">
                    No offers match your filters.
                  </div>
                ) : (
                  filtered.map((m) => (
                    <div
                      key={m.id}
                      className="px-5 py-4 grid grid-cols-[2fr_1fr_1fr_1.5fr_auto] gap-4 items-center hover:bg-muted/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative flex-none">
                          <div className={`w-9 h-9 rounded-full ${m.color} flex items-center justify-center text-white text-xs font-bold`}>
                            {m.initials}
                          </div>
                          {m.online && (
                            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-background" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="font-medium text-sm truncate">{m.name}</span>
                            {m.verified && <CheckCircle className="w-3.5 h-3.5 text-primary flex-none" />}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{m.trades.toLocaleString()} trades</span>
                            <span>·</span>
                            <span>{m.completion}%</span>
                            <span>·</span>
                            <Clock className="w-3 h-3" />
                            <span>{m.response}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="font-mono font-semibold text-sm">₦{m.price.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</div>
                        <div className="text-xs text-muted-foreground">{m.priceDiff}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          ₦{(m.limitsMin / 1000).toFixed(0)}K – ₦{m.limitsMax >= 1_000_000 ? `${(m.limitsMax / 1_000_000).toFixed(0)}M` : `${(m.limitsMax / 1000).toFixed(0)}K`}
                        </div>
                        <div className="text-xs text-muted-foreground">Min ₦{m.limitsMin.toLocaleString()}</div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {m.methods.map((pm) => (
                          <span key={pm} className={`text-xs px-2 py-0.5 rounded-full font-medium ${METHOD_COLORS[pm] ?? "bg-muted text-muted-foreground"}`}>
                            {pm}
                          </span>
                        ))}
                      </div>
                      <div className="min-w-[80px] flex justify-end">
                        <Button
                          size="sm"
                          className={`text-xs px-4 ${side === "buy" ? "bg-green-600 hover:bg-green-700 text-white" : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"}`}
                          asChild
                        >
                          <Link href={`/p2p/trade/WP-${m.id}001`}>
                            {side === "buy" ? "Buy" : "Sell"} {token}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-border text-xs text-muted-foreground flex items-center justify-between">
                <span>Showing {filtered.length} of {MERCHANTS.filter((m) => m.side === side).length} offers</span>
                <button className="flex items-center gap-1 hover:text-foreground transition-colors" onClick={refresh}>
                  <RefreshCw className={`w-3 h-3 ${refreshing ? "animate-spin" : ""}`} />
                  Refresh in 8s
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Eye,
  EyeOff,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  Plus,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

const ASSETS = [
  {
    symbol: "USDT",
    name: "Tether",
    color: "bg-teal-600",
    glyph: "₮",
    balance: 4218.42,
    value: 7_053_124,
    change: +1.12,
    sparkline: [65, 68, 72, 69, 74, 71, 75],
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    color: "bg-orange-500",
    glyph: "₿",
    balance: 0.08312,
    value: 9_167_400,
    change: +2.34,
    sparkline: [50, 55, 62, 58, 65, 70, 72],
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    color: "bg-blue-600",
    glyph: "Ξ",
    balance: 1.84,
    value: 10_694_632,
    change: -0.87,
    sparkline: [80, 75, 78, 72, 68, 73, 71],
  },
]

const TRANSACTIONS = [
  {
    id: "1",
    type: "buy" as const,
    description: "Bought 1,000 USDT · Chuka.Trades",
    amount: "+1,000.00 USDT",
    fiat: "₦1,672,100",
    time: "Today, 14:04",
    status: "Released",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    orderId: "WP-8821-AOZ",
  },
  {
    id: "2",
    type: "sell" as const,
    description: "Sold 0.012 BTC · Lagos Stables",
    amount: "-0.012 BTC",
    fiat: "₦1,323,540",
    time: "Today, 11:22",
    status: "Settled",
    statusColor: "bg-primary/10 text-primary",
    orderId: "WP-7710-BKR",
  },
  {
    id: "3",
    type: "deposit" as const,
    description: "On-chain ETH (Base)",
    amount: "+0.5 ETH",
    fiat: undefined,
    time: "Yesterday, 09:15",
    status: "Confirmed",
    statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    orderId: undefined,
  },
  {
    id: "4",
    type: "withdraw" as const,
    description: "To Kuda · 3088 21•• ••",
    amount: "-₦500,000",
    fiat: undefined,
    time: "2 days ago",
    status: "Confirmed",
    statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    orderId: undefined,
  },
]

function Sparkline({ data, up }: { data: number[]; up: boolean }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 56
  const h = 24
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(" ")
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polyline
        points={pts}
        stroke={up ? "#16a34a" : "#dc2626"}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

const fmtNGN = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", notation: "compact", maximumFractionDigits: 2 }).format(n)

export default function WalletPage() {
  const [hidden, setHidden] = useState(false)
  const [depositOpen, setDepositOpen] = useState(false)

  const totalValue = ASSETS.reduce((s, a) => s + a.value, 0)
  const totalChange = 284510
  const changePct = 1.04

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md sticky top-0 z-50 h-14 flex items-center">
        <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 flex items-center justify-between">
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
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Badge variant="outline" className="font-mono text-xs">Tier 2 · Standard</Badge>
          </div>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 py-6 flex-1 flex flex-col gap-6">
        {/* ── Hero Portfolio Card ── */}
        <div
          className="rounded-2xl p-7 text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #052b2b 0%, #0a6a6a 60%, #0e8585 100%)" }}
        >
          {/* Decorative */}
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -right-8 bottom-0 w-32 h-32 rounded-full bg-white/5" />

          <div className="relative">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm text-white/70">Total portfolio value</p>
              <button onClick={() => setHidden((h) => !h)} className="text-white/50 hover:text-white transition-colors">
                {hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="font-mono text-4xl font-bold mb-1">
              {hidden ? "••••••" : `₦${(totalValue / 1_000_000).toFixed(2)}M`}
            </div>

            <div className="flex items-center gap-2 mb-7">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400 font-medium">
                {hidden ? "••••" : `+₦${totalChange.toLocaleString()} (+${changePct}%)`} today
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium"
                onClick={() => setDepositOpen(true)}
              >
                <ArrowDownLeft className="w-4 h-4 mr-1.5" />
                Deposit
              </Button>
              <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent font-medium">
                <ArrowUpRight className="w-4 h-4 mr-1.5" />
                Withdraw
              </Button>
              <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent font-medium" asChild>
                <Link href="/p2p">Trade</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* ── Main grid: Assets + Activity ── */}
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 flex-1">
          {/* Assets table */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="font-semibold text-sm">Assets</h2>
              <Button size="sm" variant="ghost" className="text-xs text-muted-foreground h-7 px-2">
                <Plus className="w-3.5 h-3.5 mr-1" />
                Add asset
              </Button>
            </div>

            {/* Column headers */}
            <div className="px-5 py-2.5 grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground border-b border-border">
              <span>Asset</span>
              <span>Balance</span>
              <span>Value</span>
              <span>24h</span>
              <span className="min-w-[80px]" />
            </div>

            <div className="flex-1 divide-y divide-border">
              {ASSETS.map((a) => (
                <div key={a.symbol} className="px-5 py-4 grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-3 items-center hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${a.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {a.glyph}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{a.symbol}</div>
                      <div className="text-xs text-muted-foreground">{a.name}</div>
                    </div>
                  </div>

                  <div className="font-mono text-sm font-medium">
                    {hidden ? "••••" : a.balance.toLocaleString("en-NG", { maximumFractionDigits: 5 })}
                  </div>

                  <div className="font-mono text-sm">
                    {hidden ? "••••" : fmtNGN(a.value)}
                  </div>

                  <div className={`flex items-center gap-1 text-xs font-medium ${a.change >= 0 ? "text-green-600" : "text-red-500"}`}>
                    {a.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>{a.change > 0 ? "+" : ""}{a.change}%</span>
                  </div>

                  <div className="flex items-center gap-1.5 min-w-[80px] justify-end">
                    <Sparkline data={a.sparkline} up={a.change >= 0} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="font-semibold text-sm">Recent activity</h2>
              <button className="text-xs text-primary hover:underline">View all</button>
            </div>

            <div className="flex-1 divide-y divide-border">
              {TRANSACTIONS.map((tx) => {
                const isBuy = tx.type === "buy"
                const isSell = tx.type === "sell"
                const isDeposit = tx.type === "deposit"
                return (
                  <div key={tx.id} className="px-5 py-4 flex items-center gap-3 hover:bg-muted/30 transition-colors">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        isBuy ? "bg-green-100 dark:bg-green-900/30" :
                        isSell ? "bg-red-100 dark:bg-red-900/30" :
                        "bg-blue-100 dark:bg-blue-900/30"
                      }`}
                    >
                      {isBuy || isDeposit ? (
                        <ArrowDownLeft className={`w-4 h-4 ${isBuy ? "text-green-600" : "text-blue-600"}`} />
                      ) : (
                        <ArrowUpRight className={`w-4 h-4 ${isSell ? "text-red-500" : "text-blue-600"}`} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{tx.description}</div>
                      <div className="text-xs text-muted-foreground">{tx.time}</div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className={`font-mono text-sm font-semibold ${
                        isBuy || isDeposit ? "text-green-600" : "text-red-500"
                      }`}>
                        {tx.amount}
                      </div>
                      {tx.fiat && <div className="text-xs text-muted-foreground font-mono">{tx.fiat}</div>}
                      <Badge className={`text-[10px] px-1.5 py-0 mt-0.5 ${tx.statusColor} border-0`}>
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="px-5 py-3 border-t border-border">
              <Button variant="ghost" className="w-full text-xs text-muted-foreground h-8">
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                Load more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

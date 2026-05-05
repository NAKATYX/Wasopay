import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Zap, ArrowRight, TrendingUp, TrendingDown, ChevronRight } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

const LIVE_RATES = [
  { symbol: "USDT", name: "Tether", rate: "₦1,672.10", change: "+0.12%", up: true },
  { symbol: "BTC", name: "Bitcoin", rate: "₦110,284,500", change: "+1.84%", up: true },
  { symbol: "ETH", name: "Ethereum", rate: "₦5,812,300", change: "-0.43%", up: false },
]

const STEPS = [
  {
    n: "01",
    title: "Pick a merchant",
    body: "Browse verified offers filtered by price, payment method, tier, and completion rating.",
  },
  {
    n: "02",
    title: "Pay with Naira",
    body: "Send NGN directly to the merchant's bank account — GTBank, Kuda, OPay, PalmPay and more.",
  },
  {
    n: "03",
    title: "Receive crypto",
    body: "Funds are held in multi-sig escrow and released to you once payment is confirmed. Usually under 2 min.",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ── */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/wasopay-logo.png" alt="WasoPay" height={32} width={32} className="h-8 w-8 object-contain" priority />
            <span className="font-bold text-lg tracking-tight">WasoPay</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: "Trade", href: "/p2p" },
              { label: "Wallets", href: "/wallet" },
              { label: "Merchants", href: "/p2p" },
              { label: "Help", href: "/help" },
            ].map((l) => (
              <Link key={l.label} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth/register">Sign up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <div>
              <Badge className="mb-5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 font-medium">
                SEC ARIP Provisional · Multi-sig escrow
              </Badge>

              <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-6 text-foreground">
                Trade crypto,{" "}
                <em className="text-primary not-italic font-serif">the Nigerian way</em>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Buy and sell USDT, BTC, and ETH with Naira using GTBank, OPay, PalmPay, Kuda and
                more — protected by multi-sig escrow with real-time NIBSS settlement.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <Button size="lg" className="text-base px-7" asChild>
                  <Link href="/auth/register">
                    Start trading <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base px-7 bg-transparent" asChild>
                  <Link href="/p2p">See live offers</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8">
                {[
                  { value: "₦184B", label: "traded last 30 days" },
                  { value: "92s", label: "avg. release time" },
                  { value: "14,200", label: "verified merchants" },
                ].map((s) => (
                  <div key={s.value}>
                    <div className="font-mono text-2xl font-bold text-foreground">{s.value}</div>
                    <div className="text-sm text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Rates Card */}
            <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
              <div className="px-5 pt-5 pb-3 flex items-center justify-between">
                <div className="text-sm font-medium text-foreground">Live Rates</div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Updated 2s ago
                </div>
              </div>

              <div className="divide-y divide-border">
                {LIVE_RATES.map((r) => (
                  <div key={r.symbol} className="px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                          r.symbol === "USDT" ? "bg-teal-600" : r.symbol === "BTC" ? "bg-orange-500" : "bg-blue-600"
                        }`}
                      >
                        {r.symbol === "USDT" ? "₮" : r.symbol === "BTC" ? "₿" : "Ξ"}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{r.symbol}</div>
                        <div className="text-xs text-muted-foreground">{r.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-semibold text-sm">{r.rate}</div>
                      <div className={`text-xs font-medium flex items-center gap-0.5 justify-end ${r.up ? "text-green-600" : "text-red-500"}`}>
                        {r.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {r.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-5 py-3 border-t border-border">
                <Link href="/p2p" className="text-sm text-primary flex items-center gap-1 hover:underline">
                  Open market <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature Trio ── */}
      <section className="py-20 px-4 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield className="w-6 h-6 text-primary" />,
                bg: "bg-primary/10",
                title: "Multi-sig escrow",
                body: "Funds are locked in a 2-of-3 multi-sig wallet the moment an offer is accepted. Neither party can withdraw without consensus or moderator resolution.",
              },
              {
                icon: <Users className="w-6 h-6 text-blue-600" />,
                bg: "bg-blue-100 dark:bg-blue-900/30",
                title: "Verified merchants",
                body: "Every merchant completes BVN verification and ID checks. Completion rate, trade count, and response time are publicly visible before you trade.",
              },
              {
                icon: <Zap className="w-6 h-6 text-accent" />,
                bg: "bg-accent/10",
                title: "Instant settle",
                body: "92-second average release time. Real-time NIBSS clearance means your Naira lands before you blink. Zero custody risk — in, trade, out.",
              },
            ].map((f) => (
              <div key={f.title} className="bg-card border border-border rounded-2xl p-6">
                <div className={`w-11 h-11 ${f.bg} rounded-xl flex items-center justify-center mb-4`}>
                  {f.icon}
                </div>
                <h3 className="font-semibold text-base mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl mb-3">How it works</h2>
            <p className="text-muted-foreground">Three steps from Naira to crypto.</p>
          </div>

          <div className="space-y-6">
            {STEPS.map((s, i) => (
              <div key={s.n} className="flex gap-5">
                <div className="flex-none">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="font-mono text-xs font-bold text-primary">{s.n}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-px h-full bg-border ml-5 mt-1 min-h-[24px]" />
                  )}
                </div>
                <div className="pb-6">
                  <h3 className="font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-primary rounded-3xl p-10 text-primary-foreground">
            <h2 className="font-serif text-4xl mb-3">Your first trade is on us</h2>
            <p className="opacity-80 mb-2">Zero fees for 30 days. Sign up with phone number.</p>
            <p className="text-sm opacity-60 mb-8">KYC takes about 4 minutes.</p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8" asChild>
              <Link href="/auth/register">
                Create free account <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Image src="/wasopay-logo.png" alt="WasoPay" height={28} width={28} className="h-7 w-7 object-contain" />
              <span className="font-bold">WasoPay</span>
            </div>

            {/* Compliance badges */}
            <div className="flex flex-wrap gap-2">
              {["SEC ARIP Provisional", "NDPR Compliant", "NIBSS Partner"].map((b) => (
                <span key={b} className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground">
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 Waso Technologies Ltd. RC 1934820 · Lagos</p>
            <div className="flex gap-5">
              {[
                { label: "Terms", href: "/legal/terms" },
                { label: "Privacy", href: "/legal/privacy" },
                { label: "AML Policy", href: "/legal/aml" },
                { label: "Status", href: "/status" },
              ].map((l) => (
                <Link key={l.label} href={l.href} className="hover:text-foreground transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

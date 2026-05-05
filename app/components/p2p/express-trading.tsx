"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowUpDown, Zap, Shield, Clock, CheckCircle, ChevronDown } from "lucide-react"

const RATES: Record<string, number> = {
  USDT: 1672.10,
  BTC:  110_284_500,
  ETH:  5_812_300,
}

const ASSETS = [
  { symbol: "USDT", name: "Tether",   glyph: "₮", color: "bg-teal-600" },
  { symbol: "BTC",  name: "Bitcoin",  glyph: "₿", color: "bg-orange-500" },
  { symbol: "ETH",  name: "Ethereum", glyph: "Ξ", color: "bg-blue-600" },
]

const PAYMENT_METHODS = ["GTBank", "Kuda", "OPay", "PalmPay", "Access", "Zenith"]

const FEE_PCT = 0.005 // 0.5%

function AssetPicker({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const asset = ASSETS.find((a) => a.symbol === value)!
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-background hover:bg-muted transition-colors min-w-[100px]"
      >
        <div className={`w-6 h-6 rounded-full ${asset.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
          {asset.glyph}
        </div>
        <span className="font-semibold text-sm">{asset.symbol}</span>
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-xl shadow-lg z-20 min-w-[160px] overflow-hidden">
            {ASSETS.map((a) => (
              <button
                key={a.symbol}
                type="button"
                onClick={() => { onChange(a.symbol); setOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted transition-colors ${
                  a.symbol === value ? "bg-primary/5" : ""
                }`}
              >
                <div className={`w-7 h-7 rounded-full ${a.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {a.glyph}
                </div>
                <div>
                  <div className="font-semibold text-sm">{a.symbol}</div>
                  <div className="text-xs text-muted-foreground">{a.name}</div>
                </div>
                {a.symbol === value && <CheckCircle className="w-4 h-4 text-primary ml-auto" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function ExpressTrading() {
  const [mode, setMode] = useState<"buy" | "sell">("buy")
  const [asset, setAsset] = useState("USDT")
  const [ngnAmount, setNgnAmount] = useState("")
  const [cryptoAmount, setCryptoAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("GTBank")
  const [loading, setLoading] = useState(false)
  const [lastEdited, setLastEdited] = useState<"ngn" | "crypto">("ngn")

  const rate = RATES[asset] ?? 1
  const fee = ngnAmount ? parseFloat(ngnAmount) * FEE_PCT : 0

  const calcCrypto = useCallback(
    (ngn: string) => {
      const n = parseFloat(ngn)
      if (!n || isNaN(n)) return ""
      return (n / rate).toFixed(asset === "BTC" ? 8 : 4)
    },
    [rate, asset],
  )

  const calcNgn = useCallback(
    (crypto: string) => {
      const c = parseFloat(crypto)
      if (!c || isNaN(c)) return ""
      return (c * rate).toFixed(2)
    },
    [rate],
  )

  useEffect(() => {
    if (lastEdited === "ngn" && ngnAmount) {
      setCryptoAmount(calcCrypto(ngnAmount))
    } else if (lastEdited === "crypto" && cryptoAmount) {
      setNgnAmount(calcNgn(cryptoAmount))
    }
  }, [asset, rate, lastEdited, ngnAmount, cryptoAmount, calcCrypto, calcNgn])

  const handleNgn = (v: string) => {
    setNgnAmount(v)
    setLastEdited("ngn")
    setCryptoAmount(calcCrypto(v))
  }

  const handleCrypto = (v: string) => {
    setCryptoAmount(v)
    setLastEdited("crypto")
    setNgnAmount(calcNgn(v))
  }

  const swap = () => {
    setMode((m) => (m === "buy" ? "sell" : "buy"))
  }

  const submit = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1800)
  }

  const canSubmit = !loading && parseFloat(ngnAmount) > 0

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent border border-accent/20 rounded-full px-4 py-1.5 mb-3">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-semibold">Express Trade</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
          {mode === "buy" ? "Buy crypto instantly" : "Sell crypto instantly"}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Best rate · 0.5% fee · Funds in ~92 seconds</p>
      </div>

      {/* Buy / Sell toggle */}
      <div className="flex rounded-xl border border-border overflow-hidden mb-5">
        <button
          onClick={() => setMode("buy")}
          className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
            mode === "buy" ? "bg-green-600 text-white" : "text-muted-foreground hover:bg-muted"
          }`}
        >
          Buy {asset}
        </button>
        <button
          onClick={() => setMode("sell")}
          className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
            mode === "sell" ? "bg-destructive text-destructive-foreground" : "text-muted-foreground hover:bg-muted"
          }`}
        >
          Sell {asset}
        </button>
      </div>

      {/* Swap card */}
      <div className="bg-card border border-border rounded-2xl p-5 space-y-3 shadow-sm">
        {/* You Pay row */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
            {mode === "buy" ? "You pay (₦)" : "You sell"}
          </Label>
          <div className="flex items-center gap-2">
            {mode === "buy" ? (
              <>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₦</span>
                  <Input
                    type="number"
                    placeholder="500,000"
                    value={ngnAmount}
                    onChange={(e) => handleNgn(e.target.value)}
                    className="pl-7 text-base font-mono h-12"
                  />
                </div>
                <AssetPicker value={asset} onChange={setAsset} />
              </>
            ) : (
              <>
                <Input
                  type="number"
                  placeholder="0.0000"
                  value={cryptoAmount}
                  onChange={(e) => handleCrypto(e.target.value)}
                  className="flex-1 text-base font-mono h-12"
                />
                <AssetPicker value={asset} onChange={setAsset} />
              </>
            )}
          </div>
        </div>

        {/* Swap button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={swap}
            className="w-9 h-9 rounded-full border border-border bg-background flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* You Receive row */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
            {mode === "buy" ? "You receive" : "You receive (₦)"}
          </Label>
          <div className="flex items-center gap-2">
            {mode === "buy" ? (
              <>
                <Input
                  type="text"
                  readOnly
                  value={cryptoAmount}
                  placeholder="0.0000"
                  className="flex-1 text-base font-mono h-12 bg-muted/50"
                />
                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border border-border min-w-[100px]`}>
                  <div className={`w-6 h-6 rounded-full ${ASSETS.find((a) => a.symbol === asset)?.color} flex items-center justify-center text-white text-xs font-bold`}>
                    {ASSETS.find((a) => a.symbol === asset)?.glyph}
                  </div>
                  <span className="font-semibold text-sm">{asset}</span>
                </div>
              </>
            ) : (
              <>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₦</span>
                  <Input
                    type="text"
                    readOnly
                    value={ngnAmount}
                    placeholder="0.00"
                    className="pl-7 text-base font-mono h-12 bg-muted/50"
                  />
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border min-w-[100px]">
                  <span className="text-muted-foreground">₦</span>
                  <span className="font-semibold text-sm">NGN</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Rate + fee info */}
        {ngnAmount && parseFloat(ngnAmount) > 0 && (
          <div className="bg-muted/60 rounded-xl p-3.5 space-y-2 text-xs">
            {[
              { label: "Rate", value: `₦${rate.toLocaleString("en-NG")} / ${asset}` },
              { label: "Fee (0.5%)", value: fee > 0 ? `₦${fee.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "₦0.00" },
              { label: "Estimated time", value: "~92 seconds" },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between">
                <span className="text-muted-foreground">{r.label}</span>
                <span className="font-mono font-medium">{r.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment method */}
      <div className="mt-4">
        <Label className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-2 block">
          {mode === "buy" ? "Pay with" : "Receive to"}
        </Label>
        <div className="flex flex-wrap gap-2">
          {PAYMENT_METHODS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setPaymentMethod(m)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                paymentMethod === m
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Button
        onClick={submit}
        disabled={!canSubmit}
        className={`w-full mt-5 h-12 text-base font-semibold ${
          mode === "buy"
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
        }`}
      >
        <Zap className="w-4 h-4 mr-2" />
        {loading
          ? "Processing…"
          : mode === "buy"
          ? `Buy ${asset} with ${paymentMethod}`
          : `Sell ${asset} → ${paymentMethod}`}
      </Button>

      {/* Trust row */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-primary" />
          Multi-sig escrow
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-primary" />
          ~92s release
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-primary" />
          Zero hidden fees
        </div>
      </div>
    </div>
  )
}

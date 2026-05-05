import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  href?: string
}

const heights: Record<string, number> = { sm: 28, md: 32, lg: 44 }

export function Logo({ className, size = "md", href = "/" }: LogoProps) {
  const h = heights[size]
  const img = (
    <Image
      src="/wasopay-logo.png"
      alt="WasoPay"
      height={h}
      width={h * 4}
      className={cn("w-auto object-contain", `h-[${h}px]`)}
      style={{ height: h }}
      priority
    />
  )
  if (!href) return <span className={className}>{img}</span>
  return (
    <Link href={href} className={cn("inline-flex items-center", className)}>
      {img}
    </Link>
  )
}

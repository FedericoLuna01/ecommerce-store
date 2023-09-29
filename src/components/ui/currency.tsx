'use client'

import { formatter } from "@/lib/utils"
import { useEffect, useState } from "react"

interface CurrencyProps {
  value: number | string
}

const Currency: React.FC<CurrencyProps> = ({
  value
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <p
      className="font-semibold"
    >
      {formatter.format(Number(value))}
    </p>
  )
}

export default Currency
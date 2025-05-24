import React from "react"
import BigBord from "@/components/BigBord/BigBord"
import Doctor from "@/components/Doctor/Doctor"

export default function Home() {
  return (
    <div>
      <BigBord backgroundImage="/images/bigbort/BigBort3.jpg" />
      <Doctor />
    </div>
  )
}

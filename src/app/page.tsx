import React from "react"
import BigBord from "@/components/BigBord/BigBord"
import Doctor from "@/components/Doctor/Doctor"
import SideBySideGallery from "@/components/SideBySideGallery/SideBySideGallery"

export default function Home() {
  return (
    <div>
      <BigBord backgroundImage="/images/bigbort/BigBort3.jpg" />
      <Doctor />
      <SideBySideGallery />
    </div>
  )
}

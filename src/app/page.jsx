"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import FirstScreen from "@/components/FirstScreen"
import QuestionScreen from "@/components/QuestionScreen"
import BalloonsScreen from "@/components/BalloonsScreen"
import PhotoScreen from "@/components/PhotoScreen"
import FinalScreen from "@/components/FinalScreen"
import CuteLoader from "@/components/CuteLoader"

export default function ProposalSite() {
  const [currentScreen, setCurrentScreen] = useState("loader")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setCurrentScreen("first")
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // 🎶 Background Music for all screens
  useEffect(() => {
    const audio = new Audio("/audio/bg.mp3")   // <-- apna song file (public/song.mp3)
    audio.loop = true
    audio.volume = 0.6

    audio.play().catch(() => {
      console.log("Autoplay blocked, needs user interaction 🎵")
    })

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  const nextScreen = (screen) => {
    setCurrentScreen(screen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-950/30 via-black/70 to-rose-950/40 relative overflow-hidden">

      <AnimatePresence mode="wait">
        {isLoading && <CuteLoader key="loader" onComplete={() => setCurrentScreen("first")} />}

        {currentScreen === "first" && <FirstScreen key="first" onNext={() => nextScreen("question1")} />}

        {currentScreen === "question1" && (
          <QuestionScreen
            key="question1"
            question="Do you accept me🥲?"
            onYes={() => nextScreen("question2")}
            isFirst={true}
          />
        )}

        {currentScreen === "question2" && (
          <QuestionScreen
            key="question2"
            question="Do you like me🥲?"
            onYes={() => nextScreen("balloons")}
            isFirst={false}
          />
        )}

        {currentScreen === "balloons" && <BalloonsScreen key="balloons" onNext={() => nextScreen("photos")} />}

        {currentScreen === "photos" && <PhotoScreen key="photos" onNext={() => nextScreen("final")} />}

        {currentScreen === "final" && <FinalScreen key="final" />}
      </AnimatePresence>
    </div>
  )
}

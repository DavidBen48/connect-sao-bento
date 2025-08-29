"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface FancyTextProps {
  children: string
  className?: string
  typewriterWords?: string[]
}

export function FancyText({ children, className = "", typewriterWords }: FancyTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  // Parse segments with {text} for animation
  const parseSegments = (text: string) => {
    const segments: { text: string; animated: boolean }[] = []
    let currentIndex = 0

    const regex = /\{([^}]+)\}/g
    let match

    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > currentIndex) {
        segments.push({
          text: text.slice(currentIndex, match.index),
          animated: false,
        })
      }

      // Add the animated segment
      segments.push({
        text: match[1],
        animated: true,
      })

      currentIndex = match.index + match[0].length
    }

    // Add remaining text
    if (currentIndex < text.length) {
      segments.push({
        text: text.slice(currentIndex),
        animated: false,
      })
    }

    return segments
  }

  // Typewriter effect for words
  useEffect(() => {
    if (!typewriterWords || typewriterWords.length === 0) return

    const interval = setInterval(() => {
      setIsTyping(false)
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % typewriterWords.length)
        setIsTyping(true)
      }, 500)
    }, 2500)

    return () => clearInterval(interval)
  }, [typewriterWords])

  const segments = parseSegments(children)

  return (
    <span className={className}>
      {segments.map((segment, segmentIndex) => (
        <span key={segmentIndex}>
          {segment.animated
            ? // Animate each letter in animated segments
              segment.text
                .split("")
                .map((letter, letterIndex) => (
                  <motion.span
                    key={`${segmentIndex}-${letterIndex}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: segmentIndex * 0.1 + letterIndex * 0.03,
                      ease: "easeOut",
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))
            : segment.text}
        </span>
      ))}

      {typewriterWords && (
        <motion.span
          key={currentWordIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: isTyping ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-accent font-semibold"
        >
          {typewriterWords[currentWordIndex]}
        </motion.span>
      )}
    </span>
  )
}

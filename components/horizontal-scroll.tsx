"use client"

import type React from "react"
import { useRef, useEffect } from "react"

interface HorizontalScrollProps {
  className?: string
  children: React.ReactNode
  showScrollbar?: boolean
}

export function HorizontalScroll({ className = "", children, showScrollbar = true }: HorizontalScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    // Handle mouse wheel scrolling horizontally with smooth behavior
    const handleWheel = (e: WheelEvent) => {
      if (scrollContainer.contains(e.target as Node)) {
        e.preventDefault()

        // Use a smaller multiplier for smoother scrolling
        // Adjust the multiplier (0.5) to control sensitivity
        const scrollAmount = e.deltaY * 0.5

        // Use smooth scrolling behavior
        scrollContainer.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        })
      }
    }

    // Handle keyboard navigation (focus tracking)
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      if (scrollContainer.contains(target)) {
        // Get the position of the focused element relative to the scroll container
        const targetRect = target.getBoundingClientRect()
        const containerRect = scrollContainer.getBoundingClientRect()

        // Calculate if the element is outside the visible area
        const isTargetOutsideRight = targetRect.right > containerRect.right
        const isTargetOutsideLeft = targetRect.left < containerRect.left

        if (isTargetOutsideRight) {
          // Scroll to make the element visible on the right
          const scrollOffset = targetRect.right - containerRect.right + 20 // 20px extra margin
          scrollContainer.scrollBy({
            left: scrollOffset,
            behavior: "smooth",
          })
        } else if (isTargetOutsideLeft) {
          // Scroll to make the element visible on the left
          const scrollOffset = containerRect.left - targetRect.left + 20 // 20px extra margin
          scrollContainer.scrollBy({
            left: -scrollOffset,
            behavior: "smooth",
          })
        }
      }
    }

    // Add event listeners
    scrollContainer.addEventListener("wheel", handleWheel, { passive: false })
    document.addEventListener("focusin", handleFocusIn)

    // Clean up
    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel)
      document.removeEventListener("focusin", handleFocusIn)
    }
  }, [])

  return (
    <div
      ref={scrollContainerRef}
      className={`flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory ${
        showScrollbar ? "overflow-x-scroll" : "scrollbar-hide"
      } ${className}`}
      tabIndex={-1}
    >
      {children}
    </div>
  )
}

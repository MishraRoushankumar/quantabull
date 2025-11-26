"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

/**
 * Renders the avatar root container with default rounded, sized, and overflow-hidden styles, merging any provided className.
 *
 * @param className - Optional additional class names that are appended to the component's default styling.
 * @param props - Additional props are forwarded to AvatarPrimitive.Root.
 * @returns The avatar root element used as the container for the avatar image or fallback.
 */
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a Radix Avatar Image with default sizing and forwarded props.
 *
 * @returns A React element for the avatar image with `aspect-square` and `size-full` classes applied; additional props (including `className`) are forwarded to the underlying Radix `AvatarPrimitive.Image`.
 */
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

/**
 * Renders fallback content centered inside a circular avatar when an image is unavailable.
 *
 * @param className - Additional CSS class names to merge with the component's default styling
 * @returns A Radix Avatar Fallback element styled as a centered, rounded avatar background
 */
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
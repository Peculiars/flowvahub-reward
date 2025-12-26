import type React from "react"
import { useState } from "react"
import { CloudUpload, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, } from "../../ui/dialog"
import { useAuth } from "../../../context/AuthContext"
import { supabase } from "../../../lib/supabase"
import { toast } from "react-toastify"

interface ClaimVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  platformName: string
  points: number
  toolLogo?: string
}

export function ClaimVerificationModal({ isOpen, onClose, platformName, points, }: ClaimVerificationModalProps) {
  const { user } = useAuth()
  const [email, setEmail] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB")
      return
    }

    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      toast.error("Only JPG, PNG, and GIF files are allowed")
      return
    }

    setSelectedFile(file)
    setFileName(file.name)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      toast.error("Please enter your email address")
      return
    }

    if (!selectedFile) {
      toast.error("Please upload a screenshot")
      return
    }

    if (!user?.id) {
      toast.error("You must be logged in to submit a claim")
      return
    }

    setIsSubmitting(true)

    try {
      const timestamp = Date.now()
      const fileExt = selectedFile.name.split(".").pop()
      const filePath = `${user.id}/${platformName.toLowerCase()}-${timestamp}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from("claims-screenshots")
        .upload(filePath, selectedFile)

      if (uploadError) throw uploadError

      const { data: publicUrlData } = supabase.storage
        .from("claims-screenshots")
        .getPublicUrl(filePath)

      const { error: insertError } = await supabase.from("claims").insert({
        user_id: user.id,
        platform: platformName.toLowerCase(),
        email,
        screenshot_url: publicUrlData.publicUrl,
        points_reward: points,
        status: "pending",
      })

      if (insertError) throw insertError

      toast.success(
        `Claim submitted successfully! You'll receive ${points} points after verification 🎉`
      )

      setEmail("")
      setSelectedFile(null)
      setFileName("")

      setTimeout(onClose, 500)
    } catch (err) {
      console.error("Claim submission error:", err)
      toast.error(
        err instanceof Error
          ? err.message
          : "An error occurred while submitting your claim"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md bg-white rounded-lg shadow-lg border-0">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Claim Your {points} Points
          </DialogTitle>
          <DialogClose className="absolute -right-2 -top-2 rounded-full p-1 hover:bg-gray-100">
            <X className="size-5 text-gray-600" />
          </DialogClose>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              Sign up for {platformName} (free, no payment needed), then fill the
              form below:
            </p>

            <div className="space-y-2 ml-4">
              <label className="flex items-start gap-2">
                1️⃣
                <span>Enter your {platformName} sign-up email.</span>
              </label>

              <label className="flex items-start gap-2">
                2️⃣ 
                <span>
                  Upload a screenshot of your {platformName} profile showing
                  your email.
                </span>
              </label>
            </div>

            <p className="mt-3">
              After verification, you&apos;ll get {points} Flowva Points! 🎁
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email used on {platformName}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50
                         focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload screenshot (mandatory)
            </label>

            <div className="flex flex-col items-center justify-center border-2 border-dashed
                            border-gray-300 rounded-lg p-6 bg-gray-50
                            hover:border-purple-500 transition-colors">
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <CloudUpload className="size-8 text-gray-400" />
                <span className="text-sm text-gray-600">Choose file</span>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>

            {fileName && (
              <p className="text-xs text-gray-600 mt-2">
                Selected file: {fileName}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 cursor-pointer py-2 border border-gray-300 rounded-lg
                         text-gray-700 font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg
                         font-semibold hover:bg-purple-700
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Claim"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
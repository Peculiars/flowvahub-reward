import { X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, } from "../../ui/dialog"
import { FaLayerGroup } from "react-icons/fa";

interface ShareYourStackModalProps {
  isOpen: boolean
  onClose: () => void
}

const ShareYourStackModal = ({ isOpen, onClose }: ShareYourStackModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-sm bg-white rounded-lg shadow-lg border-0">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Share Your Stack
          </DialogTitle>

          <DialogClose className="absolute -right-2 -top-2 rounded-full p-1 hover:bg-gray-100">
            <X className="size-5 text-gray-600" />
          </DialogClose>
        </DialogHeader>

        <div className="flex flex-col items-center text-center py-8 px-4">
          <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <FaLayerGroup className="w-7 h-7 text-purple-600" />
          </div>

          <p className="text-sm text-gray-600">
           You have no stack created yet, go to Tech Stack to create one.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ShareYourStackModal

import { Share2 } from "lucide-react"
import { useState } from "react"
import ShareYourStackModal from "./ShareYourStackModal"

const ShareYourStackCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Share2 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Share Your Stack
              </h4>
              <p className="text-sm text-gray-500">Earn +25 pts</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Share your tool stack
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#eef2ff] hover:bg-[#9013fe] hover:text-white
                         text-[#9013fe] py-2 px-4 rounded-full font-semibold cursor-pointer
                         text-sm transition-all duration-200 inline-flex items-center gap-2"
            >
              Share
              <Share2 className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <ShareYourStackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

export default ShareYourStackCard

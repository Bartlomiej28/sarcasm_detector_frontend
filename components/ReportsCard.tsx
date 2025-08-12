'use client'
import React, {useState} from 'react'


type ReportsCardProps = {
  headline: string;
  opinion: string;
  likes: number;
};

function ReportsCard({ headline, opinion, likes }: ReportsCardProps) {
  const [likesCount, setLikesCount] = useState(likes)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () =>{
   
    if(isLiked){
      setLikesCount((prev) => prev-1)
    }else{
      setLikesCount((prev) => prev+1)
    }
    setIsLiked(prev => !prev);
  }

  return (
    <div className="w-full border border-gray-300 p-4 rounded-xl flex flex-col gap-4 justify-between">
      <div>
        <p className="text-lg md:text-xl font-bold">{headline}</p>
        <p className="italic text-sm md:text-base">{opinion}</p>
      </div>
      <div className="flex justify-between items-center">
        <button 
          className="px-3 py-1 md:px-4 text-sm md:text-base rounded-full border border-gray-300 hover:bg-gray-700 hover:text-white duration-300 cursor-pointer" 
          onClick={handleLike}
        >
          Like ({likesCount})
        </button>
        <p className="text-gray-600 text-sm md:text-base">{new Date().toLocaleDateString()}</p>
      </div>
    </div>
  )
}

export default ReportsCard
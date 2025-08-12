import React from 'react'
import ReportsCard from './ReportsCard'

type Report = {
  headline: string;
  opinion: string;
  likes: number;
  date: string
};

type ReportsProps = {
  reports: Report[];
};


function Reports({ reports }: ReportsProps) {
  return (
    <div className='w-full mt-8 md:mt-32 px-4 md:px-0'>
      <p className="text-xl md:text-2xl font-bold">Reports:</p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {reports.length > 0 ? (
          reports.map((r, i) => (
            <ReportsCard
              key={i}
              headline={r.headline}
              opinion={r.opinion}
              likes={r.likes}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No reports yet</p>
        )}
      </div>
    </div>
  )
}

export default Reports
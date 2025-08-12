"use client"
import Predict from "@/components/Predict";
import Reports from "@/components/Reports";
import { useState } from "react";

type Report = {
  headline: string,
  opinion: string,
  likes: number
  date: string
}



export default function Home() {
  const [reports, setReports] = useState<Report[]>([{
    headline: 'Scientists Confirm: Coffee Now Officially Replaces Sleep',
    opinion: 'This headline is not scientifically accurate. Please don’t skip your 8 hours.',
    likes: 7,
    date: '01.07.2025'
  }])


  const addReport = (headline: string, opinion: string, date: string) => {
    setReports(prev => [
      ...prev,
      { headline, opinion, likes: 0, date }
    ]);
  };
  return (
     <main className="w-full h-auto min-h-screen px-4 py-16 md:px-32 md:py-32 bg-gradient-to-br from-[#fff9e5] via-[#ebefff] to-[#f0ddff]">
      <div className="w-full h-auto flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl md:text-5xl font-semibold w-full md:w-3/5 max-w-4xl">
          Unveil the Truth of Headlines with Sarcasm Sniffer
        </h1>
        <p className="w-full md:w-3/5 mt-4 text-gray-600 mb-4 max-w-3xl">
          Sarcasm Sniffer is an open-source sarcasm detection tools designed to reveal the truth hidden within headlines
        </p>
        <Predict onNewReport={addReport} />   
      </div>
      <Reports reports={reports} />
    </main>
  );
}

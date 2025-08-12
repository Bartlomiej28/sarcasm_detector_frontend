'use client'
import React from 'react'
import { useState } from "react";

type Result = {
  headline: string
  is_sarcastic: boolean;
  label_str: string;
  score: any
};

type ApiError = {
  error: string;
};

type PredictProps = {
  onNewReport: (headline: string, opinion: string, date: string) => void;
};

function Predict({ onNewReport }: PredictProps) {
    const [headline, setHeadline] = useState<string>("");
    const [result, setResult] = useState<Result | ApiError | null>(null);
    const [loading, setLoading] = useState(false);

    const handleCheck = async () => {
        if (!headline.trim()) return;
        setLoading(true);
        try {
        const res = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: headline }),
        });

        const data = await res.json();
        setResult(data);
        } catch (error) {
        console.error("API error:", error);
        setResult({ error: "Something went wrong." });
        } finally {
        setLoading(false);
        }
    };

    
  const handleCancel = () => setResult(null);
  const handleReport = () => {
    if (result && !('error' in result)) {
      const opinion = result.is_sarcastic 
        ? "This headline is sarcastic. Don't take it seriously!" 
        : "This headline seems to be factual.";
      const date = new Date().toLocaleDateString();
      onNewReport(result.headline, opinion, date);
    }
    setResult(null);
  };

return (
    <div className="w-full relative flex flex-col sm:flex-row items-center justify-center">
      <div className="w-full sm:w-auto flex">
        <input
          type="text"
          className="rounded-full px-4 py-2 w-full sm:w-96 border border-gray-300 focus:outline-none focus:ring-0"
          placeholder="Type headline..."
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
        />
        <button
          onClick={handleCheck}
          className="bg-gray-800 px-4 py-2 rounded-full text-white sm:relative sm:-left-8 cursor-pointer"
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {result && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white p-6 rounded-2xl flex flex-col gap-2 shadow-xl">
            {"error" in result ? (
              <p className="text-red-500">{result.error}</p>
            ) : (
              <>
                <div className="text-lg flex flex-row gap-4">
                  <strong>Result:</strong>{" "}
                  {result.is_sarcastic ? "😏 Sarcastic" : "✅ Not Sarcastic"}
                </div>
                <div className="text-sm text-gray-600 flex flex-row gap-4">
                  Confidence:{" "}
                  {result.is_sarcastic
                    ? (result.score * 100).toFixed(2)
                    : (100 - result.score * 100).toFixed(2)}%
                </div>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    onClick={handleReport}
                    className="px-4 py-1 rounded-full text-white bg-gray-800 cursor-pointer"
                  >
                    Report
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-1 rounded-full border border-gray-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Predict


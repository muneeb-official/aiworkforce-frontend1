import React, { useState, useEffect } from "react";
import { ChevronLeft, Trash2 } from "lucide-react";
import bgImage from "../assets/Background.png";
import { competitorArticles } from "../data/blogMockData";

export default function CompetitorArticles({ onBack }) {
  const [selectedArticles, setSelectedArticles] = useState([
    1, 2, 3, 4, 5, 6, 7, 8,
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleArticleSelection = (articleId) => {
    setSelectedArticles((prev) => {
      if (prev.includes(articleId)) {
        return prev.filter((id) => id !== articleId);
      } else {
        return [...prev, articleId];
      }
    });
  };

  const calculateAverageWordCount = () => {
    if (selectedArticles.length === 0) return 0;
    const total = selectedArticles.reduce((sum, id) => {
      const article = competitorArticles.find((a) => a.id === id);
      return sum + (article?.wordCount || 0);
    }, 0);
    return Math.round(total / selectedArticles.length);
  };

  const formatWordCount = (count) => {
    return count.toLocaleString();
  };

  return (
    <div
      className="w-full bg-cover bg-center bg-no-repeat bg-fixed min-h-screen"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="pt-5 mx-6">
        {/* Header */}
        <div className="mb-2 bg-white px-5 pt-5">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center text-gray-900 mb-6 hover:text-gray-700"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-lg">Back</span>
          </button>

          <h1 className="text-4xl text-gray-900">
            Choose Competitor Articles for Analysis
          </h1>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl font-medium text-gray-900">
                Select 5-10 articles to analyze. Articles are sorted by word
                count (highest first).
              </p>
            </div>
            {/* Continue Button */}
            <div className="flex justify-end mb-6">
              <button className="bg-blue-700 text-white px-6 py-2 rounded-full text-sm">
                Continue with {selectedArticles.length} Articles
              </button>
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <>
            <style>{`
      @keyframes flash {
        0%, 100% { background-color: rgb(209, 213, 219); }
        50% { background-color: rgb(17, 24, 39); }
      }
    `}</style>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 max-w-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  We are fetching all the information
                </h2>
                <p className="text-gray-600 mb-6">
                  Please wait, It will take a few seconds.
                </p>
                <div className="flex justify-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-[flash_1.4s_ease-in-out_infinite]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-[flash_1.4s_ease-in-out_0.2s_infinite]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-[flash_1.4s_ease-in-out_0.4s_infinite]"></div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-3">
          {/* Left Column - Articles List */}
          <div className="space-y-3">
            {isLoading
              ? // Skeleton Loading Cards
                Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="bg-white rounded-lg p-5 animate-pulse"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 pt-1">
                        <div className="w-5 h-5 bg-gray-300 rounded"></div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="h-8 w-24 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))
              : // Actual Articles
                competitorArticles.map((article) => {
                  const isSelected = selectedArticles.includes(article.id);
                  return (
                    <div
                      key={article.id}
                      className="bg-white rounded-lg p-5 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        {/* Checkbox */}
                        <div className="flex-shrink-0 pt-1">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleArticleSelection(article.id)}
                            className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900">
                            {article.title}
                          </h3>
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-500 font-semibold text-sm mb-2 block truncate"
                          >
                            {article.url}
                          </a>
                          <p className="text-gray-700 text-sm">
                            {article.excerpt}
                          </p>
                        </div>

                        {/* Word Count */}
                        <div className="flex-shrink-0 text-right">
                          <p className="text-green-600 font-semibold text-base bg-green-50 px-3 py-1 rounded-full">
                            {formatWordCount(article.wordCount)} words
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-2">
            {/* Successfully Scraped */}
            <div className="bg-white rounded-lg pt-2 px-3 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Successfully scraped
              </h3>
              {isLoading ? (
                <div className="flex items-baseline gap-2 pb-6">
                  <div className="h-16 w-16 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-8 w-12 bg-gray-300 rounded animate-pulse"></div>
                </div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-semibold text-gray-900">
                    {competitorArticles.length}
                  </span>
                  <span className="text-gray-600 text-lg pb-6">
                    /{competitorArticles.length}
                  </span>
                </div>
              )}
            </div>

            {/* Average Word Count */}
            <div className="bg-white rounded-lg pt-2 px-3 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Average word count
              </h3>
              {isLoading ? (
                <div className="flex items-baseline gap-2 pb-6">
                  <div className="h-16 w-32 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-8 w-16 bg-gray-300 rounded animate-pulse"></div>
                </div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-semibold text-gray-900">
                    {formatWordCount(calculateAverageWordCount())}
                  </span>
                  <span className="text-gray-900 text-lg pb-6">Words</span>
                </div>
              )}
            </div>

            {/* Selected Articles */}
            <div className="bg-white rounded-lg  pt-2 px-3 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Selected Articles
              </h3>
              {isLoading ? (
                <div className="flex items-baseline gap-2 pb-6">
                  <div className="h-16 w-16 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-8 w-20 bg-gray-300 rounded animate-pulse"></div>
                </div>
              ) : (
                <div className="flex items-baseline gap-2 pb-6">
                  <span className="text-6xl font-semibold text-gray-900">
                    {selectedArticles.length}
                  </span>
                  <span className="text-gray-900 text-lg">Articles</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

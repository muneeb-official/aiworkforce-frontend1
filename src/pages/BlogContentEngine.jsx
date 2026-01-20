import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import bgImage from "../assets/Background.png";
import {
  savedKeywords,
  pastKeywords,
  searchLocations,
  searchLanguages,
} from "../data/blogMockData";
import CompetitorArticles from "./CompetitorArticles";

export default function BlogContentEngine() {
  const [activeTab, setActiveTab] = useState("research");
const [showCompetitorArticles, setShowCompetitorArticles] = useState(false);

const handleSubmit = (e) => {
     e.preventDefault();
     setShowCompetitorArticles(true);
   };

   const handleBackFromCompetitor = () => {
     setShowCompetitorArticles(false);
   };
   if (showCompetitorArticles) {
     return <CompetitorArticles onBack={handleBackFromCompetitor} />;
   }

  return (
    <div
      className="w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className=" px-8 pt-8">
        {/* Header */}
        <div className="mb-8 bg-white p-5 rounded-[2rem]">
          <h1 className="text-4xl font-normal text-gray-900">
            Blog & Content Engine
          </h1>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-3">
          <button
            onClick={() => setActiveTab("research")}
            className={`rounded-full px-5 py-1.5 text-sm shadow-sm ${
              activeTab === "research"
                ? "bg-gray-900 text-white"
                : "border-2 border-gray-800 bg-white text-gray-900 hover:bg-gray-50"
            }`}
          >
            Content Research Tool
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-full px-5 py-1 text-sm shadow-sm ${
              activeTab === "saved"
                ? "bg-gray-900 text-white"
                : "border-2 border-gray-800 bg-white text-gray-900 hover:bg-gray-50"
            }`}
          >
            Saved Blogs
          </button>
        </div>

        {/* Main Grid - Content Research Tool */}
        {activeTab === "research" && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Left Column - Past Keywords */}
            <div className="bg-[#FBFBFF] px-3 py-2 h-[calc(100vh-32vh)] overflow-y-auto scrollbar-hide">
              <h2 className="mb-2 text-[1.3rem] font-semibold text-gray-900">
                Past Keywords Searched
              </h2>

              <div className="space-y-0">
                {pastKeywords.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-3 hover:bg-[#efeffc] px-5"
                  >
                    <div className="flex-1">
                      <p className="text-[1.3rem] font-semibold text-gray-900">
                        {item.keyword}
                      </p>
                      <p className="text-md text-gray-900">
                        Searched on {item.searchedOn}
                      </p>
                    </div>

                    <div className="flex items-center gap-5">
                      <div className="text-center">
                        <p className="text-sm text-gray-900 font-semibold">
                          Volume
                        </p>
                        <p className="text-md text-gray-900">{item.volume}</p>
                      </div>

                      <button className="flex items-center gap-1.5 text-md duration-200 hover:bg-black hover:text-white py-2 px-3 rounded-full">
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit in editor
                      </button>

                      <button className="text-gray-800 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="bg-white px-4 py-2">
              <h2 className="mb-4 text-[1.3rem] font-semibold text-gray-900">
                Get results for any keywords
              </h2>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-2 block text-md text-gray-900">
                    I would like to rank/create content for{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Keyword"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-md text-gray-900">
                    Search Location <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-400 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 bg-white">
                    <option>-- Select Location --</option>
                    {searchLocations.map((locations) => (
                      <option key={locations.id} value={locations.value}>
                        {locations.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-md text-gray-900">
                    Search Lang <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-400 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 bg-white">
                    <option>-- Select Language --</option>
                    {searchLanguages.map((language) => (
                      <option key={language.id} value={language.value}>
                        {language.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full rounded-full bg-blue-600 py-3 text-md text-white shadow-sm hover:bg-blue-700 transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Saved Blogs View */}
        {activeTab === "saved" && (
          <div className="bg-[#FBFBFF] px-3 py-2 h-[calc(100vh-32vh)] overflow-y-auto scrollbar-hide">
            <h2 className="mb-2 text-[1.3rem] font-semibold text-gray-900">
              Saved Blogs
            </h2>

            <div className="space-y-0">
              {savedKeywords.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3 hover:bg-[#efeffc] px-5"
                >
                  <div className="flex-1">
                    <p className="text-[1.3rem] font-semibold text-gray-900">
                      {item.keyword}
                    </p>
                    <p className="text-md text-gray-900">
                      Searched on {item.searchedOn}
                    </p>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="text-center">
                      <p className="text-sm text-gray-900 font-semibold">
                        Volume
                      </p>
                      <p className="text-md text-gray-900">{item.volume}</p>
                    </div>

                    <button className="flex items-center gap-1.5 text-md duration-200 hover:bg-black hover:text-white py-2 px-3 rounded-full">
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit in editor
                    </button>

                    <button className="text-gray-800 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

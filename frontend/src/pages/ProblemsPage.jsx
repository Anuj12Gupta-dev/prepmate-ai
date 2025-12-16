import Navbar from "../components/Navbar";
import { useState, useMemo } from "react";

import { PROBLEMS } from "../data/problems";
import { ChevronRightIcon, Code2Icon, SearchIcon, FilterIcon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { Link } from "react-router";

function ProblemsPage() {
  const allProblems = Object.values(PROBLEMS);
  
  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  
  // Filter problems based on search term and difficulty
  const filteredProblems = useMemo(() => {
    return allProblems.filter(problem => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      
      const matchesSearch = problem.title.toLowerCase().includes(lowerSearchTerm) || 
                            (problem.description.text && problem.description.text.toLowerCase().includes(lowerSearchTerm));
                            
      const matchesDifficulty = difficultyFilter === "All" || problem.difficulty === difficultyFilter;
      
      return matchesSearch && matchesDifficulty;
    });
  }, [searchTerm, difficultyFilter, allProblems]);

  const easyProblemsCount = allProblems.filter((p) => p.difficulty === "Easy").length;
  const mediumProblemsCount = allProblems.filter((p) => p.difficulty === "Medium").length;
  const hardProblemsCount = allProblems.filter((p) => p.difficulty === "Hard").length;
  
  // Helper to adjust badge class for dark theme readability (assuming getDifficultyBadgeClass is defined elsewhere)
  const getCustomBadgeClass = (difficulty) => {
    const baseClasses = "px-2 py-0.5 text-xs font-medium rounded-full flex-shrink-0";
    switch (difficulty.toLowerCase()) {
      case 'easy': return `${baseClasses} bg-green-600/20 text-green-400`;
      case 'medium': return `${baseClasses} bg-yellow-600/20 text-yellow-400`;
      case 'hard': return `${baseClasses} bg-red-600/20 text-red-400`;
      default: return `${baseClasses} bg-slate-700 text-slate-400`;
    }
  };


  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 pt-20 pb-12">
        
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2 text-white">Practice Problems Library</h1>
          <p className="text-slate-400">
            Sharpen your coding skills with these curated problems across various difficulties.
          </p>
        </div>

        {/* FILTER CONTROLS */}
        <div className="mb-8 p-5 rounded-xl border border-white/10 bg-slate-900 shadow-lg">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            
            {/* Search Box */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon className="size-5 text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="Search problems by title or description..."
                className="w-full h-10 px-4 pl-10 rounded-lg border border-white/10 bg-slate-800 text-white placeholder-slate-500 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Difficulty Filter */}
            <div className="flex items-center gap-2 flex-shrink-0 w-full md:w-auto">
              <FilterIcon className="size-5 text-slate-500 hidden md:block" />
              <select
                className="w-full h-10 px-4 rounded-lg border border-white/10 bg-slate-800 text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none pr-8 text-sm"
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
              >
                <option value="All" className="bg-slate-700">All Difficulties</option>
                <option value="Easy" className="bg-slate-700">Easy</option>
                <option value="Medium" className="bg-slate-700">Medium</option>
                <option value="Hard" className="bg-slate-700">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* PROBLEMS LIST */}
        <div className="space-y-4">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem) => (
              <Link
                key={problem.id}
                to={`/problem/${problem.id}`}
                className="block p-5 rounded-xl border border-white/5 bg-slate-900 shadow-md hover:border-blue-600/50 hover:bg-slate-800/50 transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-6">
                  {/* LEFT SIDE: Details */}
                  <div className="flex-1 flex items-start gap-4 min-w-0">
                    <div className="size-10 rounded-lg bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Code2Icon className="size-5 text-blue-400" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-xl font-semibold truncate text-white">{problem.title}</h2>
                        <span className={getCustomBadgeClass(problem.difficulty)}>
                          {problem.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mb-2 truncate"> {problem.category}</p>
                      <p className="text-sm text-slate-300 line-clamp-2">{problem.description.text}</p>
                    </div>
                  </div>
                  
                  {/* RIGHT SIDE: Action */}
                  <div className="flex items-center gap-1 text-blue-400 flex-shrink-0">
                    <span className="text-sm font-medium hidden sm:block">Start Solving</span>
                    <ChevronRightIcon className="size-5" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-8 text-center rounded-xl border border-white/10 bg-slate-900 shadow-md">
              <h3 className="text-xl font-bold mb-2 text-white">No problems found</h3>
              <p className="text-slate-500">
                Try adjusting your search query or changing the difficulty filter.
              </p>
            </div>
          )}
        </div>

        {/* STATS FOOTER */}
        <div className="mt-12 p-6 rounded-xl border border-white/10 bg-slate-900 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="flex flex-col items-center p-3">
              <div className="text-xs text-slate-400 mb-1 font-medium">Total Problems</div>
              <div className="text-3xl font-extrabold text-blue-400">{allProblems.length}</div>
            </div>

            <div className="flex flex-col items-center p-3 border-l border-white/5">
              <div className="text-xs text-slate-400 mb-1 font-medium">Easy</div>
              <div className="text-3xl font-extrabold text-green-400">{easyProblemsCount}</div>
            </div>
            
            <div className="flex flex-col items-center p-3 border-l border-white/5">
              <div className="text-xs text-slate-400 mb-1 font-medium">Medium</div>
              <div className="text-3xl font-extrabold text-yellow-400">{mediumProblemsCount}</div>
            </div>
            
            <div className="flex flex-col items-center p-3 border-l border-white/5">
              <div className="text-xs text-slate-400 mb-1 font-medium">Hard</div>
              <div className="text-3xl font-extrabold text-red-400">{hardProblemsCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemsPage;
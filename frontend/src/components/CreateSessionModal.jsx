import { useState, useMemo } from "react";
import { Code2Icon, LoaderIcon, PlusIcon, SearchIcon, FilterIcon, LockIcon } from "lucide-react";
import { PROBLEMS } from "../data/problems";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
  onSetPassword,
}) {
  const allProblems = Object.values(PROBLEMS);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  
  const filteredProblems = useMemo(() => {
    return allProblems.filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = difficultyFilter === "All" || problem.difficulty === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    });
  }, [searchTerm, difficultyFilter, allProblems]);

  if (!isOpen) return null;

  // Helper to determine difficulty badge color (needs definition in your project, using placeholders)
  const getDifficultyBadgeClass = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-600/20 text-green-400';
      case 'medium': return 'bg-yellow-600/20 text-yellow-400';
      case 'hard': return 'bg-red-600/20 text-red-400';
      default: return 'bg-slate-700 text-slate-400';
    }
  };

  return (
    // Modal Backdrop and Container
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm">
      
      {/* Modal Box */}
      <div className="relative w-full max-w-2xl max-h-[90vh] mx-4 rounded-xl border border-white/10 bg-slate-900 shadow-2xl flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-white/5">
          <h3 className="font-semibold text-2xl text-white">Create New Session</h3>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-grow space-y-8">
          
          {/* PROBLEM SELECTION */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-slate-300">
              Select Problem <span className="text-red-500">*</span>
            </label>

            {/* FILTER CONTROLS */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Search Box */}
              <div className="relative flex-grow w-full sm:w-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <SearchIcon className="size-4 text-slate-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search problems..."
                  className="w-full h-10 px-4 pl-10 rounded-lg border border-white/10 bg-slate-800 text-white placeholder-slate-500 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Difficulty Filter */}
              <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                <FilterIcon className="size-4 text-slate-500 hidden sm:block" />
                <select
                  className="w-full h-10 px-3 rounded-lg border border-white/10 bg-slate-800 text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none pr-8 text-sm"
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Scrollable Problems List */}
            <div className="border border-white/10 rounded-lg max-h-60 overflow-y-auto">
              {filteredProblems.length > 0 ? (
                filteredProblems.map((problem) => (
                  <div
                    key={problem.id}
                    className={`p-4 border-b border-white/5 last:border-b-0 cursor-pointer transition-colors 
                      ${roomConfig.problem === problem.title 
                        ? "bg-blue-600/10 hover:bg-blue-600/15 border-l-4 border-blue-500" 
                        : "hover:bg-slate-800"
                      }`}
                    onClick={() => {
                      setRoomConfig({
                        difficulty: problem.difficulty,
                        problem: problem.title,
                      });
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-white text-base">{problem.title}</span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getDifficultyBadgeClass(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{problem.category}</div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-slate-500">
                  No problems found. Try adjusting your search or filter.
                </div>
              )}
            </div>
          </div>

          {/* ROOM SUMMARY */}
          {roomConfig.problem && (
            <div className="p-4 rounded-lg bg-blue-600/10 border border-blue-500/50 text-white">
              <div className="flex items-start gap-4">
                <Code2Icon className="size-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-base mb-1">Session Configuration</p>
                  <p className="text-sm text-slate-300">
                    Problem: <span className="font-medium text-white">{roomConfig.problem}</span>
                  </p>
                  <p className="text-sm text-slate-300">
                    Difficulty: <span className="font-medium text-white">{roomConfig.difficulty}</span>
                  </p>
                  <p className="text-sm text-slate-300">
                    Max Participants: <span className="font-medium text-white">2 (1-on-1 session)</span>
                  </p>
                  {roomConfig.password && (
                    <p className="text-sm text-slate-300 mt-2 flex items-center gap-1">
                      <LockIcon className="size-4 text-blue-400" />
                      <span>Password Protected</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 p-4 border-t border-white/5">
          <button className="h-10 px-5 rounded-full text-slate-400 hover:bg-white/5 transition-colors" onClick={onClose}>
            Cancel
          </button>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {!roomConfig.password ? (
              <button
                type="button"
                className="h-10 px-4 rounded-full bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors flex items-center justify-center gap-2"
                onClick={onSetPassword}
              >
                <LockIcon className="size-4" />
                Add Password
              </button>
            ) : (
              <button
                type="button"
                className="h-10 px-4 rounded-full bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors flex items-center justify-center gap-2"
                onClick={() => setRoomConfig(prev => ({ ...prev, password: null }))}
              >
                <LockIcon className="size-4" />
                Remove Password
              </button>
            )}
            
            <button
              className="h-10 px-6 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onCreateRoom}
              disabled={isCreating || !roomConfig.problem}
            >
              {isCreating ? (
                <LoaderIcon className="size-5 animate-spin" />
              ) : (
                <PlusIcon className="size-5" />
              )}
              {isCreating ? "Creating..." : "Create Session"}
            </button>
          </div>
        </div>
      </div>
      
      {/* Clickable Backdrop for closing */}
      <div className="absolute inset-0 z-[-1]" onClick={onClose}></div>
    </div>
  );
}

export default CreateSessionModal;
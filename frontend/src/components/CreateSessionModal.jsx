import { useState, useMemo } from "react";
import { Code2Icon, LoaderIcon, PlusIcon, SearchIcon, FilterIcon } from "lucide-react";
import { PROBLEMS } from "../data/problems";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const allProblems = Object.values(PROBLEMS);
  
  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  
  // Filter problems based on search term and difficulty
  const filteredProblems = useMemo(() => {
    return allProblems.filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = difficultyFilter === "All" || problem.difficulty === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    });
  }, [searchTerm, difficultyFilter]);

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="font-bold text-2xl mb-6">Create New Session</h3>

        <div className="space-y-8">
          {/* PROBLEM SELECTION */}
          <div className="space-y-4">
            <label className="label">
              <span className="label-text font-semibold">Select Problem</span>
              <span className="label-text-alt text-error">*</span>
            </label>

            {/* FILTER CONTROLS */}
            <div className="space-y-3">
              {/* Search Box */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-base-content/50" />
                </div>
                <input
                  type="text"
                  placeholder="Search problems..."
                  className="input input-bordered w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Difficulty Filter */}
              <div className="flex items-center gap-2">
                <FilterIcon className="h-5 w-5 text-base-content/50" />
                <select
                  className="select select-bordered"
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
            <div className="border border-base-300 rounded-lg max-h-60 overflow-y-auto">
              {filteredProblems.length > 0 ? (
                filteredProblems.map((problem) => (
                  <div
                    key={problem.id}
                    className={`p-3 border-b border-base-300 last:border-b-0 cursor-pointer hover:bg-base-200 transition-colors ${
                      roomConfig.problem === problem.title ? "bg-primary/10" : ""
                    }`}
                    onClick={() => {
                      setRoomConfig({
                        difficulty: problem.difficulty,
                        problem: problem.title,
                      });
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{problem.title}</span>
                      <span className="badge badge-sm">{problem.difficulty}</span>
                    </div>
                    <div className="text-sm text-base-content/60 mt-1">{problem.category}</div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-base-content/70">
                  No problems found. Try adjusting your search or filter.
                </div>
              )}
            </div>
          </div>

          {/* ROOM SUMMARY */}
          {roomConfig.problem && (
            <div className="alert alert-success">
              <Code2Icon className="size-5" />
              <div>
                <p className="font-semibold">Room Summary:</p>
                <p>
                  Problem: <span className="font-medium">{roomConfig.problem}</span>
                </p>
                <p>
                  Max Participants: <span className="font-medium">2 (1-on-1 session)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn btn-primary gap-2"
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problem}
          >
            {isCreating ? (
              <LoaderIcon className="size-5 animate-spin" />
            ) : (
              <PlusIcon className="size-5" />
            )}

            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}

export default CreateSessionModal;
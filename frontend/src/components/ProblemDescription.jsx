import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

function ProblemDescription({ problem, currentProblemId, onProblemChange, allProblems }) {
  // Find current index and calculate prev/next
  const currentIndex = allProblems.findIndex(p => p.id === currentProblemId);
  const prevProblem = currentIndex > 0 ? allProblems[currentIndex - 1] : null;
  const nextProblem = currentIndex < allProblems.length - 1 ? allProblems[currentIndex + 1] : null;

  return (
    // Main Container: Dark background, column layout, full height
    <div className="h-full bg-slate-900 flex flex-col rounded-t-xl border border-white/5">
      
      {/* HEADER BAR WITH NAVIGATION */}
      <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-slate-800 rounded-t-xl">
        {/* Previous Button */}
        {prevProblem ? (
          <button 
            onClick={() => onProblemChange(prevProblem.id)}
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeftIcon className="size-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>
        ) : (
          <div></div> // Empty div for spacing
        )}

        {/* Problem Selector Dropdown */}
        <select 
          value={currentProblemId}
          onChange={(e) => onProblemChange(e.target.value)}
          className="px-3 py-1 bg-slate-700 border border-white/10 rounded-lg text-white text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          {allProblems.map(problem => (
            <option key={problem.id} value={problem.id} className="bg-slate-700">
              {problem.title}
            </option>
          ))}
        </select>

        {/* Next Button */}
        {nextProblem ? (
          <button 
            onClick={() => onProblemChange(nextProblem.id)}
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRightIcon className="size-4" />
          </button>
        ) : (
          <div></div> // Empty div for spacing
        )}
      </div>

      {/* SCROLLABLE CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* PROBLEM TITLE & DIFFICULTY */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-white">{problem?.title}</h1>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${
              problem?.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
              problem?.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {problem?.difficulty}
            </span>
          </div>
          <p className="text-slate-400 text-sm">{problem?.category}</p>
        </div>

        {/* PROBLEM DESCRIPTION */}
        {problem?.description && (
          <div className="p-5 rounded-xl border border-white/5 bg-slate-800/50">
            <h2 className="text-lg font-semibold mb-3 text-white">Description</h2>
            <div className="space-y-3 text-slate-300 leading-relaxed">
              <p>{problem.description.text}</p>
              {problem.description.notes?.map((note, idx) => (
                <p key={idx} className="text-slate-400 italic text-sm">
                  {note}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* EXAMPLES */}
        {problem?.examples && problem.examples.length > 0 && (
          <div className="p-5 rounded-xl border border-white/5 bg-slate-800/50">
            <h2 className="text-lg font-semibold mb-3 text-white">Examples</h2>
            <div className="space-y-4">
              {problem.examples.map((example, idx) => (
                <div key={idx} className="bg-slate-700/50 rounded-lg p-4 font-mono text-sm">
                  <div className="flex gap-2 mb-2">
                    <span className="text-blue-400 font-bold min-w-[50px]">Input:</span>
                    <span className="text-slate-200">{example.input}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-violet-400 font-bold min-w-[50px]">Output:</span>
                    <span className="text-slate-200">{example.output}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONSTRAINTS */}
        {problem?.constraints && problem.constraints.length > 0 && (
          <div className="p-5 rounded-xl border border-white/5 bg-slate-800/50">
            <h2 className="text-lg font-semibold mb-3 text-white">Constraints</h2>
            <ul className="space-y-2 text-slate-300">
              {problem.constraints.map((constraint, idx) => (
                <li key={idx} className="flex gap-2 items-start">
                  <span className="text-blue-500 mt-1">•</span>
                  <code className="text-sm bg-slate-700/50 rounded px-2 py-1 leading-relaxed">{constraint}</code>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProblemDescription;
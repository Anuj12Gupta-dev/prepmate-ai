function OutputPanel({ output, testCases, selectedTestCase, onSelectTestCase, testCaseResults, expectedOutput , success }) {
  console.log("first"+output)
  console.log(success)
  return (
    // Main Container: Dark background, column layout
    <div className="h-full bg-slate-900 flex flex-col rounded-b-xl border border-t-0 border-white/5">
      
      {/* Header Bar */}
      <div className="px-4 py-2 border-b border-white/10 font-semibold text-sm text-white bg-slate-800 rounded-t-xl">
        Output Console
      </div>
      
      {/* Test Cases Tabs (LeetCode-style horizontal tabs) */}
      {testCases && testCases.length > 0 && (
        <div className="flex border-b border-white/10 bg-slate-800 px-2 gap-1 md:gap-2">
          {testCases.map((testCase, index) => {
            // Get the result for this test case if it exists
            const result = testCaseResults[index];
            let tabClass = "px-4 py-2 text-sm font-medium border-b-2 transition-colors ";
            
            if (result) {
              // Test case has been run
              tabClass += result.passed 
                ? "border-green-500 text-green-400" 
                : "border-red-500 text-red-400";
            } else {
              // Test case has not been run yet
              tabClass += selectedTestCase === index
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-200";
            }
            
            return (
              <button
                key={index}
                className={tabClass}
                onClick={() => onSelectTestCase(index)}
              >
                Case {index + 1}
              </button>
            );
          })}
        </div>
      )}
      
      {/* Output Content Area */}
      <div className="flex-1 overflow-auto p-4 text-sm font-mono">
        {/* Show test case details when test cases exist */}
        {testCases && testCases.length > 0 && selectedTestCase !== null && (
          <div className="mb-4">
            <div className="flex gap-2 mb-2">
              <span className="font-bold min-w-[70px] text-blue-400">Input:</span>
              <span className="text-slate-200">{testCases[selectedTestCase].input}</span>
            </div>
            
            {/* Show user's actual output for this test case - only when available */}
            {testCaseResults[selectedTestCase] && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex gap-2 mb-2">
                  <span className="font-bold min-w-[70px] text-amber-400">Your Output:</span>
                  <span className={` ${!testCaseResults[selectedTestCase].passed ? 'text-red-400' : 'text-slate-200'}`}>{testCaseResults[selectedTestCase].actualOutput}</span>
                </div>
                {testCaseResults[selectedTestCase].passed && (
                  <div className="flex gap-2">
                    <span className="font-bold min-w-[70px] text-emerald-400">Expected:</span>
                    <span className="text-slate-200">{testCaseResults[selectedTestCase].expectedOutput}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Show general output messages - only when output is available (after running code) */}
        {
          success === false ? (
           <pre className="text-red-400 whitespace-pre-wrap">
              {output} 
          </pre> 
           ) : null
        }

        {output && output.success ? (
          // Success State (Green Text) - Only show the actual output from piston API
          <pre className="text-green-400 whitespace-pre-wrap">  
              All test cases passed 
          </pre>
        ) : output && !output.success ? (
          // Error State - Only show the error from piston API
          <pre className="text-red-400 whitespace-pre-wrap">
            {output.error}
          </pre>
        ) : (
          // Default empty state - only show when no output is available
          <p className="text-slate-500 text-sm italic">Run code to see output here...</p>
        )}
      </div>
    </div>
  );
}
export default OutputPanel;
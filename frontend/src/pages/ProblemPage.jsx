import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems";
import Navbar from "../components/Navbar";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import OutputPanel from "../components/OutputPanel";
import CodeEditorPanel from "../components/CodeEditorPanel";
import { executeCode } from "../lib/piston";

import toast from "react-hot-toast";
import confetti from "canvas-confetti";

function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Initialize with a default problem ID if the URL is empty or invalid
  const defaultProblemId = Object.keys(PROBLEMS)[0] || "two-sum";
  const initialProblemId = id && PROBLEMS[id] ? id : defaultProblemId;

  const [currentProblemId, setCurrentProblemId] = useState(initialProblemId);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(PROBLEMS[initialProblemId].starterCode.javascript);
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState(0); // Default to first test case
  const [testCaseResults, setTestCaseResults] = useState({}); // Store results for each test case

  // Derive current problem object
  const currentProblem = PROBLEMS[currentProblemId];

  // Effect to update state when URL param changes
  useEffect(() => {
    if (id && PROBLEMS[id] && id !== currentProblemId) {
      setCurrentProblemId(id);
      // Reset code to new problem's starter code for the currently selected language
      setCode(PROBLEMS[id].starterCode[selectedLanguage] || PROBLEMS[id].starterCode.javascript);
      setOutput(null); // Clear previous output
    }
  }, [id, currentProblemId, selectedLanguage]);

  // Handler for changing the programming language
  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    // Use the current problem's starter code for the new language
    setCode(currentProblem.starterCode[newLang]);
    setOutput(null);
  };

  // Handler for changing the problem (updates URL)
  const handleProblemChange = (newProblemId) => navigate(`/problem/${newProblemId}`);

  // Confetti effect helper
  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.2, y: 0.6 },
    });

    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.8, y: 0.6 },
    });
  }, []);

  // Normalize code output for robust comparison
  const normalizeOutput = useCallback((output) => {
    if (typeof output !== 'string') return '';
    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          .replace(/\s*,\s*/g, ",")
      )
      .filter((line) => line.length > 0)
      .join("\n");
  }, []);

  // Check if test output matches expected output
  const checkIfTestsPassed = useCallback((actualOutput, expectedOutput) => {
    const normalizedActual = normalizeOutput(actualOutput);
    const normalizedExpected = normalizeOutput(expectedOutput);

    return normalizedActual === normalizedExpected;
  }, [normalizeOutput]);

  // Handler for running code
  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    // Ensure currentProblem and starterCode exists before executing
    if (!currentProblem || !currentProblem.starterCode[selectedLanguage]) {
      toast.error("Invalid problem or language selection.");
      setIsRunning(false);
      return;
    }

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);

    // Process test case results if execution was successful
    if (result.success && currentProblem.expectedOutput?.[selectedLanguage]) {
      // Split the expected output by lines
      const expectedOutputs = currentProblem.expectedOutput[selectedLanguage].split('\n');
      
      // Split the actual output by lines
      const actualOutputs = result.output.split('\n');
      
      // Create a copy of current results
      const updatedResults = { ...testCaseResults };
      
      // Process each test case
      for (let i = 0; i < expectedOutputs.length && i < actualOutputs.length; i++) {
        const normalizedActual = normalizeOutput(actualOutputs[i]);
        const normalizedExpected = normalizeOutput(expectedOutputs[i]);
        
        updatedResults[i] = {
          passed: normalizedActual === normalizedExpected,
          actualOutput: actualOutputs[i].trim(),
          expectedOutput: expectedOutputs[i].trim()
        };
      }
      
      setTestCaseResults(updatedResults);
      
      // Check overall result
      const allTestsPassed = Object.values(updatedResults).every(result => result.passed);
      
      if (allTestsPassed) {
        triggerConfetti();
        toast.success("All tests passed! Great job!");
      } else {
        toast.error("Some tests failed. Check your output against the examples.");
      }
    } else if (!result.success) {
      toast.error("Code execution failed! Check the console for errors.");
    }
  };

  return (
    // Outer container: Full screen height, dark background
    <div className="h-screen bg-slate-950 flex flex-col text-white">
      <Navbar />

      <div className="flex-1 min-h-0 pt-15">
        <PanelGroup direction="horizontal">
          
          {/* Left Panel: Problem Description */}
          <Panel defaultSize={40} minSize={30}>
            <ProblemDescription
              problem={currentProblem}
              currentProblemId={currentProblemId}
              onProblemChange={handleProblemChange}
              allProblems={Object.values(PROBLEMS)}
            />
          </Panel>

          {/* Horizontal Resize Handle */}
          <PanelResizeHandle className="w-2 bg-slate-800 hover:bg-blue-600 transition-colors cursor-col-resize border-x border-white/5" />

          {/* Right Panel: Code Editor & Output */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              
              {/* Top Panel - Code Editor */}
              <Panel defaultSize={70} minSize={30}>
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                />
              </Panel>

              {/* Vertical Resize Handle */}
              <PanelResizeHandle className="h-2 bg-slate-800 hover:bg-blue-600 transition-colors cursor-row-resize border-y border-white/5" />

              {/* Bottom Panel - Output Console */}
              <Panel defaultSize={30} minSize={20}>
                <OutputPanel 
                  output={output} 
                  testCases={currentProblem?.examples}
                  selectedTestCase={selectedTestCase}
                  onSelectTestCase={setSelectedTestCase}
                  testCaseResults={testCaseResults}
                  expectedOutput={currentProblem?.expectedOutput?.[selectedLanguage]}
                />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default ProblemPage;
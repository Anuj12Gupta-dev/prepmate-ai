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

  const defaultProblemId = Object.keys(PROBLEMS)[0] || "two-sum";
  const initialProblemId = id && PROBLEMS[id] ? id : defaultProblemId;

  const [currentProblemId, setCurrentProblemId] = useState(initialProblemId);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(PROBLEMS[initialProblemId].starterCode.javascript);
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState(0);
  const [testCaseResults, setTestCaseResults] = useState({});
  const [success, setSuccess] = useState(false);

  const currentProblem = PROBLEMS[currentProblemId];

  useEffect(() => {
    if (id && PROBLEMS[id] && id !== currentProblemId) {
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedLanguage]);
      setOutput(null);
    }
  }, [id, currentProblemId, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(currentProblem.starterCode[lang]);
    setOutput(null);
  };

  const handleProblemChange = (pid) => navigate(`/problem/${pid}`);

  const triggerConfetti = useCallback(() => {
    confetti({ particleCount: 80, spread: 250, origin: { x: 0.2, y: 0.6 } });
    confetti({ particleCount: 80, spread: 250, origin: { x: 0.8, y: 0.6 } });
  }, []);

  const normalizeOutput = useCallback((out) => {
    if (typeof out !== "string") return "";
    return out.trim().replace(/\s+/g, "");
  }, []);

  const handleRunCode = async () => {
    if (!currentProblem) return;

    setIsRunning(true);
    setOutput(null);

    let completedCode = "";

    if (selectedLanguage !== "java") {
      completedCode =
        code + "\n" + (currentProblem.testCases?.[selectedLanguage] || "");
    } else {
      completedCode = `
import java.util.*;
public class Main {
${code}

${currentProblem.testCases?.java || ""}
}
`;
    }

    try {
      const result = await executeCode(selectedLanguage, completedCode);
      console.log(result)
      setOutput(result.output);
      setIsRunning(false);
      setSuccess(result.success);

      if (!result.success) {
        toast.error("Execution failed");
        return;
      }

      const expected = currentProblem.expectedOutput?.[selectedLanguage];
      if (!expected) return;

      const actualLines = result.output.trim().split("\n");
      const expectedLines = expected.trim().split("\n");

      const results = {};
      let allPassed = true;

      expectedLines.forEach((exp, i) => {
        const pass =
          normalizeOutput(actualLines[i]) === normalizeOutput(exp);
        results[i] = { passed: pass };
        if (!pass) allPassed = false;
      });

      setTestCaseResults(results);

      if (allPassed) {
        triggerConfetti();
        toast.success("All test cases passed!");
      } else {
        toast.error("Some test cases failed");
      }
    } catch (err) {
      toast.error("Runtime error");
      setIsRunning(false);
    }
  };

  return (
    <div className="h-screen bg-slate-950 flex flex-col text-white">
      <Navbar />

      <div className="flex-1 min-h-0 pt-15">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={40}>
            <ProblemDescription
              problem={currentProblem}
              currentProblemId={currentProblemId}
              onProblemChange={handleProblemChange}
              allProblems={Object.values(PROBLEMS)}
            />
          </Panel>

          <PanelResizeHandle className="w-2 bg-slate-800" />

          <Panel defaultSize={60}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={70}>
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                />
              </Panel>

              <PanelResizeHandle className="h-2 bg-slate-800" />

              <Panel defaultSize={30}>
                <OutputPanel
                  success={success}
                  output={output}
                  testCases={currentProblem?.examples}
                  selectedTestCase={selectedTestCase}
                  onSelectTestCase={setSelectedTestCase}
                  testCaseResults={testCaseResults}
                  expectedOutput={
                    currentProblem?.expectedOutput?.[selectedLanguage]
                  }
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

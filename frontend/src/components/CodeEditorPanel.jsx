import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problems";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) {
  return (
    // Main Editor Panel Container
    <div className="h-full bg-slate-00 flex flex-col rounded-t-xl border border-white/5">
      
      {/* HEADER / CONTROLS */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-white/5 rounded-t-xl flex-shrink-0">
        <div className="flex items-center gap-3">
          
          {/* Language Selector and Icon */}
          <img
            src={LANGUAGE_CONFIG[selectedLanguage].icon}
            alt={LANGUAGE_CONFIG[selectedLanguage].name}
            className="size-6 rounded-full"
          />
          <select 
            className="h-9 px-3 rounded-lg border border-white/10 bg-slate-700 text-white text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
            value={selectedLanguage} 
            onChange={onLanguageChange}
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
              <option key={key} value={key} className="bg-slate-700">
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Run Code Button */}
        <button 
          className="h-9 px-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm" 
          disabled={isRunning} 
          onClick={onRunCode}
        >
          {isRunning ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <PlayIcon className="size-4 fill-white" />
              Run Code
            </>
          )}
        </button>
      </div>

      {/* MONACO EDITOR AREA */}
      <div className="flex-1 min-h-0">
        <Editor
          height={"100%"}
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          onChange={onCodeChange}
          theme="vs-dark" // Standard dark theme for code editors
          options={{
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
            wordWrap: "on",
            tabSize: 2,
            quickSuggestions: true,
          }}
        />
      </div>
    </div>
  );
}
export default CodeEditorPanel;
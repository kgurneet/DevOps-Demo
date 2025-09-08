import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Copy, Download, Pause, Play, Terminal, FileText, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LogsPanelProps {
  isRunning: boolean;
  currentStage: number;
}

const stageLogs = [
  {
    stage: 0,
    logs: [
      "2024-01-15 14:23:01 [INFO] Webhook received from GitHub",
      "2024-01-15 14:23:01 [INFO] Repository: demo-app, Branch: main",
      "2024-01-15 14:23:01 [INFO] Commit SHA: 9fd1c2e7...",
      "2024-01-15 14:23:01 [INFO] Triggering CI/CD pipeline..."
    ]
  },
  {
    stage: 1,
    logs: [
      "2024-01-15 14:23:02 [INFO] Starting build and test stage",
      "2024-01-15 14:23:02 [INFO] Setting up Node.js 20.x environment",
      "2024-01-15 14:23:03 [INFO] Running npm ci...",
      "2024-01-15 14:23:05 [INFO] Dependencies installed successfully",
      "2024-01-15 14:23:05 [INFO] Running linter...",
      "2024-01-15 14:23:06 [SUCCESS] ESLint passed with 0 errors",
      "2024-01-15 14:23:06 [INFO] Running unit tests...",
      "2024-01-15 14:23:08 [SUCCESS] All 47 tests passed",
      "2024-01-15 14:23:08 [INFO] Coverage: 87.2% statements, 84.1% branches",
      "2024-01-15 14:23:08 [INFO] Building application...",
      "2024-01-15 14:23:10 [SUCCESS] Build completed successfully"
    ]
  },
  {
    stage: 2,
    logs: [
      "2024-01-15 14:23:11 [INFO] Starting containerization stage",
      "2024-01-15 14:23:11 [INFO] Building Docker image with tag: app:9fd1c2e",
      "2024-01-15 14:23:11 [INFO] Step 1/8: FROM node:20-alpine AS build",
      "2024-01-15 14:23:12 [INFO] Step 2/8: WORKDIR /app",
      "2024-01-15 14:23:12 [INFO] Step 3/8: COPY package*.json ./",
      "2024-01-15 14:23:13 [INFO] Step 4/8: RUN npm ci --omit=dev",
      "2024-01-15 14:23:15 [INFO] Step 5/8: COPY . .",
      "2024-01-15 14:23:16 [INFO] Step 6/8: RUN npm run build",
      "2024-01-15 14:23:17 [INFO] Step 7/8: FROM node:20-alpine",
      "2024-01-15 14:23:18 [INFO] Step 8/8: COPY --from=build /app/dist ./dist",
      "2024-01-15 14:23:19 [SUCCESS] Docker image built successfully",
      "2024-01-15 14:23:19 [INFO] Image size: 124MB (optimized)"
    ]
  }
];

const artifacts = [
  {
    name: "test-results.xml",
    size: "12.4 KB",
    type: "Test Report",
    description: "JUnit test results with 47 passed tests"
  },
  {
    name: "coverage-report.json",
    size: "8.7 KB", 
    type: "Coverage Report",
    description: "Code coverage metrics - 87.2% statements"
  },
  {
    name: "docker-image-manifest.json",
    size: "2.1 KB",
    type: "Container Manifest", 
    description: "Docker image metadata and layers"
  },
  {
    name: "sbom.json",
    size: "45.3 KB",
    type: "Software Bill of Materials",
    description: "Complete dependency inventory and vulnerabilities"
  },
  {
    name: "deployment-manifest.yaml",
    size: "1.8 KB",
    type: "K8s Manifest",
    description: "Kubernetes deployment configuration"
  },
  {
    name: "build-bundle.tar.gz", 
    size: "2.4 MB",
    type: "Build Artifact",
    description: "Compressed application bundle"
  }
];

export const LogsPanel = ({ isRunning, currentStage }: LogsPanelProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [logFilter, setLogFilter] = useState("all");
  const logsEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!isRunning || isPaused) return;

    const currentStageLogs = stageLogs.find(s => s.stage === currentStage)?.logs || [];
    
    let logIndex = 0;
    const timer = setInterval(() => {
      if (logIndex < currentStageLogs.length) {
        setDisplayedLogs(prev => [...prev, currentStageLogs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(timer);
      }
    }, 300);

    return () => clearInterval(timer);
  }, [currentStage, isRunning, isPaused]);

  useEffect(() => {
    if (!isRunning) {
      setDisplayedLogs([]);
    }
  }, [isRunning]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayedLogs]);

  const copyLogs = () => {
    const filteredLogs = getFilteredLogs();
    navigator.clipboard.writeText(filteredLogs.join('\n'));
    toast({
      title: "Logs copied",
      description: `${filteredLogs.length} log entries copied to clipboard`,
    });
  };

  const downloadArtifact = (artifactName: string) => {
    // Create a mock file download
    const mockContent = `// Mock artifact: ${artifactName}\n// Generated at: ${new Date().toISOString()}\n\n${JSON.stringify({
      artifact: artifactName,
      timestamp: new Date().toISOString(),
      pipeline_stage: currentStage,
      status: "completed"
    }, null, 2)}`;
    
    const blob = new Blob([mockContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = artifactName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: `${artifactName} has been downloaded`,
    });
  };

  const getFilteredLogs = () => {
    let filtered = displayedLogs;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply level filter
    if (logFilter !== "all") {
      filtered = filtered.filter(log => {
        switch (logFilter) {
          case "error":
            return log.includes('[ERROR]');
          case "warn":
            return log.includes('[WARN]');
          case "success":
            return log.includes('[SUCCESS]');
          case "info":
            return log.includes('[INFO]');
          default:
            return true;
        }
      });
    }
    
    return filtered;
  };

  const getLogLevel = (log: string) => {
    if (log.includes('[ERROR]')) return 'text-red-600';
    if (log.includes('[WARN]')) return 'text-yellow-600';
    if (log.includes('[SUCCESS]')) return 'text-emerald-600';
    return 'text-slate-300';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Real-Time Logs & Artifacts</h2>
        <p className="text-xl text-slate-600">
          Monitor pipeline execution with streaming logs and access generated artifacts
        </p>
      </div>

      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-slate-900 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-3">
              <Terminal className="w-6 h-6" />
              <span>Pipeline Execution Console</span>
            </CardTitle>
            
            <div className="flex items-center space-x-3">
              <Badge 
                variant="secondary" 
                className={isRunning ? "bg-emerald-600 text-white" : "bg-slate-600 text-white"}
              >
                {isRunning ? "Running" : "Idle"}
              </Badge>
              
              {isRunning && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPaused(!isPaused)}
                  className="text-white hover:bg-slate-700"
                >
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={copyLogs}
                disabled={displayedLogs.length === 0}
                className="text-white hover:bg-slate-700"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs defaultValue="logs" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
              <TabsTrigger value="logs" className="flex items-center space-x-2">
                <Terminal className="w-4 h-4" />
                <span>Logs</span>
              </TabsTrigger>
              <TabsTrigger value="artifacts" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Artifacts</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="logs" className="m-0">
              <div className="p-4 border-b bg-slate-50">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search logs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select
                    value={logFilter}
                    onChange={(e) => setLogFilter(e.target.value)}
                    className="px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
                  >
                    <option value="all">All Levels</option>
                    <option value="error">Errors</option>
                    <option value="warn">Warnings</option>
                    <option value="success">Success</option>
                    <option value="info">Info</option>
                  </select>
                </div>
              </div>
              <div className="bg-slate-900 text-slate-100 h-80 overflow-y-auto p-6 font-mono text-sm">
                {displayedLogs.length === 0 && !isRunning && (
                  <div className="text-slate-500 text-center mt-20">
                    Pipeline logs will appear here when running...
                  </div>
                )}
                
                {getFilteredLogs().map((log, index) => (
                  <div key={index} className={`mb-1 ${getLogLevel(log)} hover:bg-slate-800 px-2 py-1 rounded transition-colors`}>
                    {log}
                  </div>
                ))}
                
                {getFilteredLogs().length === 0 && displayedLogs.length > 0 && (
                  <div className="text-slate-500 text-center mt-20">
                    No logs match your current filters
                  </div>
                )}
                
                {isRunning && displayedLogs.length > 0 && (
                  <div className="text-emerald-400 animate-pulse">
                    █
                  </div>
                )}
                
                <div ref={logsEndRef} />
              </div>
            </TabsContent>
            
            <TabsContent value="artifacts" className="m-0">
              <div className="p-6 h-96 overflow-y-auto">
                <div className="grid gap-4">
                  {artifacts.map((artifact, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <FileText className="w-5 h-5 text-indigo-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-slate-900">{artifact.name}</div>
                          <div className="text-sm text-slate-600 mb-1">{artifact.description}</div>
                          <div className="flex items-center space-x-4 text-xs">
                            <Badge variant="outline">{artifact.type}</Badge>
                            <span className="text-slate-500">{artifact.size}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadArtifact(artifact.name)}
                        className="flex items-center space-x-1"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </Button>
                    </div>
                  ))}
                </div>
                
                {!isRunning && (
                  <div className="text-slate-500 text-center mt-12 text-sm">
                    Artifacts will be generated during pipeline execution
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
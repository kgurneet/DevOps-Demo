import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play, GitBranch, Clock, Hash } from "lucide-react";

interface PipelineDemoProps {
  onRunPipeline: () => void;
  isRunning: boolean;
}

export const PipelineDemo = ({ onRunPipeline, isRunning }: PipelineDemoProps) => {
  const [branch, setBranch] = useState("main");
  const [environment, setEnvironment] = useState("staging");
  const [commitMessage, setCommitMessage] = useState("feat: add health check endpoint");

  const handleRunPipeline = () => {
    if (!isRunning) {
      onRunPipeline();
    }
  };

  const buildNumber = Math.floor(Math.random() * 1000) + 2000;
  const commitHash = "9fd1c2e";

  return (
    <div className="space-y-8">
      {/* Control Panel */}
      <Card className="border-0 shadow-xl bg-white">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-3 text-xl">
            <GitBranch className="w-6 h-6" />
            <span>Pipeline Control Center</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="space-y-2">
              <Label htmlFor="branch" className="text-sm font-medium text-slate-700">
                Branch
              </Label>
              <Select value={branch} onValueChange={setBranch} disabled={isRunning}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">main</SelectItem>
                  <SelectItem value="dev">dev</SelectItem>
                  <SelectItem value="staging">staging</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="environment" className="text-sm font-medium text-slate-700">
                Environment
              </Label>
              <Select value={environment} onValueChange={setEnvironment} disabled={isRunning}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="staging">staging</SelectItem>
                  <SelectItem value="production">production</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="commit" className="text-sm font-medium text-slate-700">
                Commit Message
              </Label>
              <Input
                id="commit"
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                disabled={isRunning}
                placeholder="Enter commit message..."
                className="font-mono text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleRunPipeline}
                disabled={isRunning}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                {isRunning ? "Pipeline Running..." : "Trigger Pipeline"}
              </Button>
              
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Hash className="w-4 h-4" />
                <span>Build #{buildNumber}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge 
                variant={isRunning ? "default" : "secondary"}
                className={isRunning ? "bg-status-running text-white animate-pulse-gentle" : "bg-status-idle text-white"}
              >
                {isRunning ? "Running" : "Idle"}
              </Badge>
              
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Clock className="w-4 h-4" />
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-lg border-l-4 border-indigo-500">
            <p className="text-sm text-slate-700">
              <strong>Note:</strong> This simulation mocks real pipeline steps. No cloud resources are modified.
              The demo showcases GitHub webhook triggers, containerized builds, and AWS deployment patterns.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Info Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Repository</h3>
              <GitBranch className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Branch:</span>
                <Badge variant="outline" className="text-xs">{branch}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Commit:</span>
                <span className="font-mono text-slate-800">{commitHash}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Target</h3>
              <div className="w-5 h-5 rounded-full bg-emerald-500"></div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Environment:</span>
                <Badge variant="outline" className="text-xs">{environment}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Service:</span>
                <span className="text-slate-800">webapp-service</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Status</h3>
              <div className={`w-5 h-5 rounded-full ${isRunning ? 'bg-status-running animate-scale-pulse' : 'bg-status-idle'}`}></div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Build:</span>
                <span className="text-slate-800">#{buildNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Duration:</span>
                <span className="text-slate-800">{isRunning ? "Running..." : "--"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
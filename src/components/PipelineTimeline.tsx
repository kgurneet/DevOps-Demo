import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GitBranch, 
  Hammer, 
  Container, 
  Upload, 
  Cloud, 
  CheckCircle2,
  Clock,
  Play,
  AlertCircle
} from "lucide-react";

interface PipelineTimelineProps {
  isRunning: boolean;
  currentStage: number;
  onStageComplete: (stage: number) => void;
}

const stages = [
  {
    id: 0,
    name: "Webhook Received",
    description: "GitHub push detected",
    icon: GitBranch,
    duration: "0.2s",
    details: "Push to `main` detected. SHA: 9fd1c2e",
    artifacts: ["Commit metadata", "Branch validation"]
  },
  {
    id: 1,
    name: "Build & Test",
    description: "Installing deps & running tests",
    icon: Hammer,
    duration: "2.1s",
    details: "npm ci && npm test -- --ci --reporters=default",
    artifacts: ["Test reports", "Coverage: 87%", "Bundle analysis"]
  },
  {
    id: 2,
    name: "Containerize",
    description: "Building Docker image",
    icon: Container,
    duration: "1.8s",
    details: "Multi-stage build, image tag: app:9fd1c2e",
    artifacts: ["Docker image", "SBOM", "Vulnerability scan"]
  },
  {
    id: 3,
    name: "Push Image",
    description: "Publishing to ECR",
    icon: Upload,
    duration: "1.2s",
    details: "Pushed to ECR with digest sha256:abc123...",
    artifacts: ["Image digest", "Registry metadata"]
  },
  {
    id: 4,
    name: "Deploy to AWS",
    description: "Updating ECS service",
    icon: Cloud,
    duration: "3.5s",
    details: "Rolling update with health checks",
    artifacts: ["Task definition", "Service events", "ALB targets"]
  },
  {
    id: 5,
    name: "Post-Deploy Verify",
    description: "Running smoke tests",
    icon: CheckCircle2,
    duration: "1.1s",
    details: "Health checks passed, traffic shifted",
    artifacts: ["Health check results", "Performance metrics"]
  }
];

export const PipelineTimeline = ({ isRunning, currentStage, onStageComplete }: PipelineTimelineProps) => {
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const [stageStatuses, setStageStatuses] = useState<Record<number, 'idle' | 'running' | 'success' | 'failed'>>({});

  useEffect(() => {
    if (!isRunning) {
      setStageStatuses({});
      return;
    }

    if (currentStage < stages.length) {
      setStageStatuses(prev => ({
        ...prev,
        [currentStage]: 'running'
      }));

      // Simulate stage completion
      const timer = setTimeout(() => {
        setStageStatuses(prev => ({
          ...prev,
          [currentStage]: 'success'
        }));
        onStageComplete(currentStage);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentStage, isRunning, onStageComplete]);

  const getStageStatus = (stageId: number) => {
    if (!isRunning) return 'idle';
    return stageStatuses[stageId] || (stageId < currentStage ? 'success' : 'idle');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-status-running text-white animate-pulse-gentle';
      case 'success': return 'bg-status-success text-white';
      case 'failed': return 'bg-status-failed text-white';
      default: return 'bg-status-idle text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Clock className="w-4 h-4 animate-spin" />;
      case 'success': return <CheckCircle2 className="w-4 h-4" />;
      case 'failed': return <AlertCircle className="w-4 h-4" />;
      default: return <Play className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Pipeline Execution Timeline</h2>
        <p className="text-xl text-slate-600">
          Watch each stage of the CI/CD pipeline as it executes in real-time
        </p>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-slate-700">Pipeline Progress</span>
          <span className="text-sm text-slate-600">
            {isRunning ? `${currentStage + 1} of ${stages.length}` : 'Ready to run'}
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-indigo-600 to-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: isRunning ? `${((currentStage + 1) / stages.length) * 100}%` : '0%' 
            }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {stages.map((stage, index) => {
          const status = getStageStatus(stage.id);
          const Icon = stage.icon;
          const isExpanded = expandedStage === stage.id;
          const isActive = status === 'running';

          return (
            <Card 
              key={stage.id} 
              className={`border-0 shadow-lg transition-all duration-300 hover:shadow-xl ${
                isActive ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${getStatusColor(status)}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">{stage.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {stage.duration}
                        </Badge>
                        {getStatusIcon(status)}
                      </div>
                      <p className="text-slate-600 mb-3">{stage.description}</p>
                      
                      {status !== 'idle' && (
                        <div className="bg-slate-50 rounded-lg p-3 mb-3 border-l-4 border-indigo-500">
                          <p className="text-sm text-slate-700 font-mono">{stage.details}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedStage(isExpanded ? null : stage.id)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    {isExpanded ? 'Collapse' : 'Expand'}
                  </Button>
                </div>

                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-slate-100 animate-slide-up">
                    <h4 className="font-semibold text-slate-900 mb-3">Stage Artifacts</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {stage.artifacts.map((artifact, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center space-x-2 text-sm text-slate-600 bg-white rounded-lg p-3 border"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>{artifact}</span>
                        </div>
                      ))}
                    </div>

                    {/* Sample YAML for Build stage */}
                    {stage.id === 1 && (
                      <div className="mt-4">
                        <h5 className="font-medium text-slate-900 mb-2">GitHub Actions YAML</h5>
                        <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm">
{`- name: Build and Test
  run: |
    npm ci
    npm run lint
    npm test -- --ci --coverage
    npm run build`}
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Sample Dockerfile for Container stage */}
                    {stage.id === 2 && (
                      <div className="mt-4">
                        <h5 className="font-medium text-slate-900 mb-2">Dockerfile</h5>
                        <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm">
{`FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs
CMD ["node", "dist/server.js"]`}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
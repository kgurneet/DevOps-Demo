import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, ChevronDown, ChevronUp, Play, Zap } from "lucide-react";
import { 
  GitBranch, 
  Hammer, 
  Container, 
  Upload, 
  Cloud, 
  CheckCircle2 
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "GitHub Trigger",
    description: "Pushing to main or merging PR triggers the workflow. Branch protection and required checks enforced.",
    icon: GitBranch,
    color: "bg-indigo-100 text-indigo-600",
    code: `on:
  push:
    branches: ["main"]
  pull_request:
    branches: ["main"]`,
    language: "yaml"
  },
  {
    id: 2,
    title: "Build & Test",
    description: "CI installs dependencies, runs unit tests and linters, generates coverage reports.",
    icon: Hammer,
    color: "bg-emerald-100 text-emerald-600",
    code: `- name: Build and Test
  run: |
    npm ci
    npm run lint
    npm test -- --ci --coverage
    npm run build`,
    language: "yaml"
  },
  {
    id: 3,
    title: "Containerize",
    description: "Multi-stage Dockerfile trims image size and copies only production artifacts.",
    icon: Container,
    color: "bg-orange-100 text-orange-600",
    code: `FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm run build

FROM node:20-alpine
COPY --from=build /app/dist ./dist
CMD ["node", "dist/server.js"]`,
    language: "dockerfile"
  },
  {
    id: 4,
    title: "Publish",
    description: "Image is tagged with commit SHA and pushed to Amazon ECR.",
    icon: Upload,
    color: "bg-purple-100 text-purple-600",
    code: `- name: Push to ECR
  run: |
    aws ecr get-login-password | \\
    docker login --username AWS \\
    --password-stdin $ECR_REGISTRY
    
    docker tag app:$GITHUB_SHA \\
    $ECR_REGISTRY/app:$GITHUB_SHA
    
    docker push $ECR_REGISTRY/app:$GITHUB_SHA`,
    language: "bash"
  },
  {
    id: 5,
    title: "Deploy",
    description: "A job updates the ECS service with health checks and zero-downtime strategy (rolling/blue-green).",
    icon: Cloud,
    color: "bg-blue-100 text-blue-600",
    code: `{
  "family": "webapp-service",
  "containerDefinitions": [{
    "name": "web",
    "image": "$ECR_REGISTRY/app:$COMMIT_SHA",
    "portMappings": [{"containerPort": 3000}],
    "healthCheck": {
      "command": ["CMD", "curl", "-f", "http://localhost:3000/health"]
    }
  }]
}`,
    language: "json"
  },
  {
    id: 6,
    title: "Verify",
    description: "Smoke tests hit /health and key endpoints. If fail, automated rollback is triggered.",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-600",
    code: `- name: Smoke Tests
  run: |
    curl -f $DEPLOY_URL/health
    curl -f $DEPLOY_URL/api/status
    
    # Run integration tests
    npm run test:integration`,
    language: "bash"
  }
];

export const HowItWorks = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [animatingSteps, setAnimatingSteps] = useState<Set<number>>(new Set());

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const handleStepClick = (stepId: number) => {
    setSelectedStep(selectedStep === stepId ? null : stepId);
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const simulateStep = (stepId: number) => {
    setAnimatingSteps(prev => new Set([...prev, stepId]));
    setTimeout(() => {
      setAnimatingSteps(prev => {
        const newSet = new Set(prev);
        newSet.delete(stepId);
        return newSet;
      });
    }, 2000);
  };

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Step-by-step breakdown of the CI/CD pipeline from code commit to production deployment
        </p>
      </div>

      <div className="space-y-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          
          return (
            <Card 
              key={step.id} 
              className={`border-0 shadow-lg transition-all duration-300 cursor-pointer group ${
                selectedStep === step.id 
                  ? 'ring-2 ring-indigo-500 shadow-xl scale-[1.02]' 
                  : 'hover:shadow-xl hover:scale-[1.01]'
              } ${
                animatingSteps.has(step.id) 
                  ? 'bg-gradient-to-r from-indigo-50 to-emerald-50 animate-pulse' 
                  : ''
              }`}
              onClick={() => handleStepClick(step.id)}
            >
              <CardContent className={`p-8 transition-all duration-300 ${
                selectedStep === step.id ? 'bg-gradient-to-br from-slate-50/50 to-indigo-50/30' : ''
              } hover:bg-gradient-to-br hover:from-slate-50/30 hover:to-indigo-50/20`}>
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  {/* Left: Description */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${step.color} flex-shrink-0 transition-all duration-300 ${
                          selectedStep === step.id ? 'scale-110 shadow-lg' : 'group-hover:scale-105'
                        } ${animatingSteps.has(step.id) ? 'animate-bounce' : ''}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {step.id}. {step.title}
                            </h3>
                            {selectedStep === step.id && (
                              <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                                Selected
                              </Badge>
                            )}
                          </div>
                          <p className="text-slate-600 text-lg leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            simulateStep(step.id);
                          }}
                          className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                        <div className="text-slate-400">
                          {expandedStep === step.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                      </div>
                    </div>

                    {/* Interactive step details that expand on selection */}
                    {selectedStep === step.id && (
                      <div className="animate-slide-up border-t border-slate-200 pt-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <Zap className="w-4 h-4 text-indigo-600" />
                          <span className="text-sm font-medium text-slate-700">Step Details</span>
                        </div>
                        
                        {step.id === 1 && (
                          <div className="space-y-2 text-sm text-slate-600">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                              <span>Webhook validates commit signature and branch policies</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                              <span>Required status checks must pass before merge</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                              <span>Pipeline triggered automatically on push events</span>
                            </div>
                          </div>
                        )}
                        
                        {step.id === 3 && (
                          <div className="space-y-2 text-sm text-slate-600">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              <span>Multi-stage build reduces final image size by 60%</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              <span>Security scanning integrated at build time</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              <span>Non-root user for enhanced container security</span>
                            </div>
                          </div>
                        )}

                        {step.id === 6 && (
                          <div className="space-y-2 text-sm text-slate-600">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span>Automated rollback on health check failures</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span>Integration tests validate API endpoints</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span>Performance metrics collected and monitored</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Additional details for specific steps */}
                    {step.id === 2 && (
                      <div className="ml-16 space-y-3">
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>Dependency installation with npm ci</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>ESLint and Prettier code quality checks</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>Jest unit tests with coverage reporting</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>Production build optimization</span>
                        </div>
                      </div>
                    )}

                    {step.id === 5 && (
                      <div className="ml-16 space-y-3">
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-blue-500" />
                          <span>Rolling deployment with zero downtime</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-blue-500" />
                          <span>Application Load Balancer target registration</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-blue-500" />
                          <span>Health check validation before traffic routing</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-blue-500" />
                          <span>Auto-scaling group configuration update</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Code Example */}
                  <div>
                    <div className="bg-slate-900 text-slate-100 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-slate-800">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                        <div className="text-xs text-slate-400 uppercase tracking-wide">
                          {step.language}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyCode(step.code)}
                          className="text-slate-400 hover:text-white p-1"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="p-4 overflow-x-auto">
                        <pre className="text-sm leading-relaxed">
                          <code>{step.code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-slate-900">
            Complete Pipeline Benefits
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">2.4hr</div>
              <div className="text-slate-700 font-medium">Lead Time</div>
              <div className="text-sm text-slate-600">From commit to production</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">99.9%</div>
              <div className="text-slate-700 font-medium">Uptime</div>
              <div className="text-sm text-slate-600">With automated rollbacks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">12</div>
              <div className="text-slate-700 font-medium">Deploys/Week</div>
              <div className="text-sm text-slate-600">Safe, frequent releases</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">87%</div>
              <div className="text-slate-700 font-medium">Test Coverage</div>
              <div className="text-sm text-slate-600">Automated quality gates</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
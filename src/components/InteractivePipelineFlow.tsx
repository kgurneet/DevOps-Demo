import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GitBranch, 
  Server, 
  Container, 
  Cloud, 
  CheckCircle2,
  ArrowRight,
  Play,
  RotateCcw,
  Activity
} from "lucide-react";

interface Node {
  id: string;
  label: string;
  icon: any;
  x: number;
  y: number;
  status: 'idle' | 'active' | 'success' | 'processing';
  description: string;
}

interface Connection {
  from: string;
  to: string;
  animated: boolean;
  status: 'idle' | 'active' | 'success';
}

const initialNodes: Node[] = [
  { id: 'github', label: 'GitHub', icon: GitBranch, x: 50, y: 200, status: 'idle', description: 'Source repository' },
  { id: 'webhook', label: 'Webhook', icon: Activity, x: 200, y: 200, status: 'idle', description: 'Trigger event' },
  { id: 'ci', label: 'CI Server', icon: Server, x: 350, y: 150, status: 'idle', description: 'Build & test' },
  { id: 'docker', label: 'Docker', icon: Container, x: 350, y: 250, status: 'idle', description: 'Containerize' },
  { id: 'registry', label: 'ECR', icon: Server, x: 500, y: 200, status: 'idle', description: 'Image registry' },
  { id: 'aws', label: 'AWS ECS', icon: Cloud, x: 650, y: 200, status: 'idle', description: 'Production deployment' },
];

const connections: Connection[] = [
  { from: 'github', to: 'webhook', animated: false, status: 'idle' },
  { from: 'webhook', to: 'ci', animated: false, status: 'idle' },
  { from: 'webhook', to: 'docker', animated: false, status: 'idle' },
  { from: 'ci', to: 'registry', animated: false, status: 'idle' },
  { from: 'docker', to: 'registry', animated: false, status: 'idle' },
  { from: 'registry', to: 'aws', animated: false, status: 'idle' },
];

export const InteractivePipelineFlow = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [flowConnections, setFlowConnections] = useState<Connection[]>(connections);
  const [isFlowRunning, setIsFlowRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const flowSequence = [
    { nodeId: 'github', connectionIndex: 0 },
    { nodeId: 'webhook', connectionIndex: 1 },
    { nodeId: 'ci', connectionIndex: 2 },
    { nodeId: 'docker', connectionIndex: 3 },
    { nodeId: 'registry', connectionIndex: 4 },
    { nodeId: 'aws', connectionIndex: -1 },
  ];

  useEffect(() => {
    if (!isFlowRunning) return;

    const timer = setInterval(() => {
      if (currentStep < flowSequence.length) {
        const step = flowSequence[currentStep];
        
        // Update node status
        setNodes(prev => prev.map(node => 
          node.id === step.nodeId 
            ? { ...node, status: 'active' }
            : node.status === 'active' 
            ? { ...node, status: 'success' }
            : node
        ));

        // Update connection animation
        if (step.connectionIndex >= 0) {
          setFlowConnections(prev => prev.map((conn, index) => 
            index === step.connectionIndex 
              ? { ...conn, animated: true, status: 'active' }
              : conn
          ));
        }

        setCurrentStep(prev => prev + 1);
      } else {
        // Complete the flow
        setNodes(prev => prev.map(node => ({ ...node, status: 'success' })));
        setFlowConnections(prev => prev.map(conn => ({ ...conn, status: 'success' })));
        setIsFlowRunning(false);
        setCurrentStep(0);
      }
    }, 1500);

    return () => clearInterval(timer);
  }, [currentStep, isFlowRunning]);

  const startFlow = () => {
    resetFlow();
    setIsFlowRunning(true);
  };

  const resetFlow = () => {
    setNodes(initialNodes);
    setFlowConnections(connections);
    setCurrentStep(0);
    setIsFlowRunning(false);
  };

  const getNodeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-status-running text-white border-status-running shadow-lg scale-110';
      case 'success': return 'bg-status-success text-white border-status-success';
      case 'processing': return 'bg-indigo-500 text-white border-indigo-500 animate-pulse';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getConnectionColor = (status: string) => {
    switch (status) {
      case 'active': return 'stroke-status-running';
      case 'success': return 'stroke-status-success';
      default: return 'stroke-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Interactive Pipeline Flow</h2>
        <p className="text-xl text-slate-600 mb-6">
          Watch data flow through your CI/CD pipeline in real-time
        </p>
        
        <div className="flex items-center justify-center space-x-4">
          <Button
            onClick={startFlow}
            disabled={isFlowRunning}
            className="flex items-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>Start Flow</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={resetFlow}
            disabled={isFlowRunning}
            className="flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </Button>
          
          <Badge variant={isFlowRunning ? "default" : "secondary"}>
            {isFlowRunning ? "Running" : "Ready"}
          </Badge>
        </div>
      </div>

      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-indigo-600" />
            <span>Pipeline Network Diagram</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-96 bg-gradient-to-br from-slate-50 to-indigo-50 rounded-lg overflow-hidden">
            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
              {flowConnections.map((connection, index) => {
                const fromNode = nodes.find(n => n.id === connection.from);
                const toNode = nodes.find(n => n.id === connection.to);
                
                if (!fromNode || !toNode) return null;
                
                return (
                  <g key={index}>
                    <line
                      x1={fromNode.x + 40}
                      y1={fromNode.y + 20}
                      x2={toNode.x}
                      y2={toNode.y + 20}
                      className={`${getConnectionColor(connection.status)} transition-all duration-500`}
                      strokeWidth="3"
                      strokeDasharray={connection.animated ? "10,5" : "none"}
                    >
                      {connection.animated && (
                        <animate
                          attributeName="stroke-dashoffset"
                          values="0;-15"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      )}
                    </line>
                    
                    {/* Arrow */}
                    <polygon
                      points={`${toNode.x - 8},${toNode.y + 15} ${toNode.x - 8},${toNode.y + 25} ${toNode.x},${toNode.y + 20}`}
                      className={`${getConnectionColor(connection.status)} transition-all duration-500`}
                      fill="currentColor"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Nodes */}
            {nodes.map((node, index) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.id}
                  className={`absolute transition-all duration-500 ${getNodeColor(node.status)}`}
                  style={{ 
                    left: `${node.x}px`, 
                    top: `${node.y}px`,
                    zIndex: 2
                  }}
                >
                  <div className="flex flex-col items-center p-4 rounded-lg border-2 bg-inherit min-w-20">
                    <Icon className="w-6 h-6 mb-2" />
                    <span className="text-xs font-medium text-center">{node.label}</span>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                    {node.description}
                  </div>
                </div>
              );
            })}

            {/* Data flow indicators */}
            {isFlowRunning && (
              <div className="absolute top-4 right-4 flex items-center space-x-2 bg-white/90 rounded-lg px-3 py-2">
                <div className="w-2 h-2 bg-status-running rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-700">Data flowing...</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Flow Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600 mb-1">6</div>
            <div className="text-sm text-slate-600">Pipeline Stages</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600 mb-1">~9s</div>
            <div className="text-sm text-slate-600">Total Flow Time</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">3</div>
            <div className="text-sm text-slate-600">Parallel Processes</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">100%</div>
            <div className="text-sm text-slate-600">Automation Level</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PipelineDemo } from "@/components/PipelineDemo";
import { PipelineTimeline } from "@/components/PipelineTimeline";
import { MetricsDashboard } from "@/components/MetricsDashboard";
import { LogsPanel } from "@/components/LogsPanel";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { InteractivePipelineFlow } from "@/components/InteractivePipelineFlow";
import { GitBranch, Container, Cloud, Shield, ChevronDown } from "lucide-react";

const Index = () => {
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-background to-emerald-50 opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              CI/CD Pipeline Demo
              <span className="block text-indigo-600">From Commit to AWS in Minutes</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-800 mb-12 max-w-4xl mx-auto leading-relaxed">
              Automated builds with GitHub triggers, containerized deployments, and production-grade DevOps practices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg" 
                className="text-xl px-12 py-6 bg-gradient-to-r from-indigo-800 to-indigo-900 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 animate-pulse-gentle border-2 border-indigo-400/20 hover:border-indigo-300/40"
                onClick={() => scrollToSection('demo')}
              >
                <span className="drop-shadow-lg font-bold">Run a Demo Pipeline</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-xl px-12 py-6 bg-gradient-to-r from-indigo-800 to-indigo-900 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 animate-pulse-gentle border-2 border-indigo-400/20 hover:border-indigo-300/40"
                onClick={() => scrollToSection('architecture')}
              >
                See Architecture
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600">
                <CardContent className="p-8 text-center text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/40 to-emerald-900/40 animate-pulse-gentle"></div>
                  <div className="relative z-10">
                    <div className="text-4xl font-bold mb-3 drop-shadow-lg">5×</div>
                    <div className="text-emerald-50 font-medium text-lg drop-shadow-md">Deployment Frequency</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-600 to-indigo-700">
                <CardContent className="p-8 text-center text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-800/50 to-indigo-950/50 animate-pulse-gentle"></div>
                  <div className="relative z-10">
                    <div className="text-4xl font-bold mb-3 drop-shadow-lg">60%</div>
                    <div className="text-indigo-50 font-medium text-lg drop-shadow-md">Faster Lead Time</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-700 to-slate-800">
                <CardContent className="p-6 text-center text-white">
                  <div className="text-3xl font-bold mb-2">40%</div>
                  <div className="text-slate-200">Lower Change Failure Rate</div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown 
              className="w-8 h-8 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors duration-200" 
              onClick={() => scrollToSection('demo')}
            />
          </div>
        </div>
      </section>

      {/* Demo Controls Section */}
      <section id="demo" className="py-20 bg-gradient-to-br from-accent/20 to-indigo-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Interactive Pipeline Demo</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Trigger a complete CI/CD pipeline and watch it execute in real-time. 
              This simulation showcases the entire flow from code commit to production deployment.
            </p>
          </div>
          
          <PipelineDemo 
            onRunPipeline={() => {
              setPipelineRunning(true);
              setCurrentStage(0);
            }}
            isRunning={pipelineRunning}
          />
        </div>
      </section>

      {/* Pipeline Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PipelineTimeline 
            isRunning={pipelineRunning}
            currentStage={currentStage}
            onStageComplete={(stage) => {
              if (stage < 5) {
                setTimeout(() => setCurrentStage(stage + 1), 2000);
              } else {
                setTimeout(() => setPipelineRunning(false), 1000);
              }
            }}
          />
        </div>
      </section>

      {/* Interactive Pipeline Flow */}
      <section className="py-20 bg-gradient-to-br from-indigo-50/60 to-emerald-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractivePipelineFlow />
        </div>
      </section>

      {/* Logs Panel */}
      <section className="py-20 bg-gradient-to-br from-slate-50/50 to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LogsPanel isRunning={pipelineRunning} currentStage={currentStage} />
        </div>
      </section>

      {/* Metrics Dashboard */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MetricsDashboard />
        </div>
      </section>

      {/* Architecture */}
      <section id="architecture" className="py-20 bg-gradient-to-br from-primary/10 to-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ArchitectureDiagram />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HowItWorks />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-br from-indigo-50/40 to-emerald-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQ />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <GitBranch className="w-8 h-8 text-emerald-500" />
                <span className="text-xl font-bold">CI/CD Demo</span>
              </div>
              <p className="text-slate-300 mb-4">
                Push code. Ship containers. Sleep better.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Technologies</h3>
              <div className="space-y-2 text-slate-300">
                <div className="flex items-center space-x-2">
                  <GitBranch className="w-4 h-4" />
                  <span>GitHub Actions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Container className="w-4 h-4" />
                  <span>Docker</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Cloud className="w-4 h-4" />
                  <span>AWS ECS/EKS</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Security Scanning</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">DevOps Outcomes</h3>
              <ul className="text-slate-300 space-y-2">
                <li>Deploy 12× a week without losing sleep</li>
                <li>Cut lead time from days to hours</li>
                <li>Automated rollbacks keep uptime high</li>
                <li>Security built into every step</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
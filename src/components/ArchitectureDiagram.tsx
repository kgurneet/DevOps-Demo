import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GitBranch, 
  Container, 
  Cloud, 
  Shield, 
  Eye, 
  ArrowRight,
  Server,
  Database,
  Lock
} from "lucide-react";

export const ArchitectureDiagram = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">System Architecture</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Complete CI/CD pipeline architecture from development to production deployment
        </p>
      </div>

      {/* Architecture Flow */}
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
          {/* Developer */}
          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GitBranch className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Developer</h3>
              <p className="text-sm text-slate-600">Commit & Push</p>
              <Badge variant="outline" className="mt-2">GitHub</Badge>
            </CardContent>
          </Card>

          <div className="flex justify-center lg:justify-start">
            <ArrowRight className="w-6 h-6 text-slate-400 hidden lg:block" />
          </div>

          {/* CI Runner */}
          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Container className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">CI Pipeline</h3>
              <p className="text-sm text-slate-600">Build & Test</p>
              <Badge variant="outline" className="mt-2">GitHub Actions</Badge>
            </CardContent>
          </Card>

          <div className="flex justify-center lg:justify-start">
            <ArrowRight className="w-6 h-6 text-slate-400 hidden lg:block" />
          </div>

          {/* AWS Deployment */}
          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cloud className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">AWS Deploy</h3>
              <p className="text-sm text-slate-600">ECS/EKS</p>
              <Badge variant="outline" className="mt-2">Production</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Connection Lines for Desktop */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-200 via-emerald-200 to-orange-200 -z-10"></div>
      </div>

      {/* Detailed Components */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: GitHub & Triggers */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-slate-900 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <GitBranch className="w-5 h-5" />
              <span>Source Control</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-sm">Push to main/dev branches</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-sm">Pull request webhooks</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-sm">Branch protection rules</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-sm">Required status checks</span>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <h4 className="font-medium text-slate-900 mb-2">Security</h4>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-indigo-600" />
                <span className="text-sm text-slate-600">Signed commits, CODEOWNERS</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Center: CI/CD Pipeline */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-green-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Container className="w-5 h-5" />
              <span>CI/CD Pipeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Build & Test</span>
                <Badge variant="outline" className="text-xs">2.1s</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Security Scan</span>
                <Badge variant="outline" className="text-xs">0.8s</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Containerize</span>
                <Badge variant="outline" className="text-xs">1.8s</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Push to ECR</span>
                <Badge variant="outline" className="text-xs">1.2s</Badge>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <h4 className="font-medium text-slate-900 mb-2">Artifacts</h4>
              <div className="text-sm text-slate-600 space-y-1">
                <div>• Docker images</div>
                <div>• Test reports</div>
                <div>• SBOM & vulnerability scans</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right: AWS Infrastructure */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-orange-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Cloud className="w-5 h-5" />
              <span>AWS Infrastructure</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Server className="w-4 h-4 text-orange-600" />
                <span className="text-sm">ECS Fargate / EKS</span>
              </div>
              <div className="flex items-center space-x-3">
                <Database className="w-4 h-4 text-orange-600" />
                <span className="text-sm">ECR Image Registry</span>
              </div>
              <div className="flex items-center space-x-3">
                <Eye className="w-4 h-4 text-orange-600" />
                <span className="text-sm">CloudWatch Logs</span>
              </div>
              <div className="flex items-center space-x-3">
                <Lock className="w-4 h-4 text-orange-600" />
                <span className="text-sm">Secrets Manager</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <h4 className="font-medium text-slate-900 mb-2">Deployment</h4>
              <div className="text-sm text-slate-600 space-y-1">
                <div>• Rolling updates</div>
                <div>• Health checks</div>
                <div>• Auto-rollback</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <Card className="border-0 shadow-lg bg-slate-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-slate-900 mb-4 text-center">Architecture Legend</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Flow Types</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-0.5 bg-slate-800"></div>
                  <span className="text-slate-600">Triggers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-0.5 border-t-2 border-dashed border-slate-600"></div>
                  <span className="text-slate-600">Artifacts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-0.5 border-t-2 border-dotted border-slate-600"></div>
                  <span className="text-slate-600">Observability</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Security Checkpoints</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span className="text-slate-600">Code analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-indigo-600" />
                  <span className="text-slate-600">Image scanning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-orange-600" />
                  <span className="text-slate-600">Runtime protection</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Key Features</h4>
              <div className="space-y-2">
                <div className="text-slate-600">• Immutable deployments</div>
                <div className="text-slate-600">• Infrastructure as Code</div>
                <div className="text-slate-600">• Zero-downtime updates</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
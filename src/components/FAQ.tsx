import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Container, Cloud, Shield, Zap, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Does the demo hit real cloud resources?",
    answer: "No, this is a complete simulation with realistic artifacts and logs. The demo showcases the exact patterns and workflows used in production environments without incurring cloud costs or modifying actual infrastructure.",
    icon: Cloud,
    category: "Demo"
  },
  {
    question: "Can I switch deployment targets?",
    answer: "Yes, the architecture supports multiple deployment targets. You can toggle between ECS Fargate and EKS views in the interface. The underlying code is modular and supports various AWS services including Elastic Beanstalk and EC2 with CodeDeploy.",
    icon: Container,
    category: "Architecture"
  },
  {
    question: "Why containerize applications?",
    answer: "Containerization provides consistent runtime environments across development, staging, and production. This eliminates 'works on my machine' issues, enables faster rollouts, easier scaling, and simplified dependency management. Containers also improve resource utilization and enable microservices architectures.",
    icon: Container,
    category: "DevOps"
  },
  {
    question: "How are failures handled?",
    answer: "The pipeline includes automated rollback mechanisms triggered by failed health checks or smoke tests. ECS/EKS maintains previous task definitions/ReplicaSets for instant rollback. The system also includes circuit breakers, retry logic, and alerting to minimize impact and recovery time.",
    icon: Shield,
    category: "Reliability"
  },
  {
    question: "What security measures are included?",
    answer: "Security is built into every stage: signed commits, dependency scanning (SCA), static analysis (SAST), container vulnerability scanning, secrets management via AWS Secrets Manager, IAM roles instead of hardcoded credentials, and image signing with Sigstore/Cosign.",
    icon: Shield,
    category: "Security"
  },
  {
    question: "How does this improve team productivity?",
    answer: "Automated CI/CD reduces manual errors, enables frequent deployments, provides fast feedback loops, and frees developers to focus on features instead of deployment processes. Teams typically see 5x increase in deployment frequency and 60% reduction in lead time.",
    icon: Zap,
    category: "Productivity"
  },
  {
    question: "What happens during a rollback?",
    answer: "Rollbacks are instantaneous using previous task definitions (ECS) or ReplicaSets (EKS). The load balancer automatically routes traffic back to healthy instances while the failed deployment is terminated. This process typically completes in under 30 seconds.",
    icon: GitBranch,
    category: "Reliability"
  },
  {
    question: "Can this work with monorepos?",
    answer: "Absolutely. The pipeline can be configured with path-based triggers, selective building, and independent deployment pipelines for different services within a monorepo. This enables teams to maintain separate release cycles while sharing common infrastructure code.",
    icon: GitBranch,
    category: "Architecture"
  },
  {
    question: "What about compliance and auditing?",
    answer: "All pipeline runs are logged with full traceability from commit to deployment. Artifacts include SBOMs, test reports, and deployment manifests. The system supports SOC 2, HIPAA, and other compliance requirements through proper access controls and audit logging.",
    icon: Shield,
    category: "Compliance"
  },
  {
    question: "How do you handle secrets and configuration?",
    answer: "Secrets are managed through AWS Secrets Manager or Systems Manager Parameter Store, never stored in code. Configuration is environment-specific using parameter stores, with runtime injection into containers. This follows the twelve-factor app methodology.",
    icon: Shield,
    category: "Security"
  }
];

const categoryColors = {
  Demo: "bg-indigo-100 text-indigo-700",
  Architecture: "bg-emerald-100 text-emerald-700", 
  DevOps: "bg-orange-100 text-orange-700",
  Reliability: "bg-purple-100 text-purple-700",
  Security: "bg-red-100 text-red-700",
  Productivity: "bg-yellow-100 text-yellow-700",
  Compliance: "bg-blue-100 text-blue-700"
};

export const FAQ = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Common questions about CI/CD pipelines, containerization, and AWS deployment patterns
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* FAQ Categories */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-lg sticky top-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                <span>Categories</span>
              </h3>
              
              <div className="space-y-3">
                {Object.entries(categoryColors).map(([category, colorClass]) => {
                  const count = faqs.filter(faq => faq.category === category).length;
                  return (
                    <div key={category} className="flex items-center justify-between">
                      <Badge variant="outline" className={colorClass}>
                        {category}
                      </Badge>
                      <span className="text-sm text-slate-500">{count}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <h4 className="font-medium text-slate-900 mb-2">Need More Help?</h4>
                <p className="text-sm text-slate-600 mb-3">
                  This demo showcases production-ready CI/CD patterns used by high-performing engineering teams.
                </p>
                <div className="text-xs text-slate-500">
                  Built with modern DevOps best practices
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Accordion */}
        <div className="lg:col-span-2">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => {
              const Icon = faq.icon;
              const categoryColorClass = categoryColors[faq.category as keyof typeof categoryColors];
              
              return (
                <AccordionItem key={index} value={`item-${index}`} className="border-0">
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <AccordionTrigger className="hover:no-underline p-6">
                      <div className="flex items-start space-x-4 text-left">
                        <div className="flex-shrink-0 mt-1">
                          <div className={`p-2 rounded-lg ${categoryColorClass.replace('text-', 'bg-').replace('-700', '-100')}`}>
                            <Icon className={`w-5 h-5 ${categoryColorClass.split(' ')[1]}`} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline" className={categoryColorClass}>
                              {faq.category}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold text-slate-900">
                            {faq.question}
                          </h3>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="ml-16">
                        <p className="text-slate-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>

      {/* Contact Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-slate-200 mb-6 max-w-2xl mx-auto">
            This CI/CD pipeline demo represents real-world DevOps practices. 
            The patterns shown here are used by teams deploying to production multiple times per day.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <GitBranch className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
              <h4 className="font-semibold mb-1">GitHub Integration</h4>
              <p className="text-sm text-slate-300">Webhook-driven automation</p>
            </div>
            <div className="text-center">
              <Container className="w-8 h-8 mx-auto mb-2 text-indigo-400" />
              <h4 className="font-semibold mb-1">Container Security</h4>
              <p className="text-sm text-slate-300">Multi-stage builds & scanning</p>
            </div>
            <div className="text-center">
              <Cloud className="w-8 h-8 mx-auto mb-2 text-orange-400" />
              <h4 className="font-semibold mb-1">AWS Best Practices</h4>
              <p className="text-sm text-slate-300">Production-grade deployment</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
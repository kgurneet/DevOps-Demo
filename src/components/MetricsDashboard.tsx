import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Clock, Zap, Shield, Target, Activity, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const metrics = [
  {
    title: "Deployment Frequency",
    value: "12 /week",
    change: "+150%",
    trend: "up",
    description: "How often code is deployed to production",
    icon: Zap,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50"
  },
  {
    title: "Lead Time for Changes",
    value: "2.4 hours",
    change: "-60%",
    trend: "down",
    description: "Time from commit to production",
    icon: Clock,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50"
  },
  {
    title: "Change Failure Rate",
    value: "6.5%",
    change: "-40%",
    trend: "down",
    description: "Percentage of deployments that fail",
    icon: Shield,
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
  {
    title: "MTTR",
    value: "28 min",
    change: "-55%",
    trend: "down",
    description: "Mean time to recovery from failures",
    icon: Target,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }
];

// Mock chart data
const deploymentTrends = [
  { month: 'Jan', deployments: 8, failures: 2, leadTime: 4.2, buildTime: 12 },
  { month: 'Feb', deployments: 12, failures: 1, leadTime: 3.8, buildTime: 10 },
  { month: 'Mar', deployments: 15, failures: 1, leadTime: 3.2, buildTime: 9 },
  { month: 'Apr', deployments: 18, failures: 0, leadTime: 2.8, buildTime: 8 },
  { month: 'May', deployments: 22, failures: 1, leadTime: 2.4, buildTime: 7 },
  { month: 'Jun', deployments: 25, failures: 2, leadTime: 2.1, buildTime: 6 },
];

const pipelinePerformance = [
  { stage: 'Build', avgTime: 6.2, maxTime: 12, minTime: 4 },
  { stage: 'Test', avgTime: 8.5, maxTime: 15, minTime: 5 },
  { stage: 'Security Scan', avgTime: 3.2, maxTime: 8, minTime: 2 },
  { stage: 'Deploy', avgTime: 4.8, maxTime: 10, minTime: 3 },
];

const realTimeActivity = [
  { time: '14:00', successful: 8, failed: 1 },
  { time: '14:15', successful: 12, failed: 0 },
  { time: '14:30', successful: 6, failed: 2 },
  { time: '14:45', successful: 15, failed: 1 },
  { time: '15:00', successful: 9, failed: 0 },
  { time: '15:15', successful: 11, failed: 1 },
];

const environmentData = [
  { name: 'Production', value: 45, color: '#10B981' },
  { name: 'Staging', value: 35, color: '#3B82F6' },
  { name: 'Development', value: 20, color: '#F59E0B' },
];

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

export const MetricsDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">DevOps Metrics & Outcomes</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Track DORA metrics to measure the effectiveness of your CI/CD pipeline and DevOps practices
        </p>
      </div>

      {/* DORA Metrics Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          const trendColor = metric.trend === 'up' ? 'text-emerald-600' : 'text-red-600';

          return (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <Badge variant="outline" className={`${trendColor} border-current`}>
                    <TrendIcon className="w-3 h-3 mr-1" />
                    {metric.change}
                  </Badge>
                </div>
                
                <h3 className="font-semibold text-slate-900 mb-1">{metric.title}</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">{metric.value}</div>
                <p className="text-sm text-slate-600">{metric.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Interactive Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Deployment Trends Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>Deployment & Failure Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={deploymentTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="deployments"
                  stackId="1"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.6}
                  name="Successful Deployments"
                />
                <Area
                  type="monotone"
                  dataKey="failures"
                  stackId="2"
                  stroke="#EF4444"
                  fill="#EF4444"
                  fillOpacity={0.6}
                  name="Failed Deployments"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pipeline Performance Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <span>Pipeline Stage Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pipelinePerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis label={{ value: 'Time (min)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="avgTime" fill="#3B82F6" name="Avg Time" />
                <Bar dataKey="maxTime" fill="#F59E0B" name="Max Time" opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Interactive Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Real-time Activity */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-purple-600" />
              <span>Real-time Pipeline Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={realTimeActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="successful"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                  name="Successful Runs"
                />
                <Line
                  type="monotone"
                  dataKey="failed"
                  stroke="#EF4444"
                  strokeWidth={3}
                  dot={{ fill: '#EF4444', strokeWidth: 2, r: 6 }}
                  name="Failed Runs"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Environment Distribution */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-orange-600" />
              <span>Deployment by Environment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={environmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {environmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Improvement Summary */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-indigo-50">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">DevOps Transformation Results</h3>
            <p className="text-slate-600">Improvements achieved through automated CI/CD practices</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-emerald-600 mb-2">5×</div>
              <div className="text-slate-900 font-medium mb-1">Faster Deployments</div>
              <div className="text-sm text-slate-600">From weekly to multiple times per day</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-indigo-600 mb-2">60%</div>
              <div className="text-slate-900 font-medium mb-1">Reduced Lead Time</div>
              <div className="text-sm text-slate-600">Automated testing and deployment</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-orange-600 mb-2">40%</div>
              <div className="text-slate-900 font-medium mb-1">Lower Failure Rate</div>
              <div className="text-sm text-slate-600">Better testing and rollback strategies</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
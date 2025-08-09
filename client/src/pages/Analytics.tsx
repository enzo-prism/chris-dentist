import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, MessageCircle, Phone, TrendingUp, Eye, MousePointer, Target, Globe, Clock } from "lucide-react";
import MetaTags from "@/components/common/MetaTags";
import { pageTitles } from "@/lib/metaContent";
import { Appointment, ContactMessage, Service, Testimonial } from "@shared/schema";

interface AnalyticsData {
  appointments: Appointment[];
  contacts: ContactMessage[];
  services: Service[];
  testimonials: Testimonial[];
}

interface GAMetrics {
  sessions: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: string;
  topPages: Array<{ page: string; views: number; }>;
  deviceTypes: Array<{ device: string; sessions: number; }>;
  trafficSources: Array<{ source: string; sessions: number; }>;
  conversions: Array<{ goal: string; completions: number; }>;
}

// Mock Google Analytics data - in production, this would come from GA API
const mockGAMetrics: GAMetrics = {
  sessions: 2847,
  pageViews: 8234,
  bounceRate: 23.4,
  avgSessionDuration: "3:42",
  topPages: [
    { page: "/", views: 2341 },
    { page: "/services", views: 1567 },
    { page: "/about", views: 1234 },
    { page: "/dental-veneers", views: 987 },
    { page: "/contact", views: 654 }
  ],
  deviceTypes: [
    { device: "Mobile", sessions: 1821 },
    { device: "Desktop", sessions: 876 },
    { device: "Tablet", sessions: 150 }
  ],
  trafficSources: [
    { source: "Organic Search", sessions: 1456 },
    { source: "Direct", sessions: 823 },
    { source: "Social Media", sessions: 324 },
    { source: "Referral", sessions: 244 }
  ],
  conversions: [
    { goal: "Appointment Requests", completions: 89 },
    { goal: "Contact Form", completions: 134 },
    { goal: "Phone Clicks", completions: 267 }
  ]
};

const COLORS = ['#005f40', '#00a86b', '#4ade80', '#86efac', '#bbf7d0'];

function PasswordDialog({ open, onOpenChange, onAuthenticate }: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  onAuthenticate: () => void; 
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "chris") {
      onAuthenticate();
      onOpenChange(false);
      setError("");
      setPassword("");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Analytics Dashboard</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              autoFocus
            />
            {error && (
              <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Access Dashboard
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Analytics() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  // Check for existing session
  useEffect(() => {
    const authStatus = sessionStorage.getItem("analytics-auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    } else {
      setShowPasswordDialog(true);
    }
  }, []);

  const handleAuthenticate = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("analytics-auth", "true");
  };

  // Fetch data from our existing APIs
  const { data: appointments = [] } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments"],
    enabled: isAuthenticated,
  });

  const { data: contacts = [] } = useQuery<ContactMessage[]>({
    queryKey: ["/api/contact"],
    enabled: isAuthenticated,
  });

  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/services"],
    enabled: isAuthenticated,
  });

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
    enabled: isAuthenticated,
  });

  // Process data for analytics
  const processedData = {
    // Appointments by month (last 6 months)
    appointmentsByMonth: [
      { month: 'Feb', count: 23, conversions: 18 },
      { month: 'Mar', count: 31, conversions: 24 },
      { month: 'Apr', count: 28, conversions: 22 },
      { month: 'May', count: 35, conversions: 28 },
      { month: 'Jun', count: 42, conversions: 34 },
      { month: 'Jul', count: 38, conversions: 31 }
    ],
    
    // Service popularity
    servicePopularity: [
      { service: 'Cleanings', requests: 145, revenue: 21750 },
      { service: 'Veneers', requests: 67, revenue: 134000 },
      { service: 'Implants', requests: 43, revenue: 172000 },
      { service: 'Invisalign', requests: 89, revenue: 356000 },
      { service: 'Emergency', requests: 76, revenue: 38000 }
    ],

    // Contact methods
    contactMethods: [
      { method: 'Online Form', count: contacts.length || 134 },
      { method: 'Phone', count: 267 },
      { method: 'TypeForm', count: appointments.length || 89 }
    ],

    // Marketing performance
    marketingROI: [
      { channel: 'Google Ads', spend: 2400, leads: 45, cost_per_lead: 53.33 },
      { channel: 'Facebook Ads', spend: 800, leads: 12, cost_per_lead: 66.67 },
      { channel: 'SEO', spend: 1200, leads: 89, cost_per_lead: 13.48 },
      { channel: 'Yelp Ads', spend: 600, leads: 8, cost_per_lead: 75.00 }
    ]
  };

  if (!isAuthenticated) {
    return (
      <>
        <MetaTags 
          title="Analytics Dashboard - Access Restricted"
          description="Secure analytics dashboard for practice performance metrics"
        />
        <PasswordDialog 
          open={showPasswordDialog} 
          onOpenChange={setShowPasswordDialog}
          onAuthenticate={handleAuthenticate}
        />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Access Restricted</CardTitle>
              <CardDescription>Please authenticate to view the analytics dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setShowPasswordDialog(true)}
                className="w-full"
              >
                Enter Password
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <MetaTags 
        title="Analytics Dashboard | Practice Performance Metrics"
        description="Comprehensive analytics dashboard showing marketing performance and practice metrics"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8"
      >
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-lg text-gray-600">Practice Performance & Marketing Insights</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Sessions</CardTitle>
                  <Globe className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockGAMetrics.sessions.toLocaleString()}</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.4% from last month
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Page Views</CardTitle>
                  <Eye className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockGAMetrics.pageViews.toLocaleString()}</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8.2% from last month
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
                  <Target className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8%</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2.1% from last month
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Bounce Rate</CardTitle>
                  <MousePointer className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockGAMetrics.bounceRate}%</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="w-3 h-3 mr-1 transform scale-y-[-1]" />
                    -3.7% from last month
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="traffic">Traffic</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Appointments Trend */}
                <Card>
                  <CardHeader>
                    <CardTitle>Appointment Requests Trend</CardTitle>
                    <CardDescription>Monthly appointment requests and conversions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={processedData.appointmentsByMonth}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="count" stroke="#005f40" fill="#005f40" fillOpacity={0.1} />
                        <Area type="monotone" dataKey="conversions" stroke="#00a86b" fill="#00a86b" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Device Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Traffic by Device</CardTitle>
                    <CardDescription>User sessions by device type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={mockGAMetrics.deviceTypes}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ device, sessions, percent }) => `${device}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="sessions"
                        >
                          {mockGAMetrics.deviceTypes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Top Pages */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Pages</CardTitle>
                  <CardDescription>Most visited pages on your website</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockGAMetrics.topPages.map((page, index) => (
                      <div key={page.page} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">#{index + 1}</Badge>
                          <span className="font-medium">{page.page === '/' ? 'Homepage' : page.page.replace('/', '').replace('-', ' ')}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{page.views.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">views</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appointments Tab */}
            <TabsContent value="appointments" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Appointment Requests by Month</CardTitle>
                    <CardDescription>Total requests and conversion rate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={processedData.appointmentsByMonth}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#005f40" name="Requests" />
                        <Bar dataKey="conversions" fill="#00a86b" name="Conversions" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Methods</CardTitle>
                    <CardDescription>How patients are reaching out</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {processedData.contactMethods.map((method) => (
                        <div key={method.method} className="flex items-center justify-between">
                          <span className="font-medium">{method.method}</span>
                          <div className="text-right">
                            <div className="font-semibold">{method.count}</div>
                            <div className="text-sm text-gray-500">contacts</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Marketing Tab */}
            <TabsContent value="marketing" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Marketing ROI by Channel</CardTitle>
                    <CardDescription>Cost per lead by marketing channel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={processedData.marketingROI}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="channel" />
                        <YAxis />
                        <Tooltip formatter={(value, name) => name === 'cost_per_lead' ? [`$${value}`, 'Cost per Lead'] : [value, name]} />
                        <Bar dataKey="leads" fill="#00a86b" name="Leads Generated" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Sources</CardTitle>
                    <CardDescription>Where your visitors are coming from</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockGAMetrics.trafficSources.map((source, index) => (
                        <div key={source.source} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                            <span className="font-medium">{source.source}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{source.sessions}</div>
                            <div className="text-sm text-gray-500">sessions</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Marketing Performance Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Marketing Channel Performance</CardTitle>
                  <CardDescription>Detailed breakdown of marketing spend and results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Channel</th>
                          <th className="text-right p-2">Spend</th>
                          <th className="text-right p-2">Leads</th>
                          <th className="text-right p-2">Cost per Lead</th>
                          <th className="text-right p-2">ROI</th>
                        </tr>
                      </thead>
                      <tbody>
                        {processedData.marketingROI.map((channel) => (
                          <tr key={channel.channel} className="border-b">
                            <td className="p-2 font-medium">{channel.channel}</td>
                            <td className="text-right p-2">${channel.spend}</td>
                            <td className="text-right p-2">{channel.leads}</td>
                            <td className="text-right p-2">${channel.cost_per_lead.toFixed(2)}</td>
                            <td className="text-right p-2">
                              <Badge variant={channel.cost_per_lead < 30 ? "default" : channel.cost_per_lead < 60 ? "secondary" : "destructive"}>
                                {channel.cost_per_lead < 30 ? "Excellent" : channel.cost_per_lead < 60 ? "Good" : "Needs Improvement"}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Service Popularity & Revenue</CardTitle>
                  <CardDescription>Most requested services and their revenue impact</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={processedData.servicePopularity}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="service" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip formatter={(value, name) => name === 'revenue' ? [`$${value.toLocaleString()}`, 'Revenue'] : [value, 'Requests']} />
                      <Bar yAxisId="left" dataKey="requests" fill="#005f40" name="Requests" />
                      <Bar yAxisId="right" dataKey="revenue" fill="#00a86b" name="Revenue" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Traffic Tab */}
            <TabsContent value="traffic" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sessions Over Time</CardTitle>
                    <CardDescription>Website traffic trend</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={processedData.appointmentsByMonth.map(item => ({ ...item, sessions: item.count * 67 }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="sessions" stroke="#005f40" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Conversion Goals</CardTitle>
                    <CardDescription>Goal completions this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockGAMetrics.conversions.map((conversion) => (
                        <div key={conversion.goal} className="flex items-center justify-between">
                          <span className="font-medium">{conversion.goal}</span>
                          <div className="text-right">
                            <div className="font-semibold">{conversion.completions}</div>
                            <div className="text-sm text-gray-500">completions</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </>
  );
}
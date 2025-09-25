import { DashboardHeader } from "@/components/dashboard-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Linkedin,
  Video,
  Calendar,
} from "lucide-react";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
)

const integrations = [
  {
    name: "Email",
    description: "Connect your company email for seamless communication.",
    icon: Mail,
    connected: true,
  },
  {
    name: "LinkedIn",
    description: "Post jobs and source candidates directly from LinkedIn.",
    icon: Linkedin,
    connected: false,
  },
  {
    name: "Facebook",
    description: "Share job openings on your company's Facebook page.",
    icon: FacebookIcon,
    connected: false,
  },
  {
    name: "Zoom",
    description: "Schedule and conduct video interviews using Zoom.",
    icon: Video,
    connected: true,
  },
  {
    name: "Google Meet",
    description: "Use Google Meet for your video conferencing needs.",
    icon: Video,
    connected: false,
  },
  {
    name: "Google Calendar",
    description: "Integrate with Google Calendar to schedule interviews.",
    icon: Calendar,
    connected: true,
  },
];

export default function IntegrationsPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Integrations" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Third-Party Integrations</CardTitle>
            <CardDescription>
              Connect to third-party services to streamline your HR workflows.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {integrations.map((integration) => (
              <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <integration.icon className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <h3 className="font-semibold">{integration.name}</h3>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
                <Switch
                  id={`switch-${integration.name}`}
                  checked={integration.connected}
                  aria-label={`Connect to ${integration.name}`}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

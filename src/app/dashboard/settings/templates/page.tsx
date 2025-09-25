import { DashboardHeader } from "@/components/dashboard-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TemplatesPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Templates" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="font-headline">
              Offer Letter Template Editor
            </CardTitle>
            <CardDescription>
              Design and customize the standard offer letter template. You can
              use placeholders like &#123;&#123;candidateName&#125;&#125;, &#123;&#123;jobTitle&#125;&#125;,
              and &#123;&#123;salary&#125;&#125; which will be automatically replaced.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="template-subject">Email Subject</Label>
              <Input
                id="template-subject"
                defaultValue="Congratulations! Your Offer from [Company Name]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template-body">Template Body</Label>
              <Textarea
                id="template-body"
                className="min-h-[400px]"
                defaultValue={`Dear {{candidateName}},

We are thrilled to offer you the position of {{jobTitle}} at [Company Name]. We were very impressed with your background and believe you will be a great asset to our team.

Your starting salary will be {{salary}} per year. This offer is contingent upon the successful completion of a background check.

Please review the attached documents and sign the offer letter by [Date].

We look forward to you joining our team!

Best regards,
The [Company Name] Team`}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Save Template</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
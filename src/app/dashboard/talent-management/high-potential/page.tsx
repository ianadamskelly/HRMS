
'use client';

import { DashboardHeader } from "@/components/dashboard-header";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Filter, Users } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const employees = [
  { id: "EMP001", name: "John Doe", performance: 8, potential: 7, avatar: "https://picsum.photos/seed/user1/40/40" },
  { id: "EMP002", name: "Jane Smith", performance: 9, potential: 9, avatar: "https://picsum.photos/seed/user2/40/40" },
  { id: "EMP003", name: "Peter Jones", performance: 3, potential: 3, avatar: "https://picsum.photos/seed/user3/40/40" },
  { id: "EMP004", name: "Sarah Miller", performance: 7, potential: 5, avatar: "https://picsum.photos/seed/user4/40/40" },
  { id: "EMP005", name: "Michael Chen", performance: 5, potential: 8, avatar: "https://picsum.photos/seed/user5/40/40" },
  { id: "EMP006", name: "Emily White", performance: 4, potential: 4, avatar: "https://picsum.photos/seed/user6/40/40" },
  { id: "EMP007", name: "David Green", performance: 2, potential: 7, avatar: "https://picsum.photos/seed/user7/40/40" },
  { id: "EMP008", name: "Jessica Black", performance: 8, potential: 3, avatar: "https://picsum.photos/seed/user8/40/40" },
];

const getBoxForEmployee = (performance: number, potential: number) => {
  const perfCategory = performance <= 3 ? 'low' : performance <= 6 ? 'moderate' : 'high';
  const potCategory = potential <= 3 ? 'low' : potential <= 6 ? 'moderate' : 'high';
  return `${potCategory}-${perfCategory}`;
};

const boxes = {
    'high-high': { title: 'Future Leader', color: 'bg-green-600/20 border-green-600', textColor: 'text-green-800 dark:text-green-300' },
    'high-moderate': { title: 'Growth Employee', color: 'bg-green-400/20 border-green-400', textColor: 'text-green-700 dark:text-green-400' },
    'high-low': { title: 'Enigma', color: 'bg-yellow-400/20 border-yellow-400', textColor: 'text-yellow-700 dark:text-yellow-400' },
    'moderate-high': { title: 'High Impact Performer', color: 'bg-green-400/20 border-green-400', textColor: 'text-green-700 dark:text-green-400' },
    'moderate-moderate': { title: 'Core Employee', color: 'bg-yellow-400/20 border-yellow-400', textColor: 'text-yellow-700 dark:text-yellow-400' },
    'moderate-low': { title: 'Dilemma', color: 'bg-orange-400/20 border-orange-400', textColor: 'text-orange-700 dark:text-orange-400' },
    'low-high': { title: 'Trusted Professional', color: 'bg-yellow-400/20 border-yellow-400', textColor: 'text-yellow-700 dark:text-yellow-400' },
    'low-moderate': { title: 'Effective', color: 'bg-orange-400/20 border-orange-400', textColor: 'text-orange-700 dark:text-orange-400' },
    'low-low': { title: 'Underperformer', color: 'bg-red-500/20 border-red-500', textColor: 'text-red-700 dark:text-red-400' },
}

const gridOrder: (keyof typeof boxes)[] = [
    'high-low', 'high-moderate', 'high-high',
    'moderate-low', 'moderate-moderate', 'moderate-high',
    'low-low', 'low-moderate', 'low-high',
]

export default function HighPotentialPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Talent Management" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">9-Box Talent Model</CardTitle>
                        <CardDescription>
                            Flags and tracks high-performing, high-potential employees using performance and potential ratings.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-end mb-4">
                            <div className="flex flex-col items-center">
                                <span className="font-semibold text-sm">Potential</span>
                                <div className="flex items-center gap-1">
                                    <span className="text-xs">Low</span>
                                    <div className="w-px h-8 bg-border"></div>
                                    <div className="w-px h-12 bg-border"></div>
                                    <div className="w-px h-16 bg-border rotate-45"></div>
                                    <span className="text-xs">High</span>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="grid grid-cols-3 grid-rows-3 gap-2">
                                {gridOrder.map(boxKey => {
                                    const box = boxes[boxKey];
                                    const boxEmployees = employees.filter(e => getBoxForEmployee(e.performance, e.potential) === boxKey);
                                    return (
                                        <div key={boxKey} className={`relative aspect-square p-3 border-2 rounded-lg flex flex-col ${box.color}`}>
                                            <h3 className={`font-bold text-sm ${box.textColor}`}>{box.title}</h3>
                                            <div className="flex-1 flex flex-wrap gap-1 content-start pt-2">
                                                {boxEmployees.map(emp => (
                                                     <Avatar key={emp.id} className="h-8 w-8 border-2 border-white dark:border-background">
                                                        <AvatarImage src={emp.avatar} alt={emp.name} />
                                                        <AvatarFallback>{emp.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                ))}
                                            </div>
                                            <Badge variant="secondary" className="absolute bottom-2 right-2">{boxEmployees.length}</Badge>
                                        </div>
                                    )
                                })}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                             <span className="font-semibold text-sm">Performance</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Users /> Employee Data</CardTitle>
                        <CardDescription>The underlying data feeding the 9-box grid. Ratings typically come from performance reviews.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="flex flex-wrap gap-4 mb-6">
                            <Select defaultValue="all">
                                <SelectTrigger className="w-full sm:w-[200px]"><SelectValue placeholder="Filter by Department" /></SelectTrigger>
                            </Select>
                             <Select defaultValue="all">
                                <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Filter by Manager" /></SelectTrigger>
                            </Select>
                             <Button variant="outline" className="ml-auto">
                                <Filter className="mr-2 h-4 w-4"/>
                                Filter
                            </Button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Performance Score</TableHead>
                                    <TableHead>Potential Score</TableHead>
                                    <TableHead>9-Box Category</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.map((emp) => {
                                    const boxKey = getBoxForEmployee(emp.performance, emp.potential);
                                    const box = boxes[boxKey as keyof typeof boxes];
                                    return (
                                        <TableRow key={emp.id}>
                                            <TableCell className="font-medium flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={emp.avatar} alt={emp.name} />
                                                    <AvatarFallback>{emp.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                {emp.name}
                                            </TableCell>
                                            <TableCell>{emp.performance}/9</TableCell>
                                            <TableCell>{emp.potential}/9</TableCell>
                                            <TableCell>
                                                <Badge style={{
                                                        backgroundColor: box.color.split(' ')[0].replace('bg-', 'var(--color-') + ')',
                                                        color: box.textColor.replace('text-', 'var(--color-') + ')',
                                                        border: `1px solid ${box.color.split(' ')[1].replace('border-', 'var(--color-') + ')'}`
                                                    }}
                                                    className={`${box.textColor} ${box.color.replace('bg-opacity-20', '')}`}
                                                >{box.title}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

            </main>
        </div>
    );
}

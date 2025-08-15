import {GetForms, GetFormStats} from "@/actions/form";
import {LuView} from "react-icons/lu"
import {ReactNode, Suspense} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import {Separator} from "@/components/ui/separator";
import CreateFormBtn from "@/components/CreateFormBtn";
import {Form} from "@prisma/client";
import {Badge} from "@/components/ui/badge";
import {formatDistance} from "date-fns/formatDistance";
import {FaWpforms} from "react-icons/fa";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { StatsCard } from "@/components/StatsCard";

export default function Dashboard() {
    return (
        <div className="container pt-4">
            <Suspense fallback={<StatsCards loading={true}/>}>
                <CardStatsWrapper></CardStatsWrapper>
            </Suspense>
            <Separator className="my-6"/>
            <h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
            <Separator className="my-6"/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CreateFormBtn/>
                <Suspense fallback={[1, 2, 3, 4].map(el => <FormCardSkeleton key={el}/>)}>
                    <FormCards/>
                </Suspense>
            </div>
        </div>
    );
}

async function CardStatsWrapper() {
    try {
        const stats = await GetFormStats();
        return <StatsCards loading={false} data={stats}></StatsCards>
    } catch (error) {
        // Fallback when Clerk or database fails
        return <StatsCards loading={false} data={undefined}></StatsCards>
    }
}

interface StatsCardProps {
    data?: Awaited<ReturnType<typeof GetFormStats>>
    loading: boolean
}

function StatsCards(props: StatsCardProps) {
    const {data, loading} = props;

    return (
        <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols2 lg:grid-cols-4">
            <StatsCard
                title="Total Visits"
                icon={<LuView className="text-blue-600"/>}
                helperText="All time form visits"
                value={data?.visits.toLocaleString() || "0"}
                loading={loading}
                className="shadow-md shadow-blue-600"
            />

            <StatsCard
                title="Total Submissions"
                icon={<LuView className="text-yellow-600"/>}
                helperText="All time form submission"
                value={data?.submissions.toLocaleString() || "0"}
                loading={loading}
                className="shadow-md shadow-yellow-600"
            />

            <StatsCard
                title="Submission rate"
                icon={<LuView className="text-green-600"/>}
                helperText="Visits that result in form submission"
                value={data?.submissionRate.toLocaleString() + "%" || "0%"}
                loading={loading}
                className="shadow-md shadow-green-600"
            />

            <StatsCard
                title="Bounce rate"
                icon={<LuView className="text-red-600"/>}
                helperText="Visits that result in form submission"
                value={data?.bounceRate.toLocaleString() + "%" || "0%"}
                loading={loading}
                className="shadow-md shadow-red-600"
            />


        </div>
    );
}

function FormCardSkeleton() {
    return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full"/>
}

async function FormCards() {
    try {
        const forms = await GetForms();
        return (
            <>
                {
                    forms.map((form) => (<FormCard key={form.id} form={form}/>))
                }
            </>
        );
    } catch (error) {
        // Fallback when Clerk or database fails
        return (
            <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">
                    Unable to load forms. Please check your connection.
                </p>
            </div>
        );
    }
}

function FormCard({form}: { form: Form }) {
    return <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-between">
              <span className="truncate font-bold">
                  {form.name}
              </span>

                {form.published && <Badge>Published</Badge>}
                {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
            </CardTitle>
            <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
                {
                    formatDistance(form.createdAt, new Date(), {addSuffix: true})
                }

                {form.published && <span className="flex items-center gap-2">
                    <LuView className="text-muted-foreground"/>
                    <span>{form.visits.toLocaleString()}</span>

                    <FaWpforms className="text-muted-foreground"/>
                    <span>{form.submissions.toLocaleString()}</span>
                </span>}
            </CardDescription>
        </CardHeader>
        <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
            {form.description || "No Description"}
        </CardContent>
        <CardFooter>
            {form.published && <Button asChild className="w-full mt-2 text-md gap-4">
                <Link href={`/forms/${form.id}`}>
                    View submissions
                </Link>
            </Button>}

            {!form.published && <Button asChild variant={"secondary"} className="w-full mt-2 text-md gap-4">
                <Link href={`/builder/${form.id}`}>
                    Edit form
                </Link>
            </Button>}
        </CardFooter>
    </Card>
}

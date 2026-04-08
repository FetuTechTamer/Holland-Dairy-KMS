import { notFound } from "next/navigation";
import ResourceDetailClient from "@/components/resources/ResourceDetailClient";
import { resourceData, Resource } from "@/lib/resourceData";

interface Params {
  slug: string;
}

interface ResourcePageProps {
  params: Promise<Params>;
}

export default async function ResourceDetailPage({ params }: ResourcePageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const resource: Resource | undefined = resourceData.find((r) => r.slug === slug);
  if (!resource) notFound();

  return <ResourceDetailClient resource={resource} />;
}
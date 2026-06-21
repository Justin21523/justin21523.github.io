import { redirect } from "@/i18n/navigation";

export default async function MobileProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: "/projects/all", locale });
}
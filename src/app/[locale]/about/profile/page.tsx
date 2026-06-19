import { getTranslations } from "next-intl/server";
import { profileInfo } from "@/data/about";
import { ProfileCard } from "@/components/about/profile-card";
import { BioSection } from "@/components/about/bio-section";
import { InterestsSection } from "@/components/about/interests-section";

export async function generateMetadata() {
  const t = await getTranslations("about.profile");
  return {
    title: `${t("title")} | Justin Portfolio`,
    description: t("subtitle"),
  };
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            個人簡介
          </h1>
          <p className="text-lg text-muted-foreground">
            認識我
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Profile Card */}
          <div className="md:col-span-1">
            <ProfileCard profile={profileInfo} />
          </div>

          {/* Right: Bio & Interests */}
          <div className="md:col-span-2 space-y-8">
            <BioSection bio={profileInfo.bio} />
            <InterestsSection interests={profileInfo.interests} />
          </div>
        </div>
      </div>
    </div>
  );
}
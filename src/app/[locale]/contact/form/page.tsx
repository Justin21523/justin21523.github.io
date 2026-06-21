import { ContactForm } from "@/components/contact/contact-form";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  contactEmail,
} from "@/data/contact";

interface ContactFormPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const contactPageCopy = {
  "zh-TW": {
    metadataTitle: "聯絡我 | Justin Portfolio",
    metadataDescription:
      "有任何問題或合作邀約，歡迎透過表單聯絡 Justin。",
    title: "聯絡我",
    description:
      "有任何問題或合作邀約，歡迎透過表單或 Email 與我聯繫。",
    emailTitle: "電子郵件",
    locationTitle: "所在地",
    location: "Taiwan",
    contactTitle: "聯絡方式",
    contactDescription:
      "歡迎透過表單或 Email 聯繫",
  },
  en: {
    metadataTitle: "Contact Me | Justin Portfolio",
    metadataDescription:
      "Contact Justin for project discussions, learning exchange, or technical conversations.",
    title: "Contact Me",
    description:
      "For project discussions, learning exchange, or technical conversations, feel free to contact me by form or email.",
    emailTitle: "Email",
    locationTitle: "Location",
    location: "Taiwan",
    contactTitle: "Contact Method",
    contactDescription:
      "You can reach me through this form or by email.",
  },
} as const;

function getCopy(locale: string) {
  return locale === "en"
    ? contactPageCopy.en
    : contactPageCopy["zh-TW"];
}

export async function generateMetadata({
  params,
}: ContactFormPageProps) {
  const { locale } = await params;
  const copy = getCopy(locale);

  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
  };
}

export default async function ContactFormPage({
  params,
}: ContactFormPageProps) {
  const { locale } = await params;
  const copy = getCopy(locale);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{copy.title}</h1>
          <p className="text-lg text-muted-foreground">
            {copy.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-1">{copy.emailTitle}</h3>
              <p className="text-sm text-muted-foreground">{contactEmail}</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-1">{copy.locationTitle}</h3>
              <p className="text-sm text-muted-foreground">{copy.location}</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-1">{copy.contactTitle}</h3>
              <p className="text-sm text-muted-foreground">{copy.contactDescription}</p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 bg-card border border-border rounded-2xl p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

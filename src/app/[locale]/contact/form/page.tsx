import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/contact-form";
import { Mail, MapPin, Phone } from "lucide-react";

export async function generateMetadata() {
  return {
    title: "聯絡我 | Justin Portfolio",
    description: "有任何問題或合作邀約，歡迎透過表單聯絡我。",
  };
}

export default function ContactFormPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">聯絡我</h1>
          <p className="text-lg text-muted-foreground">
            有任何問題或合作邀約，歡迎隨時與我聯繫！
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-1">電子郵件</h3>
              <p className="text-sm text-muted-foreground">justin@example.com</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-1">所在地</h3>
              <p className="text-sm text-muted-foreground">台北市, 台灣</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-1">聯絡方式</h3>
              <p className="text-sm text-muted-foreground">歡迎透過表單或 Email 聯繫</p>
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
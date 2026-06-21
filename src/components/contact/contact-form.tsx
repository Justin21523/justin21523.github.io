"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { useLocale } from "next-intl";
import {
  formSubmitEndpoint,
} from "@/data/contact";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const locale = useLocale() === "en" ? "en" : "zh-TW";
  const copy = contactFormCopy[locale];
  const contactSchema = createContactSchema(copy);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    
    try {
      const response = await fetch(formSubmitEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...data,
          _subject: `Portfolio contact: ${data.subject}`,
          _template: "table",
          _captcha: "false",
          source: "Justin Portfolio contact form",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send contact form");
      }

      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          {copy.name}
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className={`w-full px-4 py-3 rounded-lg bg-secondary/50 border ${
            errors.name ? "border-destructive" : "border-border"
          } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
          placeholder={copy.namePlaceholder}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" /> {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          {copy.email}
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={`w-full px-4 py-3 rounded-lg bg-secondary/50 border ${
            errors.email ? "border-destructive" : "border-border"
          } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" /> {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          {copy.subject}
        </label>
        <input
          id="subject"
          type="text"
          {...register("subject")}
          className={`w-full px-4 py-3 rounded-lg bg-secondary/50 border ${
            errors.subject ? "border-destructive" : "border-border"
          } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
          placeholder={copy.subjectPlaceholder}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" /> {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          {copy.message}
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className={`w-full px-4 py-3 rounded-lg bg-secondary/50 border ${
            errors.message ? "border-destructive" : "border-border"
          } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none`}
          placeholder={copy.messagePlaceholder}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" /> {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {status === "loading" && (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {status === "success" && <CheckCircle className="w-5 h-5" />}
        {status === "idle" && <Send className="w-5 h-5" />}
        {status === "idle" && copy.submit}
        {status === "loading" && copy.loading}
        {status === "success" && copy.success}
      </button>

      {status === "error" && (
        <p className="text-center text-destructive text-sm">
          {copy.error}
        </p>
      )}
    </motion.form>
  );
}

const contactFormCopy = {
  "zh-TW": {
    name: "姓名",
    namePlaceholder: "您的姓名",
    email: "電子郵件",
    subject: "主旨",
    subjectPlaceholder: "合作邀約 / 技術交流",
    message: "訊息內容",
    messagePlaceholder: "請告訴我您的想法...",
    submit: "發送訊息",
    loading: "發送中...",
    success: "發送成功！",
    error:
      "發送失敗，請稍後再試，或直接寄信到 justin21523@gmail.com。",
    validation: {
      name: "姓名至少需要 2 個字元",
      email: "請輸入有效的電子郵件",
      subject: "主旨至少需要 5 個字元",
      message: "訊息至少需要 10 個字元",
    },
  },
  en: {
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    subject: "Subject",
    subjectPlaceholder: "Project discussion / technical exchange",
    message: "Message",
    messagePlaceholder: "Tell me what you would like to discuss...",
    submit: "Send Message",
    loading: "Sending...",
    success: "Message sent!",
    error:
      "Failed to send. Please try again later or email justin21523@gmail.com directly.",
    validation: {
      name: "Name must be at least 2 characters.",
      email: "Please enter a valid email address.",
      subject: "Subject must be at least 5 characters.",
      message: "Message must be at least 10 characters.",
    },
  },
} as const;

function createContactSchema(copy: typeof contactFormCopy[keyof typeof contactFormCopy]) {
  return z.object({
    name: z.string().min(2, copy.validation.name),
    email: z.string().email(copy.validation.email),
    subject: z.string().min(5, copy.validation.subject),
    message: z.string().min(10, copy.validation.message),
  });
}

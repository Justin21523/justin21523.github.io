"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

// 使用 Zod 定義表單驗證規則
const contactSchema = z.object({
  name: z.string().min(2, "姓名至少需要 2 個字元"),
  email: z.string().email("請輸入有效的電子郵件"),
  subject: z.string().min(5, "主旨至少需要 5 個字元"),
  message: z.string().min(10, "訊息至少需要 10 個字元"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
    
    // 模擬 API 呼叫 (實際專案可串接 Web3Forms, Formspree 或 Next.js API Route)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form Data:", data);
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
          姓名
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className={`w-full px-4 py-3 rounded-lg bg-secondary/50 border ${
            errors.name ? "border-destructive" : "border-border"
          } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
          placeholder="您的姓名"
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
          電子郵件
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
          主旨
        </label>
        <input
          id="subject"
          type="text"
          {...register("subject")}
          className={`w-full px-4 py-3 rounded-lg bg-secondary/50 border ${
            errors.subject ? "border-destructive" : "border-border"
          } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
          placeholder="合作邀約 / 技術交流"
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
          訊息內容
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className={`w-full px-4 py-3 rounded-lg bg-secondary/50 border ${
            errors.message ? "border-destructive" : "border-border"
          } focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none`}
          placeholder="請告訴我您的想法..."
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
        {status === "idle" && "發送訊息"}
        {status === "loading" && "發送中..."}
        {status === "success" && "發送成功！"}
      </button>

      {status === "error" && (
        <p className="text-center text-destructive text-sm">
          發送失敗，請稍後再試。
        </p>
      )}
    </motion.form>
  );
}
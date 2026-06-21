"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Mail } from "lucide-react";
import { ProfileInfo } from "@/types/about";

interface ProfileCardProps {
  profile: ProfileInfo;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-2xl p-8 shadow-lg"
    >
      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-primary/20 bg-gradient-to-br from-primary to-secondary text-4xl font-bold text-primary-foreground"
        >
          {profile.avatar ? (
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              sizes="128px"
              className="object-cover"
            />
          ) : (
            profile.name.charAt(0)
          )}
        </motion.div>
      </div>

      {/* Name & Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
        <p className="text-primary font-medium">{profile.title}</p>
      </div>

      {/* Info */}
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-3 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{profile.location}</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Mail className="w-4 h-4" />
          <a href={`mailto:${profile.email}`} className="hover:text-primary transition-colors">
            {profile.email}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

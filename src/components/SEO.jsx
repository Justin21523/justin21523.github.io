import React from "react";
import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, image, url }) {
  const siteTitle = "Justin - Full-stack & 3D Web Developer";
  const defaultDescription = "Portfolio of Justin, a Full-stack and 3D Web Developer specializing in React, Three.js, and AI applications.";
  const siteUrl = "https://neojustin.dothost.net";
  const defaultImage = `${siteUrl}/og-image.png`; // You should create this image later

  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDescription = description || defaultDescription;
  const metaImage = image ? (image.startsWith("http") ? image : `${siteUrl}${image}`) : defaultImage;
  const metaUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
}

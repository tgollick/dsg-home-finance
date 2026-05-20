import { Metadata } from "next";

export const SITE = {
  name: "DSG Home Finance",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.dsgmortgages.com",
  description:
    "Independent mortgage broker in Margate serving Thanet and Kent. 5-star rated, 20+ years experience, whole-of-market access.",
  author: "David Gollick",
  twitter: "@dsg_home_finance",
};

type PageMeta = {
  title: string;
  description?: string;
  image?: string;     
  path?: string;      
  noIndex?: boolean;
};

export const buildMetadata = ({
  title,
  description = SITE.description,
  image = "/og-default.jpg",
  path = "/",
  noIndex = false,
}: PageMeta): Metadata => {
  const url = `${SITE.url}${path}`;
  return {
    metadataBase: new URL(SITE.url),
    title,
    description,
    openGraph: {
      title,
      description,
      url,                                  
      siteName: SITE.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: SITE.twitter,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
    alternates: {
      canonical: url,                        
    },
  };
};
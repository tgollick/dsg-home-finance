import { Metadata } from "next";

export const SITE = {
  name: "DSG Home Finance",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://dsg-home-finance.com",
  description:
    "Expert mortgage & protection advice from David Gollick. Tailored solutions, 5-star service, 20+ years experience.",
  author: "David Gollick",
  twitter: "@dsg_home_finance",
};

type PageMeta = {
  title: string;
  description?: string;
  image?: string;               // full URL
  noIndex?: boolean;
};

export const buildMetadata = ({
  title,
  description = SITE.description,
  image = `${SITE.url}/og-default.jpg`,
  noIndex = false,
}: PageMeta): Metadata => ({
  title,
  description,
  openGraph: {
    title,
    description,
    url: SITE.url,
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
    canonical: SITE.url,
  },
});

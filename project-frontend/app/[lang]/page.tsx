import type { Metadata } from "next";
import { getT, Locale, LOCALES } from "./i18n/translations";
import Link from "next/link";

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await params;
  const t = getT(lang);
  return {
    title:       t.meta_title,
    description: t.meta_description,
    keywords:    ["poetry", "poems", "creative writing", "poets", "verse", "literature"],
    authors:     [{ name: "Versify" }],
    metadataBase: new URL("https://versify.art"),
    alternates: {
      canonical: `https://versify.art/${lang}`,
      languages: Object.fromEntries(LOCALES.map(l => [l, `https://versify.art/${l}`])),
    },
    openGraph: {
      title:       t.meta_title,
      description: t.meta_description,
      url:         `https://versify.art/${lang}`,
      siteName:    "Versify",
      images:      [{ url: "/og-image.jpg", width: 1200, height: 630, alt: t.meta_title }],
      locale:      lang,
      type:        "website",
    },
    twitter: {
      card:        "summary_large_image",
      title:       t.meta_title,
      description: t.meta_description,
      images:      ["/og-image.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

export async function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }>;}) {
  
  const { lang } = await params;
  const locale   = LOCALES.includes(lang as Locale) ? lang : "en";
  const t        = getT(locale);

  return (
    <>
    <div> Hello world </div>  
  </>
  );
}
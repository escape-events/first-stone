import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);
  const description =
    "An interactive cornerstone mystery from Escape Events.";

  return {
    metadataBase: baseUrl,
    title: "The First Stone",
    description,
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      type: "website",
      url: baseUrl,
      title: "The First Stone",
      description,
      images: [
        {
          url: new URL("/og.png", baseUrl).toString(),
          width: 1731,
          height: 909,
          alt: "The First Stone — an Escape Events mystery",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "The First Stone",
      description,
      images: [new URL("/og.png", baseUrl).toString()],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

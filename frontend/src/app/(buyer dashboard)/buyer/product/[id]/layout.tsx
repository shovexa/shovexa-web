import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/getProductsByIds`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productIdsArr: [id],
      }),
      cache: "no-store",
    }
  );

  const data = await res.json();

  const product = data.data?.[0];

  if (!product) {
    return {
      title: "Product | Shovexa",
      description: "Product not found.",
    };
  }

  return {
    title: `${product.title} `,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },

  };
}
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <main>{children}</main>
  );
}
import type { Metadata } from "next";

import { SemanticColorCustomization } from "@/components/semantic-color-customization";

export const metadata: Metadata = {
  title: "Customization",
  description: "Customize the semantic colors used throughout the Dark Pattern Lab.",
};

export default function CustomizationPage() {
  return <SemanticColorCustomization />;
}

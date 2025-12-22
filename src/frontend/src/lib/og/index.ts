
type CardVariant = "blog" | "main";

export type CardProps = {
  title?: string;
  subtitle?: string;
  tags?: string[];
  variant: CardVariant;
}

export const DefaultOGImageName = "og"
export const DefaultOGImagePath = `/api/og/image/${DefaultOGImageName}.png`;

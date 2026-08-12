export interface TasteProfileItem {
  key: string;
  label: string;
  value: number | string;
}

type TasteProfileVariant = "type" | "recipe";

interface VariantChipStyle {
  bg: string;
  border: string;
  labelColor: string;
  valueColor: string;
}

interface VariantStyle {
  gap: number;
  padding: string;
  labelFontSize: number;
  valueFontSize: number;
  labelMarginTop: number;
  primary: VariantChipStyle;
  secondary: VariantChipStyle;
}

const VARIANTS: Record<TasteProfileVariant, VariantStyle> = {
  type: {
    gap: 12,
    padding: "5px 0",
    labelFontSize: 11,
    valueFontSize: 17,
    labelMarginTop: 3,
    primary: { bg: "#FDF2EF", border: "#FF6F4F", labelColor: "#FF6120", valueColor: "#FF6120" },
    secondary: { bg: "#FFFFFF", border: "#C2C2C2", labelColor: "#10161F", valueColor: "#10161F" },
  },
  recipe: {
    gap: 8,
    padding: "10px 0 6px",
    labelFontSize: 11,
    valueFontSize: 19,
    labelMarginTop: 0,
    primary: { bg: "#FFF0E8", border: "#FF6F4F", labelColor: "#FF6120", valueColor: "#FF6120" },
    secondary: { bg: "#F5F4F0", border: "#C7C0B8", labelColor: "#6B6B6B", valueColor: "#1A1A2E" },
  },
};

export default function TasteProfileGrid({
  items,
  variant = "type",
}: {
  items: TasteProfileItem[];
  variant?: TasteProfileVariant;
}) {
  const v = VARIANTS[variant];

  return (
    <div style={{ display: "flex", gap: v.gap }}>
      {items.map(({ key, label, value }, index) => {
        const colors = index % 2 === 0 ? v.primary : v.secondary;
        return (
          <div
            key={key}
            style={{
              flex: 1,
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              padding: v.padding,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span style={{ fontSize: v.labelFontSize, fontWeight: 600, color: colors.labelColor, marginTop: v.labelMarginTop }}>
              {label}
            </span>
            <span style={{ fontSize: v.valueFontSize, fontWeight: 800, color: colors.valueColor }}>{value}</span>
          </div>
        );
      })}
    </div>
  );
}

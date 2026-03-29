import React from "react";

/**
 * FigmaDocLayout — Storybook decorator that mirrors Figma's section/tag/grid layout.
 *
 * Renders components in the same structure as the Figma file:
 * - Section header with component set name
 * - Green pill tags above each variant
 * - Components rendered side-by-side with 8px spacing
 */

type VariantConfig = {
  name: string;
  render: () => React.ReactNode;
};

type FigmaDocLayoutProps = {
  /** Full view name, e.g. "tracker-dashboard-home-spendSummaryCard.view" */
  viewName: string;
  /** Variant property name, e.g. "State", "Type", "Selected" */
  propertyName?: string;
  /** Variants to render */
  variants: VariantConfig[];
};

const COLORS = {
  sectionBg: "#F5F5F5",
  sectionBorder: "#E0E0E0",
  tagBg: "#DCFCE7",
  tagText: "#16A34A",
  sectionLabelBg: "#F0E8FF",
  sectionLabelText: "#7C3AED",
  titleText: "#333333",
};

function Tag({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        backgroundColor: COLORS.tagBg,
        color: COLORS.tagText,
        fontFamily: "Inter, sans-serif",
        fontWeight: 600,
        fontSize: 11,
        padding: "4px 10px",
        borderRadius: 10,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function SectionBadge() {
  return (
    <span
      style={{
        display: "inline-block",
        backgroundColor: COLORS.sectionLabelBg,
        color: COLORS.sectionLabelText,
        fontFamily: "Inter, sans-serif",
        fontWeight: 700,
        fontSize: 11,
        padding: "3px 8px",
        borderRadius: 4,
        marginRight: 8,
      }}
    >
      Section
    </span>
  );
}

export function FigmaDocLayout({ viewName, variants }: FigmaDocLayoutProps) {
  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        padding: 0,
        background: "#FFFFFF",
      }}
    >
      {/* Section wrapper */}
      <div
        style={{
          border: `1px solid ${COLORS.sectionBorder}`,
          borderRadius: 8,
          padding: 8,
          background: COLORS.sectionBg,
        }}
      >
        {/* Section header */}
        <div style={{ marginBottom: 8 }}>
          <SectionBadge />
          <span
            style={{
              fontWeight: 600,
              fontSize: 14,
              color: COLORS.titleText,
            }}
          >
            {viewName}
          </span>
        </div>

        {/* Tag row */}
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          {variants.map((v) => (
            <div
              key={v.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 8,
              }}
            >
              <Tag label={v.name} />
            </div>
          ))}
        </div>

        {/* Component row */}
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          {variants.map((v) => (
            <div key={v.name}>{v.render()}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

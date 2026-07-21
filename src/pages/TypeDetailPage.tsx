import drink0 from "../assets/drinks/0.png";
import drink2 from "../assets/drinks/2.png";
import drink3 from "../assets/drinks/3.png";
import { COLORS } from "../theme/colors";
import { type PersonalityType } from "../data/types";
import Header from "../components/Header";
import PhoneFrame from "../components/PhoneFrame";
import DexBackground from "../components/DexBackground";
import { Mascot } from "../components/icons";

const TASTE_LABELS: { key: keyof PersonalityType["taste"]; label: string }[] = [
  { key: "alcohol", label: "도수" },
  { key: "sweet", label: "당도" },
  { key: "sour", label: "산도" },
  { key: "bitter", label: "쓴맛" },
  { key: "refreshing", label: "청량감" },
];

export default function TypeDetailPage({
  type,
  onBack,
  onSetRepresentative,
}: {
  type: PersonalityType;
  onBack: () => void;
  onSetRepresentative: () => void;
  onGoTest: () => void;
}) {
  return (
    <PhoneFrame background={<DexBackground />}>
      <div style={{ padding: "18px 20px 0", flex: 1, overflowY: "auto" }}>
        <Header
          title="타입 상세"
          onBack={onBack}
          right={
            <button
              onClick={onSetRepresentative}
              style={{
                border: "none",
                color: "#fff",
                background: COLORS.orange,
                fontSize: 11,
                fontWeight: 600,
                padding: "6px 10px",
                borderRadius: 20,
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              대표 타입 설정
            </button>
          }
        />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 18 }}>
          {type.id === "idealist" ? (
            <img src={drink0} alt="" style={{ width: 250, height: 250, objectFit: "contain" }} />
          ) : (
            <Mascot size={88} color={type.color} />
          )}
          <div style={{ fontSize: 25, fontWeight: 700, color: "#FD881C", marginTop: 18 }}>{type.name}</div>
          <p
            style={{
              fontSize: 12.5,
              color: "#FD881C",
              textAlign: "center",
              lineHeight: 1.6,
              margin: "6px 0 0",
              maxWidth: 280,
            }}
          >
            {type.description}
          </p>
        </div>

        <div
          style={{
            width: "100%",
            background: COLORS.orange,
            color: "#fff",
            borderRadius: 22,
            padding: "14px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 14.5, fontWeight: 400 }}>"{type.agreeLine}"</span>
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.orange,
            textAlign: "center",
            marginTop: 6,
            marginBottom: 22,
          }}
        >
          사용자의 {type.agreeRate}%가 이 타입이 나왔어요
        </div>

        <div style={{ fontSize: 18, fontWeight: 700, color: "#10161F", marginBottom: 10 }}>
          맛 프로필
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
          {TASTE_LABELS.map(({ key, label }, index) => {
            const isPrimary = index % 2 === 0;
            const textColor = isPrimary ? "#FF6120" : "#10161F";
            return (
              <div
                key={key}
                style={{
                  flex: 1,
                  background: isPrimary ? "#FDF2EF" : "#FFFFFF",
                  border: `1px solid ${isPrimary ? "#FF6F4F" : "#C2C2C2"}`,
                  borderRadius: 12,
                  padding: "10px 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span style={{ fontSize: 10.5, fontWeight: 600, color: textColor }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: textColor }}>
                  {type.taste[key]}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <div
            style={{
              flex: 1,
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 20,
              padding: "16px 8px 10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 800, color: COLORS.ink }}>잘 맞는 타입</span>
            <img src={drink2} alt="" style={{ width: 92, height: 92, objectFit: "contain" }} />
          </div>
          <div
            style={{
              flex: 1,
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 20,
              padding: "16px 8px 10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 800, color: COLORS.ink }}>안 맞는 타입</span>
            <img src={drink3} alt="" style={{ width: 92, height: 92, objectFit: "contain" }} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
          <div
            style={{
              flex: 1,
              background: "#F9B8AE",
              borderRadius: 20,
              padding: "12px 0",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 800, color: "#FDE2B4" }}>환상가</span>
          </div>
          <div
            style={{
              flex: 1,
              background: "#D6EAF8",
              borderRadius: 20,
              padding: "12px 0",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 800, color: "#1564FE" }}>직설가</span>
          </div>
        </div>

        <div style={{ fontSize: 18, fontWeight: 700, color: '#10161F', marginBottom: 10 }}>
          해당 타입 칵테일 {type.cocktails.length}종
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 10,
            paddingBottom: 20,
          }}
        >
          {type.cocktails.map((cocktail) => (
            <div
              key={cocktail.id}
              style={{
                aspectRatio: "1 / 1",
                borderRadius: 20,
                background: "#FFFFFF",
                border: "1.5px solid #F6C9C2",
              }}
            />
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

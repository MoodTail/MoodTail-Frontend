function BackgroundBlur() {
  return (
    <svg
      className="trend-background"
      viewBox="0 0 393 1155"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <circle
        cx="20"
        cy="159"
        r="159"
        fill="url(#trendGradient1)"
        fillOpacity="0.68"
      />
      <circle
        cx="334"
        cy="367"
        r="159"
        fill="url(#trendGradient2)"
        fillOpacity="0.37"
      />
      <circle
        cx="38"
        cy="895"
        r="199"
        fill="url(#trendGradient3)"
        fillOpacity="0.56"
      />
      <circle
        cx="219"
        cy="956"
        r="199"
        fill="url(#trendGradient4)"
        fillOpacity="0.56"
      />
      <defs>
        <radialGradient
          id="trendGradient1"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(20 159) rotate(90) scale(159)"
        >
          <stop stopColor="#FEF6D9" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="trendGradient2"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(334 367) rotate(90) scale(159)"
        >
          <stop stopColor="#FF6F4F" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="trendGradient3"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(38 895) rotate(90) scale(199)"
        >
          <stop stopColor="#FF6F4F" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="trendGradient4"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(219 956) rotate(90) scale(199)"
        >
          <stop stopColor="#FEECAD" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default BackgroundBlur;

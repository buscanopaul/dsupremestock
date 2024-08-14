import { useMemo } from "react";

export default function useFormattedPercentage(
  percentage: number | null
): string | null {
  const formattedPercentage = useMemo(() => {
    if (percentage == null || isNaN(percentage)) return null;

    const rounded = (percentage * 100).toFixed(2);

    return `${rounded}%`;
  }, [percentage]);

  return formattedPercentage;
}

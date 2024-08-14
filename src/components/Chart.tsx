"use client";

import StockContext from "@/context/StockContext";
import { StockContextType } from "@/types/stock";
import { useHistoricalData } from "@/utils/api";
import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { useContext, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

export default function Chart() {
  const { stockSymbol } = useContext(StockContext) as StockContextType;
  const {
    data: historicalData,
    isLoading,
    isError,
  } = useHistoricalData(stockSymbol);

  const chartRef = useRef<ChartJS<"line", number[], unknown>>(null);

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
      gradient.addColorStop(0, "rgba(234, 67, 53, 0.5)"); // Red with opacity
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.5)"); // Black with opacity

      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, [historicalData]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          callback: (tickValue: string | number) => {
            // Ensure tickValue is handled as a number if it is not a string
            const value =
              typeof tickValue === "string" ? parseFloat(tickValue) : tickValue;
            return `$${value.toLocaleString()}`;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
  };

  const chartData = {
    labels:
      historicalData?.t?.map((timestamp: number) =>
        new Date(timestamp * 1000).toLocaleDateString()
      ) || [],
    datasets: [
      {
        label: "Stock Price",
        data: historicalData?.c || [],
        borderColor: "rgb(234, 67, 53)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div
      style={{
        height: "350px",
        width: "100%",
        backgroundColor: "black",
        paddingBottom: 20,
      }}
    >
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading chart data</p>}
      {!isLoading && !isError && historicalData && (
        <Line ref={chartRef} data={chartData} options={options} />
      )}
    </div>
  );
}

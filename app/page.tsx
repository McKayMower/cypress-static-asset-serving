"use client"
import Cesium from "@/components/cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
export default function Home() {
  return (
    <main className="bg-primaryBackground flex flex-col min-h-screen max-h-screen">
      <Cesium></Cesium>
    </main>
  );
}

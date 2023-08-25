"use client";

import { useParams } from "next/navigation";

import Wireframe from "@/components/atoms/Wireframe";

const Page = () => {
  const { id } = useParams();
  console.log("🚀 ~ file: page.tsx:8 ~ Page ~ id:", id);
  return <Wireframe>{`ID: ${id}`}</Wireframe>;
};

export default Page;

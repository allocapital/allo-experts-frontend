import { mockTrendsData } from "./mock";
import { Expert, Mechanism, Course, Build, TrendItem } from "./types";

export const getTrends = async () => {
  let data: TrendItem[] = [];
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/mechanisms/trends/`,
      { cache: "no-store" }
    );
    if (!resp.ok) {
      console.log(`API error: ${resp.status} ${resp.statusText}`);
      // Fallback to mock data if API fails
      if (process.env.NODE_ENV === "development") data = mockTrendsData;
    } else {
      data = await resp.json();
    }
  } catch (err) {
    console.log("Error fetching trends data:", err);
    // Fall back to mock data if fetch fails
    data = mockTrendsData;
  }
  return data;
};

export const getTrendsBySlug = async (slug: string) => {
  let data: TrendItem[] | undefined;
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/mechanisms/trends/${slug}/`,
      { cache: "no-store" }
    );
    if (!resp.ok) {
      console.log(`API error: ${resp.status} ${resp.statusText}`);
      // Fallback to mock data if API fails
      if (process.env.NODE_ENV === "development")
        data = mockTrendsData.filter((item) => item.mechanism_slug === slug);
    } else {
      data = await resp.json();
    }
    console.log("Trend data for mechanism:", data);
  } catch (err) {
    console.log("Error fetching mechanism trends data:", err);
    // Fallback to mock data if fetch fails
    if (process.env.NODE_ENV === "development")
      data = mockTrendsData.filter((item) => item.mechanism_slug === slug);
  }
  return data;
};

export const getMechanisms = async () => {
  let data: Mechanism[] = [];
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/mechanisms`,
      { cache: "no-store" }
    );
    if (!resp.ok) throw new Error(resp.statusText);
    data = await resp.json();
  } catch (err) {
    console.log(err);
  }
  return data;
};

export const getMechanismBySlug = async (slug: string) => {
  let data:
    | (Mechanism & {
        related_experts: Expert[];
        related_builds: Build[];
        related_courses: Course[];
      })
    | undefined;
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/mechanisms/${slug}`,
      { cache: "no-store" }
    );
    if (!resp.ok) throw new Error(resp.statusText);
    data = await resp.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
  return data;
};

export const getExperts = async () => {
  let data: Expert[] = [];

  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/experts`,
      { cache: "no-store" }
    );
    if (!resp.ok) throw new Error(resp.statusText);
    data = await resp.json();
  } catch (err) {
    console.log(err);
  }
  return data;
};

export const getExpertBySlug = async (slug: string) => {
  let data:
    | (Expert & {
        related_mechanisms: Mechanism[];
        related_builds: Build[];
        related_courses: Course[];
      })
    | undefined;
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/experts/${slug}`,
      { cache: "no-store" }
    );
    if (!resp.ok) throw new Error(resp.statusText);
    data = await resp.json();
  } catch (err) {
    console.log(err);
  }
  return data;
};

export const getCourses = async () => {
  let data: Course[] = [];

  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/courses`,
      { cache: "no-store" }
    );
    if (!resp.ok) throw new Error(resp.statusText);
    data = await resp.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
  return data;
};

export const getCourseBySlug = async (slug: string) => {
  let data:
    | (Course & {
        related_mechanisms: Mechanism[];
        related_builds: Build[];
        related_experts: Expert[];
      })
    | undefined;
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/courses/${slug}`,
      { cache: "no-store" }
    );
    if (!resp.ok) throw new Error(resp.statusText);
    data = await resp.json();
  } catch (err) {
    console.log(err);
  }
  return data;
};

export const getBuilds = async () => {
  let data: Build[] = [];
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/builds`,
      { cache: "no-store" }
    );
    if (!resp.ok) throw new Error(resp.statusText);
    data = await resp.json();
  } catch (err) {
    console.log(err);
  }
  return data;
};

export const getBuildBySlug = async (slug: string) => {
  let data:
    | (Build & {
        related_mechanisms: Mechanism[];
        related_experts: Expert[];
        related_courses: Course[];
      })
    | undefined;
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/builds/${slug}`,
      { cache: "no-store" }
    );
    if (!resp.ok) throw new Error(resp.statusText);
    data = await resp.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
  return data;
};

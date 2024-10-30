import { Expert, Mechanism, Course, Build } from "./types";

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
  let data: Mechanism | undefined;
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
  let data: Expert | undefined;
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
  let data: Course | undefined;
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
  let data: Build | undefined;
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

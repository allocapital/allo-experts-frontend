import { Expert, Mechanism } from "./types";

export const getMechanisms = async () => {
  let data: Mechanism[] = [];
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/mechanisms`,
      { next: { revalidate: 1 } }
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
      { next: { revalidate: 0 } }
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
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/experts`
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
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/experts/${slug}`
    );
    if (!resp.ok) throw new Error(resp.statusText);
    data = await resp.json();
  } catch (err) {
    console.log(err);
  }
  return data;
};

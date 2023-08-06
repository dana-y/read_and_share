import useSWR from "swr";
import { KAKAO_API_BASE_URL } from "@/constants/kakao";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

export type Book = {
  title: string;
  authors: string[];
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  salePrice: string;
  status: string;
  thumbnail: string;
  translators: string[];
  url: string;
};

export type Books = {
  documents: Book[];
};
export async function fetchBooks(query: string): Promise<Books> {
  try {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`
    );
    const myInit: RequestInit = {
      method: "GET",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
    };
    const myRequest = new Request(
      `${KAKAO_API_BASE_URL}?query=${query}`,
      myInit
    );

    const response = await fetch(myRequest);
    const data = await response.json();

    return data; // Assuming the response structure matches your Books type
  } catch (error) {
    // Handle errors here, you can log the error or perform other actions
    throw new Error("Failed to fetch books");
  }
}

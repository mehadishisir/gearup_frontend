import { NextResponse } from "next/server";


const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://gear-up-backend-one.vercel.app/api";


export async function POST(request: Request) {
  try {
    const body = await request.json();


    const response = await fetch(
      `${API_URL}/auth/login`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(body),
      }
    );


    const data = await response.json();


    if (!response.ok) {
      return NextResponse.json(
        data,
        {
          status: response.status,
        }
      );
    }



    const nextResponse =
      NextResponse.json(data);



    const setCookie =
      response.headers.get("set-cookie");


    if (setCookie) {
      nextResponse.headers.set(
        "set-cookie",
        setCookie
      );
    }


    return nextResponse;


  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message: "Login failed",
      },
      {
        status: 500,
      }
    );

  }
}
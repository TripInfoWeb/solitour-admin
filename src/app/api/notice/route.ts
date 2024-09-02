import { NextRequest, NextResponse } from "next/server";

/**
 *  공지사항 목록 조회
 */
export async function GET(request: NextRequest) {
  const access_cookie = request.cookies.get("access_token");
  if (!access_cookie) {
    const refresh_cookie = request.cookies.get("refresh_token");
    if (!refresh_cookie) {
      // 리프레시 토큰이 없으므로 요청 중단
      return new NextResponse("Refresh token not found", { status: 403 });
    }
    // 리프레시 토큰으로 재발급 받아 재요청 보내기 위한 응답
    return new NextResponse("Refresh token not found", { status: 401 });
  }

  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1"; 

  // 페이지 번호를 0 기반으로 조정합니다.
  const zeroBasedPage = Number(page) - 1;

  const apiUrl = `${process.env.BACKEND_URL}/api/notice/admin${zeroBasedPage > 0 ? `?page=${zeroBasedPage}` : ""}`;

  // 백엔드 API 호출
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${access_cookie?.name}=${access_cookie?.value}`,
    },
    cache: "no-store",
  });

  return response;
}
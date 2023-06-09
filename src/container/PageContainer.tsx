import Loading from "@/components/Loading";
import { authRouter, redirectDashBoard } from "@/constant/authRouter";
import { infoUser } from "@/pages/api/auth/info";
import { RootState } from "@/store";
import { setUser } from "@/store/users";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
interface PageContainerProps {
  children: React.ReactNode;
}
export default function PageContainer({ children }: PageContainerProps) {
  const isLogin = useSelector((state: RootState) => state.users.isLogin);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = router.pathname;
  const { data } = useQuery<any>(["users"], infoUser);
  useEffect(() => {
    const isLogins =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (isLogins) {
      dispatch(setUser(data));
      if (!isLogins) {
        if (authRouter.some((route) => pathName.startsWith(route))) {
          router.push("/login");
        }
      } else {
        if (redirectDashBoard.indexOf(pathName) !== -1) {
          router.push("/mainboard");
        }
      }
    }
  }, [data, dispatch, isLogin, pathName, router]);
  return (
    <>
      <Head>
        <title>BITSCOPE</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Using AI for Social Listening" />
        <meta name="twitter:title" content="BITSCOPE" key="title" />
        <meta
          name="twitter:description"
          content="Using AI for Social Listening"
          key="description"
        />
        <meta
          property="og:url"
          content="https://bitscope.global/"
          key="ogurl"
        />
        <meta property="og:image" content="/image/400X400-SVG.png" />
        <meta property="og:title" content="BITSCOPE" key="ogtitle" />
        <meta
          property="og:description"
          content="Using AI for Social Listening"
          key="ogdesc"
        />

        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="">
        {!isLogin && authRouter.some((route) => pathName.startsWith(route)) ? (
          <Loading />
        ) : (
          children
        )}
      </main>
    </>
  );
}

import { RouteObject, createHashRouter } from "react-router-dom";
import { LoginPage } from "@/pages/auth/login/LoginPage";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Logout } from "@/pages/auth/logout/Logout";
import { TestComponent } from "@/pages/test-component";
import { RegisterPage } from "@/pages/auth/register/RegisterPage";

const privateRoutes: RouteObject[] = [
  {
    path: "*",
    lazy: async () => {
      let { NotFound } = await import("@/pages/notFound/NotFoundPage");
      return { Component: NotFound };
    },
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    errorElement: <div>error</div>,
    children: [
      {
        path: "/",
        lazy: async () => {
          let { HomePage } = await import(
            "@/pages/dashboard/homePage/HomePage"
          );
          return { Component: HomePage };
        },
      },

      {
        path: "discussion/:id",
        lazy: async () => {
          let { DiscussionPage } = await import(
            "@/pages/discussions/DiscussionPage"
          );
          return { Component: DiscussionPage };
        },
      },

      {
        path: "discussion-group/:id",
        lazy: async () => {
          let { DiscussionGroupPage } = await import(
            "@/pages/discussionGroup/DiscussionGroupPage"
          );
          return { Component: DiscussionGroupPage };
        },
      },
      // {
      //   path: "style-guides",
      //   index: true,
      //   lazy: async () => {
      //     let { StyleGuides } = await import(
      //       "@/pages/styleGuides/StyleGuides.tsx"
      //     );
      //     return { Component: StyleGuides };
      //   },
      // },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/test-component",
    element: <TestComponent />,
  },
];

export const appRouter = () => {
  return createHashRouter(privateRoutes);
};

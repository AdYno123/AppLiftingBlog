import React, { Suspense, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CreateArticle from "./pages/CreateArticle";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminHome from "./pages/AdminHome";
import UpdateArticle from "./pages/UpdateArticle";
import AuthContext from "./constans/auth-context";
import MainLayout from "./components/global/MainLayout";
import ArticleDetail from "./pages/ArticleDetail";

function App() {
  const authContext = useContext(AuthContext);
  return (
    <div className="app">
      <ToastContainer
        theme="colored"
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Suspense>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="Login" element={<Login />} />
            <Route
              path="detailArticle/:articleId"
              element={<ArticleDetail />}
            />
            <Route
              path="homeAdmin"
              element={
                !authContext.isLogged ? <Navigate to="/login" /> : <AdminHome />
              }
            />
            <Route
              path="createArticle"
              element={
                !authContext.isLogged ? (
                  <Navigate to="/login" />
                ) : (
                  <CreateArticle />
                )
              }
            />
            <Route
              path="updateArticle/:articleId"
              element={
                !authContext.isLogged ? (
                  <Navigate to="/login" />
                ) : (
                  <UpdateArticle />
                )
              }
            />
          </Route>
          <Route
            path="*"
            element={
              authContext.isLogged ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

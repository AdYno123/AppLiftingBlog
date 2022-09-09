import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TableRow from "../components/adminHome/TableRow";
import {
  GET_HTTP_REQUEST,
  GET_HTTP_REQUEST_DELETE,
} from "../constans/api-service";
import AuthContext from "../constans/auth-context";
import { IArticles } from "../constans/stored-interface";

const AdminHome = () => {
  const [articles, setArticles] = useState<IArticles>();
  const authContext = useContext(AuthContext);
  const history = useNavigate();

  /**
   * Reload data about articles
   */
  const refreshArticles = () => {
    const articlesResponse = GET_HTTP_REQUEST<IArticles>("articles");
    articlesResponse.then((repsonseData) => {
      if (repsonseData.success) {
        if (repsonseData.data !== null) {
          setArticles(repsonseData.data);
        }
      }
    });
  };
  useEffect(() => {
    refreshArticles();
  }, [authContext.isLogged]);

  const deleteArticle = (articleId: string | undefined) => {
    const articlesResponse = GET_HTTP_REQUEST_DELETE<string>(
      `articles/${articleId}`
    );
    articlesResponse.then((repsonseData) => {
      if (repsonseData.success) {
        if (repsonseData.data !== null) {
          toast.success("Successfuly deleted");
          refreshArticles();
        }
      }
    });
  };

  /**
   * go to update article page
   * @param articleId
   */
  const updateArticle = (articleId: string | undefined) => {
    history(`/updateArticle/${articleId}`);
  };
  return (
    <div className="container mx-auto">
      <section className="my-10 flex">
        <h1 className="text-4xl font-semibold">My articles</h1>
        <button
          className="bg-blue-500 px-3 mx-10 rounded text-white"
          onClick={() => history("/createArticle")}
        >
          Create New Article
        </button>
      </section>
      <section className="mt-5">
        <table className="table-fixed w-full">
          <thead>
            <tr>
              <th className="text-left">Article title</th>
              <th className="text-left">Perex</th>
              <th className="text-left">Author</th>
              <th className="text-left"># of comments</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles?.items.map((row) => (
              <TableRow
                key={row.articleId}
                article={row}
                deleteArticle={deleteArticle}
                updateArticle={updateArticle}
              />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminHome;

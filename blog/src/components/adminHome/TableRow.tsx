import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../constans/auth-context";
import { IArtcilesItems } from "../../constans/stored-interface";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { GET_HTTP_REQUEST } from "../../constans/api-service";
import { NavLink } from "react-router-dom";

interface IProps {
  article: IArtcilesItems;
  updateArticle: (articleId: string | undefined) => void;
  deleteArticle: (articleId: string | undefined) => void;
}
const TableRow: React.FC<IProps> = (props) => {
  const authContext = useContext(AuthContext);
  const [commentLength, setCommentLength] = useState<number>(0);
  /**get articles comment length*/
  useEffect(() => {
    const articlesResponse = GET_HTTP_REQUEST<IArtcilesItems>(
      `articles/${props.article.articleId}`
    );
    articlesResponse.then((repsonseData) => {
      if (repsonseData.success) {
        if (repsonseData.data !== null) {
          setCommentLength(repsonseData.data.comments!.length);
        }
      }
    });
  }, [authContext.isLogged]);
  return (
    <tr className="border-t text-xl">
      <td className="py-2">
        <NavLink to={"/detailArticle/" + props.article.articleId}>
          {props.article.title}
        </NavLink>
      </td>
      <td>{props.article.perex}</td>
      <td>{authContext.userInfo.name}</td>
      <td>{commentLength}</td>
      <td>
        <div className="flex">
          <button
            className="mx-2"
            onClick={() => props.updateArticle(props.article.articleId)}
          >
            <FaPen />
          </button>
          <button
            className="mx-2"
            onClick={() => props.deleteArticle(props.article.articleId)}
          >
            <FaTrashAlt />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;

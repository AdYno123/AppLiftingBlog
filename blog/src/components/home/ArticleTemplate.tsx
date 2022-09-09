import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../constans/auth-context";
import { IArtcilesItems } from "../../constans/stored-interface";
import { GET_HTTP_REQUEST } from "../../constans/api-service";
import { NavLink } from "react-router-dom";
import moment from "moment";
import cat from "../../images/cat.jpg";

interface IProps {
  article: IArtcilesItems;
}
const ArticleTemplate: React.FC<IProps> = (props) => {
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
    <>
      <div className="card-img mr-8">
        <img src={cat} alt="cat" className="object-cover h-64 w-64" />
      </div>
      <div className="card-content">
        <h2 className="text-2xl font-medium">
          <NavLink to={"/detailArticle/" + props.article.articleId}>
            {props.article.title}
          </NavLink>
        </h2>

        <div className="card-about flex my-5 text-stone-500">
          <p className="card-authorName">Elisabeth Strain</p>
          <p className="mx-3">•</p>
          <p className="card-date">
            {moment(props.article.createdAt).format("L")}
          </p>
        </div>

        <p>{props.article.perex}</p>
        <div className="flex mt-5 ml-3">
          <p className="text-blue-400 font-medium">
            <NavLink to={"/detailArticle/" + props.article.articleId}>
              Read whole article
            </NavLink>
          </p>
          <p className="mx-5 text-stone-500">{commentLength} comments</p>
        </div>
      </div>
    </>
  );
};

export default ArticleTemplate;

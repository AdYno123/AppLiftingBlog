import moment from "moment";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_HTTP_REQUEST, POST_HTTP_REQUEST } from "../constans/api-service";
import AuthContext from "../constans/auth-context";
import cat from "../images/cat.jpg";
import {
  IArtcilesItems,
  IArticles,
  IComment,
} from "../constans/stored-interface";
import user from "../images/user.png";
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown } from "react-icons/fa";
import MDEditor from "@uiw/react-md-editor";

type ParamTypes = {
  articleId: string;
};
const ArticleDetail = () => {
  const [article, setArticle] = useState<IArtcilesItems>({
    articleId: "",
    title: "",
    perex: "",
    imageId: "",
    createdAt: "",
    lastUpdatedAt: "",
    comments: [],
    content: "",
  });
  const [relatedArticles, setRelatedArticles] = useState<IArticles>();
  const [newComment, setNewComment] = useState<string>("");

  const authContext = useContext(AuthContext);

  const { articleId } = useParams<ParamTypes>();

  useEffect(() => {
    const articlesResponse = GET_HTTP_REQUEST<IArticles>("articles");
    articlesResponse.then((repsonseData) => {
      if (repsonseData.success) {
        if (repsonseData.data !== null) {
          setRelatedArticles(repsonseData.data);
        }
      }
    });
    if (articleId !== undefined) {
      LoadArticleData(articleId);
    }
  }, [authContext.isLogged, articleId]);

  /** load data from server */
  const LoadArticleData = (articleId: string) => {
    const articlesResponse = GET_HTTP_REQUEST<IArtcilesItems>(
      `articles/${articleId}`
    );
    articlesResponse.then((repsonseData) => {
      if (repsonseData.success) {
        if (repsonseData.data !== null && repsonseData.data !== undefined) {
          setArticle(repsonseData.data);
        }
      }
    });
  };

  /**
   * add new comment
   * @param event
   */
  const handleSubmitComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let newCommentObj: IComment = {
      articleId: article.articleId!,
      author: authContext.userInfo.name,
      content: newComment,
    };
    const commentResponse = POST_HTTP_REQUEST<IComment>(
      "comments",
      newCommentObj
    );
    commentResponse.then((repsonseData) => {
      if (repsonseData.success) {
        if (repsonseData.data !== null) {
          toast.success("New Comment was add.");
          setNewComment("");
          LoadArticleData(articleId!);
        } else {
          toast.error("new comment could not be added");
        }
      } else {
        if (repsonseData.message.includes("400")) {
          toast.error("You must log in to comment.");
        } else {
          toast.error(repsonseData.message);
        }
      }
    });
  };

  /**
   * like on comment
   * @param commentId
   */
  const upVoteComment = (commentId: string) => {
    const upComment = POST_HTTP_REQUEST<string>(
      `comments/${commentId}/vote/up`,
      commentId
    );
    upComment.then((repsonseData) => {
      if (repsonseData.success) {
        if (repsonseData.data !== null && repsonseData.data !== undefined) {
          toast.success("You liked the comment.");
          LoadArticleData(articleId!);
        }
      }
    });
  };

  /**
   * dislike on comment
   * @param commentId
   */
  const downVoteComment = (commentId: string) => {
    const upComment = POST_HTTP_REQUEST<string>(
      `comments/${commentId}/vote/down`,
      commentId
    );
    upComment.then((repsonseData) => {
      if (repsonseData.success) {
        if (repsonseData.data !== null && repsonseData.data !== undefined) {
          toast.success("You didn't like the comment");
          LoadArticleData(articleId!);
        }
      }
    });
  };

  return (
    <section className="container mx-auto py-16">
      <div className="flex">
        <main className="w-full p-2 pr-5" data-color-mode="light">
          <h2 className="text-4xl font-medium">{article.title}</h2>
          <div className="card-about flex my-5 text-stone-500">
            <p className="card-authorName">Elisabeth Strain</p>
            <p className="mx-3">•</p>
            <p className="card-date">{moment(article.createdAt).format("L")}</p>
          </div>
          <img src={cat} alt="cat" className="object-cover w-full mb-8" />
          <MDEditor.Markdown
            className="text-xl"
            source={article.content}
            style={{ whiteSpace: "pre-wrap" }}
          />
          <section className="border-t mt-10 pt-5">
            <h2 className="text-2xl font-medium">
              Comments {"(" + article.comments?.length + ")"}
            </h2>
            <div className="flex mt-5">
              <img src={user} alt="user" className="h-10 aspect-square" />
              <form className="ml-5 w-full" onSubmit={handleSubmitComment}>
                <input
                  className="border rounded px-3 py-2 w-full text-xl"
                  type="text"
                  value={newComment}
                  placeholder="Join the discussion"
                  onChange={(event) => setNewComment(event.target.value)}
                />
              </form>
            </div>
            {article.comments?.map((comment) => (
              <div key={comment.commentId} className="mt-4 flex">
                <img src={user} alt="user" className="h-10 aspect-square" />
                <div className="ml-5">
                  <div className="flex">
                    <p className="font-medium">{comment.author}</p>
                    <p className="mx-2 text-sm mt-0.5 text-gray-500">
                      {moment().from(comment.postedAt)}
                    </p>
                  </div>
                  <div>{comment.content}</div>
                  <div className="flex">
                    <p className="pr-2 font-medium">+{comment.score}</p>
                    <button
                      className="px-3 border-x"
                      onClick={() => upVoteComment(comment.commentId!)}
                    >
                      <FaRegArrowAltCircleUp />
                    </button>
                    <button
                      className="px-3 border-r"
                      onClick={() => downVoteComment(comment.commentId!)}
                    >
                      <FaRegArrowAltCircleDown />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </main>
        <aside className="h-screen w-80 sticky top-0">
          <section className="border-l mt-5 pb-10 pl-5">
            <h2 className="mb-8 text-2xl font-semibold">Related articles</h2>
            {relatedArticles?.items.map((row) => (
              <article className="my-4" key={row.articleId}>
                <p className="font-semibold">
                  <NavLink to={"/detailArticle/" + row.articleId}>
                    {row.title}
                  </NavLink>
                </p>
                <p className="">{row.perex}</p>
              </article>
            ))}
          </section>
        </aside>
      </div>
    </section>
  );
};

export default ArticleDetail;

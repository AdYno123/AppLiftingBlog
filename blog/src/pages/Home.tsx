import React, { Fragment, useEffect, useState } from "react";
import { GET_HTTP_REQUEST } from "../constans/api-service";
import { IArticles } from "../constans/stored-interface";
import ArticleTemplate from "../components/home/ArticleTemplate";

const Home = () => {
  const [articles, setArticles] = useState<IArticles>();

  //load all articles
  useEffect(() => {
    const articlesResponse = GET_HTTP_REQUEST<IArticles>("articles");
    articlesResponse.then((repsonseData) => {
      if (repsonseData.success) {
        if (repsonseData.data !== null) {
          setArticles(repsonseData.data);
        }
      }
    });
  }, []);

  return (
    <Fragment>
      <section className="container mx-auto">
        <header className=" my-16">
          <h1 className="text-4xl font-medium">Recent articles</h1>
        </header>
        <section>
          {articles?.items.map((row) => (
            <div className="flex mt-10" key={row.articleId}>
              <ArticleTemplate article={row} />
            </div>
          ))}
        </section>
      </section>
    </Fragment>
  );
};

export default Home;

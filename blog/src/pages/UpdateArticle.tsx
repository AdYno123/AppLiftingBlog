import React from "react";
import { useParams } from "react-router-dom";
import AritcleForm from "../components/global/AritcleForm";
import { EarticleFormIsOn } from "../constans/stored-interface";

type ParamTypes = {
  articleId: string;
};
const UpdateArticle = () => {
  const { articleId } = useParams<ParamTypes>();
  return (
    <div className="container mx-auto">
      <section>
        <AritcleForm FormType={EarticleFormIsOn.Edit} articleId={articleId} />
      </section>
    </div>
  );
};

export default UpdateArticle;

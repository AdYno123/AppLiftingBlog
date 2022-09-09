import React from "react";
import AritcleForm from "../components/global/AritcleForm";
import { EarticleFormIsOn } from "../constans/stored-interface";

const CreateArticle = () => {
  return (
    <div className="container mx-auto">
      <section>
        <AritcleForm FormType={EarticleFormIsOn.NewArticle} />
      </section>
    </div>
  );
};

export default CreateArticle;

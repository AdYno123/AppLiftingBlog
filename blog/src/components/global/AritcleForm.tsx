import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import {
  GET_HTTP_REQUEST,
  POST_HTTP_REQUEST,
  POST_HTTP_REQUEST_PATCH,
} from "../../constans/api-service";
import AuthContext from "../../constans/auth-context";
import {
  EarticleFormIsOn,
  IArtcilesItems,
  IImageSend,
  IImageSendArray,
} from "../../constans/stored-interface";
import cat from "../../images/cat.jpg";

interface IProps {
  FormType: EarticleFormIsOn;
  articleId?: string;
}

const AritcleForm: React.FC<IProps> = (props) => {
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const inputFile = useRef<HTMLInputElement>(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (props.FormType === EarticleFormIsOn.Edit) {
      if (props.articleId !== undefined) {
        let articleId = props.articleId;
        const articlesResponse = GET_HTTP_REQUEST<IArtcilesItems>(
          `articles/${articleId}`
        );
        articlesResponse.then((repsonseData) => {
          if (repsonseData.success) {
            if (repsonseData.data !== null && repsonseData.data !== undefined) {
              setTitle(repsonseData.data.title);
              repsonseData.data.imageId && setImage(repsonseData.data.imageId);
              repsonseData.data.content &&
                setContent(repsonseData.data.content);
            }
          }
        });
      }
    }
  }, [authContext.isLogged]);

  /**
   * Write new article to db
   */
  const writeNewArticle = () => {
    let newArticle: IArtcilesItems = {
      title: title,
      perex: content.substring(0, 50) + "...",
      content: content,
    };
    const articlesResponse = POST_HTTP_REQUEST<IArtcilesItems>(
      "articles",
      newArticle
    );
    articlesResponse.then((repsonseData) => {
      if (repsonseData.success) {
        if (repsonseData.data !== null) {
          toast.success("New Article was add.");
          clearInputs();
        }
      }
    });
  };

  /**
   * Send update article
   */
  const writeUpdateArticle = () => {
    if (props.articleId !== undefined) {
      let articleId = props.articleId;
      let updateArticle: IArtcilesItems = {
        title: title,
        perex: content.substring(0, 50) + "...",
        content: content,
      };
      const articlesResponse = POST_HTTP_REQUEST_PATCH<IArtcilesItems>(
        `articles/${articleId}`,
        updateArticle
      );
      articlesResponse.then((repsonseData) => {
        if (repsonseData.success) {
          if (repsonseData.data !== null) {
            toast.success("Updated article.");
          }
        }
      });
    }
  };
  /**
   * Procedure for write new or update Article
   * @param event
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (props.FormType === EarticleFormIsOn.NewArticle) {
      /*run if is new article*/
      writeNewArticle();
    } else if (props.FormType === EarticleFormIsOn.Edit) {
      /*run if in edit Article */
      writeUpdateArticle();
    }
  };

  /**Clear Inputs */
  const clearInputs = () => {
    setTitle("");
    setImage("");
    setContent("");
  };

  /**function on userRef from button to input type File */
  const handleClick = () => {
    if (inputFile.current !== null && inputFile.current !== undefined) {
      inputFile.current.click();
    }
  };
  const convertBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  /**
   * function on setup Image
   * - nefunguje , ani na nič dostať code 201 vždy dostanem 200
   * @param event
   * @returns
   */
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    const imageBase64 = await convertBase64(fileObj);
    let formats =
      "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAHCAqMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDzeirFFf2lGNz+fm7DfLp1O8unVPNcZHTvLp1O8up5gIad5dSeXTqkzI6kop3l0AR+XUnl1J5dHl0AR+XR5dWvI/2v0o8j/a/SgCr5dHl1a8j/AGv0o8j/AGv0oAjqTyP9r9Kd5dNquUA8j/a/S…";

    let arrItems: IImageSendArray = {
      type: "image/jpeg",
      format: formats, // alebo imageBase64
    };
    let imageArr: IImageSend[] = [{ image: arrItems }];
    try {
      console.log(imageArr);
      const response = await axios({
        method: "post",
        url: "https://fullstack.exercise.applifting.cz/images",
        data: imageArr,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-KEY": `b7526ea2-4ec8-4612-88d9-77e6613248bb`,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => {
        console.log(response.data);
      });
    } catch (error) {
      let er = error as Error;
      toast.error("Error: " + er);
    }
  };

  return (
    <Fragment>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="my-10 flex">
            <h1 className="text-4xl font-semibold">
              {props.FormType === EarticleFormIsOn.NewArticle
                ? "Create new article"
                : "Edit Article"}
            </h1>
            <input
              type="submit"
              value="Publish Article"
              className="bg-blue-500 px-3 mx-10 rounded text-white"
            />
          </div>
          <div className="row-input mt-5">
            <label className="font-semibold">Article Title</label>
            <div className="input-holder mt-2">
              <input
                required
                className="border rounded px-3 py-2 w-full text-xl"
                type="text"
                value={title}
                placeholder="My First Article"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="row-input mt-8">
            <label className="font-semibold">Featured image</label>
            {props.FormType === EarticleFormIsOn.Edit ? (
              <>
                <img src={cat} className="w-28" />
                <input
                  style={{ display: "none" }}
                  ref={inputFile}
                  value={image}
                  type="file"
                  onChange={handleFileChange}
                />
                <div className="flex">
                  <p
                    className=" text-blue-400 py-2 pr-3  border-r"
                    onClick={handleClick}
                  >
                    Upload an Image
                  </p>

                  <p className="text-red-400 p-2 px-3">Delete</p>
                </div>
              </>
            ) : (
              <>
                <div className="input-holder mt-2">
                  <input
                    style={{ display: "none" }}
                    ref={inputFile}
                    value={image}
                    type="file"
                    onChange={handleFileChange}
                  />

                  <button
                    className=" bg-gray-500 p-2 px-3 rounded text-white"
                    onClick={handleClick}
                  >
                    Upload an Image
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="row-input mt-8">
            <label className="font-semibold">Content</label>

            <div className="input-holder mt-2">
              <div className="container" data-color-mode="light">
                <MDEditor
                  value={content}
                  className="border rounded p-2 px-4 text-xl w-full "
                  onChange={(event) => setContent(event!)}
                />
              </div>
              {/* <textarea
                required
                value={content}
                className="border rounded p-2 px-4 text-xl w-full "
                rows={40}
                placeholder="Supports markdown. Yay!"
                onChange={(event) => setContent(event.target.value)}
              /> */}
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AritcleForm;

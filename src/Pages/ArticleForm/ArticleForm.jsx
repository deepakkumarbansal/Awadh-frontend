import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { catagories } from "../../utility/categories";
import { useNavigate } from "react-router-dom";
import { Input } from "../../Components";
import ReactSelect from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  createArticleAction,
  fetchAllAdminNewsAction,
  updateArticleAction,
} from "../../store/slice/adminSlice";
import { fetchRepoterArticlesAction } from "../../store/slice/newsSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateArticleStatusById } from "../../Services/Operations/admin";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const ArticleForm = ({
  article,
  handleMenuItemClick,
  setIsEditingDisabled,
}) => {
  const fonts = ["sans-serif", "serif", "monospace", "Mukta"];
  const Font = ReactQuill.Quill.import("formats/font");
  Font.whitelist = fonts; // Allow these fonts in the dropdown
  ReactQuill.Quill.register(Font, true);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);
  const { user: reporterId, role } = userData;
  const s3Config = {
    bucketName: "awadh-kesari",
    dirName: "articles",
    region: "us-east-1",
    accessKeyId: "AKIA5FTZBWWZFJ5J72ZU",
    secretAccessKey: "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",
  };

  const updatedCategories = catagories.map((category) => ({
    value: category,
    label: category,
  }));
  const toolbarOptions = [
    [{ font: fonts }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  const modules = {
    toolbar: toolbarOptions,
  };

  useEffect(() => {
    console.log("art", article);
  }, [article]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'white',
      borderColor: state.isFocused ? '#16a349' : '#16a349',
      borderWidth:'2px',
      height: '3.5rem',
      fontWeight: '600',
      fontSize: '1.25rem',
      boxShadow: state.isFocused ? '0 0 0 1px #16a349' : null,
      '&:hover': {
        borderColor: '#16a349',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#16a349' : 'white',
      '&:hover': {
        backgroundColor: '#ef5b0c',
      },
      fontSize: '1.25rem',
      fontWeight: '800',
      color: state.isSelected ? 'black' : 'black',
    }),
    menu: (provided) => ({
      ...provided,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'gray',
    }),
  };

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      title: article?.title || "",
      subheading: article?.subheading || "",
      category: article?.category || "",
      content: article?.content || "",
      images: (article?.images && article?.images[0]) || null,
    },
  });
  const submit = async (data) => {
    if (role === "user") {
      setMessage("User is not allowed to create a post");
      setTimeout(() => {
        navigate("/");
      }, 10000);
    } else {
      if (article) {
        const articleId = article._id;
        const bodyData = {
          reporterId,
          articleId,
          ...data,
          category: getValues("category").value,
        };
        // const imageURL = '';
        dispatch(updateArticleAction(bodyData))
          .unwrap()
          .then(() => {
            toast.success("Updated Article Successfully");
            if(role === 'reporter') {
              updateArticleStatusById(articleId, 'draft')
              .then(()=>{
                dispatch(fetchRepoterArticlesAction(reporterId));
              })
              .catch((error)=>{
                throw error;
              })
             } else dispatch(fetchAllAdminNewsAction(10, 1));
            setTimeout(() => {
              role === "reporter"
                ? handleMenuItemClick("My Articles")
                : handleMenuItemClick("Articles");
              setIsEditingDisabled(true);
            }, 2000);
          })
          .catch((e) => {
            toast.error("Failed to update the article!");
            setTimeout(() => {
              role === "reporter"
                ? handleMenuItemClick("My Articles")
                : handleMenuItemClick("Articles");
              setIsEditingDisabled(true);
            }, 4000);
          });
      } else {
        const bodyData = {
          reporterId,
          ...data,
          category: getValues("category").value,
        };
        const file = ""; //some service of aws
        // if(file){
        dispatch(createArticleAction(bodyData))
          .unwrap()
          .then(() => {
            toast.success("Updated Article Successfully");
            role === 'reporter' ? dispatch(fetchRepoterArticlesAction(reporterId)) : dispatch(fetchAllAdminNewsAction(10, 1));
            setTimeout(() => {
              role === "reporter"
                ? handleMenuItemClick("My Articles")
                : handleMenuItemClick("Articles");
              setIsEditingDisabled(true);
            }, 2000);
          })
          .catch((e) => {
            toast.error("Failed to create the article!");
            setTimeout(() => {
              role === "reporter"
                ? handleMenuItemClick("My Articles")
                : handleMenuItemClick("Articles");
              setIsEditingDisabled(true);
            }, 4000);
          });
      }
    }
  };
  const [error, setError] = useState("");
  const [isSubmitPending, setIsSubmitPending] = useState(false);
  const navigate = useNavigate();

  const [postImageUrl, setPostImageUrl] = useState("");

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    try {
      const s3Client = new S3Client({
        region: s3Config.region,
        credentials: {
          accessKeyId: s3Config.accessKeyId,
          secretAccessKey: s3Config.secretAccessKey,
        },
      });
      
      const params = {
        Bucket: s3Config.bucketName,
        Key: `${file.name}`,
        Body: file,
        ContentType: file.type,
      };
      const command = new PutObjectCommand(params);
      const url = await getSignedUrl(s3Client, command, { expiresIn: 5000 });
      console.log("Uploaded successfully:", url);
      setPostImageUrl(url);
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="items-center w-full">
          <Input
            name="title"
            placeholder="शीर्षक" // Hindi placeholder for "Heading"
            register={register}
            className="w-1/2"
            errors={errors}
            value={getValues("title")}
          />
          {/* Post image */}
          <p>{article?.featuredImage ? "Change " : ""}Post image:</p>
          <div className="flex items-center flex-col">
            <div
              className={`w-[450px] h-[210px] border-2 border-gray-500 rounded bg-white relative p-4 ${
                postImageUrl ? "hidden" : ""
              }`}
            >
              <input
                type="file"
                {...register("featuredImage", {
                  required: article?.featuredImage
                    ? false
                    : // : "Post images are required",
                      false,
                })}
                id="upload-image"
                accept="image/jpg, image/png, image/gif"
                onChange={(e) => {
                  uploadImage(e);
                }}
                className="absolute z-[-1]"
              />
              <label
                className="border-2 h-full border-gray-400 rounded border-dashed w-full block bg-gray-100 cursor-pointer"
                htmlFor="upload-image"
              >
                <img
                  src={"/images/defaultPostImage.png"}
                  alt="Post Image"
                  width={"100px"}
                  className="ml-[35%] mt-2"
                />
                <p className="text-xl text-center text-gray-700 font-bold">
                  Drag and drop or click here <br />{" "}
                  <span className="text-gray-400 text-lg font-normal">
                    to upload image
                  </span>
                </p>
              </label>
            </div>
            {errors.featuredImage && (
              <p className="text-red-500">{errors.featuredImage.message}</p>
            )}
            {postImageUrl && (
              <>
                <img
                  src={postImageUrl}
                  alt=""
                  className="w-[450px] h-[200px]"
                />
                <label
                  htmlFor="upload-image"
                  className="border-2 px-2 py-1 mt-2 bg-gray-600 text-gray-50 font-bold"
                >
                  Change Image
                </label>
              </>
            )}
          </div>
          <div>
            <Input
              name="subheading"
              placeholder="उपशीर्षक" // Hindi placeholder for "Subheading"
              register={register}
              className="w-1/2"
              errors={errors}
              value={getValues("subheading")}
            />
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <ReactSelect
                  {...field}
                  options={updatedCategories}
                  placeholder="श्रेणी चुनें" // Hindi placeholder for "Select Category"
                  isClearable
                  isSearchable
                  styles={customStyles}
                  defaultInputValue={getValues("category")}
                />
              )}
              rules={{ required: "Please select the Category" }}
            />
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>
        </div>
        <p className="text-red-600">{error}</p>
        <div>
          <p className="text-start mt-5">सामग्री:</p> {/* Hindi for "Content" */}
          {/* <div className="min-h-[50vh]"> */}
          <ReactQuill
            theme="snow"
            modules={modules}
            value={getValues("content")}
            onChange={(value) => {
              setValue("content", value);
            }}
            style={{height: '70vh'}}
          />
          {/* </div> */}
        </div>
        <button
          className=" w-full mt-[100px] border-2 shadow-md font-bold px-4 py-2 bg-green-600 rounded-md hover:bg-orange-600"
          type="submit"
          // isSubmitPending={isSubmitPending}
        >
          {article ? "अद्यतन करें" : "प्रस्तुत करें"}
        </button>{" "}
        {/* Hindi for "Update" or "Submit" */}
      </form>
    </>
  );
};

export default ArticleForm;

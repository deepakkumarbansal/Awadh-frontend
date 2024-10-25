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
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { envConfig } from "../../config/envConfig";

const { awsBucketName, awsDirectoryName, awsRegion, awsAccessId, awsSecretKey } = envConfig;

const ArticleForm = ({ article, handleMenuItemClick, setIsEditingDisabled=()=>{} }) => {
  const fonts = ["sans-serif", "serif", "monospace", "Mukta"];
  const Font = ReactQuill.Quill.import("formats/font");
  Font.whitelist = fonts;
  ReactQuill.Quill.register(Font, true);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);
  const { user: reporterId, role } = userData;

  const s3Config = {
    bucketName: awsBucketName,
    dirName: awsDirectoryName,
    region: awsRegion,
    accessKeyId: awsAccessId,
    secretAccessKey: awsSecretKey,
  };

  const updatedCategories = catagories.map((category) => ({
    value: category,
    label: category,
  }));

  const toolbarOptions = [
    [{ font: fonts }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
      borderColor: state.isFocused ? "#16a349" : "#16a349",
      borderWidth: "2px",
      height: "3.5rem",
      fontWeight: "600",
      fontSize: "1.25rem",
      boxShadow: state.isFocused ? "0 0 0 1px #16a349" : null,
      "&:hover": {
        borderColor: "#16a349",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#16a349" : "white",
      "&:hover": {
        backgroundColor: "#ef5b0c",
      },
      fontSize: "1.25rem",
      fontWeight: "800",
      color: state.isSelected ? "black" : "black",
    }),
    menu: (provided) => ({
      ...provided,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "gray",
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
      images: article?.images || null,
    },
  });

  const [postImageUrl, setPostImageUrl] = useState("");
  const [imageUploadLoader, setImageUploadLoader] = useState(false);

  useEffect(() => {
    setPostImageUrl(article?.images?.[0]);
  }, [article]);

  const submit = async (data) => {
    if (role === "user") {
      toast.error("User is not allowed to create a post");
      setTimeout(() => {
        navigate("/");
      }, 10000);
    } else {
      const imageURL = postImageUrl;
      const bodyData = {
        reporterId,
        ...data,
        category: getValues("category").value,
        images: [imageURL],
        status: role === "admin" ? "accepted" : "draft",
      };

      try {
        if (article) {
          bodyData.articleId = article._id;
          await dispatch(updateArticleAction(bodyData)).unwrap();
          toast.success("Updated Article Successfully");
        } else {
          await dispatch(createArticleAction(bodyData)).unwrap();
          toast.success("Created Article Successfully");
        }
        role === "reporter"
          ? dispatch(fetchRepoterArticlesAction(reporterId))
          : dispatch(fetchAllAdminNewsAction(10, 1));

        setTimeout(() => {
          handleMenuItemClick(role === "reporter" ? "My Articles" : "Articles");
          setIsEditingDisabled(true);
        }, 2000);
      } catch (e) {
        toast.error("Failed to save the article!");
        setTimeout(() => {
          handleMenuItemClick(role === "reporter" ? "My Articles" : "Articles");
          setIsEditingDisabled(true);
        }, 4000);
      }
    }
  };

  const uploadImage = async (e) => {
    setImageUploadLoader(true);

    const file = e.target.files[0];
    try {
      const s3Client = new S3Client({
        region: s3Config.region,
        credentials: {
          accessKeyId: s3Config.accessKeyId,
          secretAccessKey: s3Config.secretAccessKey,
        },
      });
      const timeStamp = Date.now();
      const key = `${s3Config.dirName}/${timeStamp}`;
      const params = {
        Bucket: s3Config.bucketName,
        Key: key,
        Body: file,
        ContentType: file.type,
      };
      const command = new PutObjectCommand(params);
      await s3Client.send(command);

      setPostImageUrl(`https://${s3Config.bucketName}.s3.${s3Config.region}.amazonaws.com/${key}`);
    } catch (err) {
      console.error("Error uploading file:", err);
    } finally {
      setImageUploadLoader(false);
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
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap bg-white shadow-lg rounded-lg p-6 border-2 min-h-screen border-gray-200">
        <h2 className="text-2xl font-bold mb-4">{article ? "Update Article" : "Create Article"}</h2>
        <div className="flex flex-col w-full mb-4">
          <Input
            name="title"
            placeholder="Title"
            register={register}
            className="w-full mb-4"
            errors={errors}
            value={getValues("title")}
          />
          <label htmlFor="upload-image" className="mb-2 text-lg font-semibold">Post Image:</label>
          <div className="flex flex-col items-center mb-4">
            {imageUploadLoader ? (
              <div className="w-12 max-w-xs h-12 border-4 border-dashed rounded-full border-blue-500 animate-spin"></div>
            ) : (
              <>
                <div
                  className={`w-full h-[150px] md:w-[450px] md:h-[210px] border-2 border-green-500 rounded bg-white relative p-4 ${
                    postImageUrl ? "hidden" : ""
                  }`}
                >
                  <input
                    type="file"
                    {...register("images", {
                      required: postImageUrl
                        ? false
                        : "Post images are required",
                    })}
                    id="upload-image"
                    accept="image/jpg, image/png, image/gif"
                    onChange={(e) => {
                      uploadImage(e);
                    }}
                    className="absolute z-[-1]"
                  />
                  <label
                    className="border-2 h-full border-green-400 rounded border-dashed w-full block bg-gray-100 cursor-pointer"
                    htmlFor="upload-image"
                  >
                    <img
                      src={"/images/defaultPostImage.png"}
                      alt="Post Image"
                      className="w-[50px] md:w-[100px] m-auto mt-2"
                    />
                    <p className="text-sm md:text-xl text-center text-gray-700 font-bold">
                      Drag and drop or click here <br />{" "}
                      <span className="text-gray-400 text-xs md:text-lg font-normal">
                        to upload image
                      </span>
                    </p>
                  </label>
                </div>
                {errors.images && (
                  <p className="text-red-500">{errors.images.message}</p>
                )}
                {postImageUrl && (
                  <>
                    <img
                      src={postImageUrl}
                      alt=""
                      className="max-w-[95%] max-h-[90vh] object-contain object-center"
                      
                    />
                    <label
                      htmlFor="upload-image"
                      className="border-2 px-2 py-1 mt-2 bg-gray-600 text-gray-50 font-bold"
                    >
                      Change Image
                    </label>
                  </>
                )}
              </>
            )}
          </div>
          <Input
            name="subheading"
            placeholder="Subheading"
            register={register}
            className="w-full mb-4"
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
                placeholder="Select Category"
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
        <label className="text-lg font-semibold mb-2">Content:</label>
        <div className="max-w-[100%] overflow-hidden border-[2px] border-green-600">
          <ReactQuill
            theme="snow"
            modules={modules}
            value={getValues("content")}
            onChange={(value) => {
              setValue("content", value);
            }}
            style={{ height: "70vh", width: "100%", border: "none" }}
          />
        </div>
        <button
          className="mt-2 w-full border-2 shadow-md font-bold px-4 py-2 bg-green-600 text-white rounded-md hover:bg-orange-600 duration-200"
          type="submit"
        >
          {article ? "Update" : "Submit"}
        </button>
      </form>
    </>
  );
};

export default ArticleForm;

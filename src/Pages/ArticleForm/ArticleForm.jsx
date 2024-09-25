import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { catagories } from "../../utility/categories";
import { useNavigate } from "react-router-dom";
import { Input } from "../../Components";
import ReactSelect from "react-select";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const ArticleForm = ({ article }) => {
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
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  const modules = {
    toolbar: toolbarOptions,
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
      category: article?.category || "अन्य",
      content: article?.content || "",
      images: article?.images[0] || null,
    },
  });
  const [error, setError] = useState("");
  const [isSubmitPending, setIsSubmitPending] = useState(false);
  const navigate = useNavigate();

  const [postImageUrl, setPostImageUrl] = useState("");

  const createORUpdateArticle = () => {
    setError("");
  };

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
        Key: `articles/${file.name}`,
        Body: file,
        ContentType: file.type,
      };
      const command = new PutObjectCommand(params);
      const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
      console.log("Uploaded successfully:", url);
      setPostImageUrl(url);
    } catch (err) {
      console.error("Error uploading file:", err);

    }
  };

  return (
    <div className="p-2">
      <div className="items-center w-full">
        <Input
          name="title"
          placeholder="Heading"
          register={register}
          className="w-1/2"
          errors={errors}
          value={getValues("title")}
        />
        {/* Post image */}
        <p>{article?.featuredImage ? "Change " : ""}Post image:</p>
        <div className="flex items-center flex-col">
          <div
            className={`w-[450px] h-[200px] border-2 border-gray-500 rounded bg-white relative p-4 ${
              postImageUrl ? "hidden" : ""
            }`}
          >
            <input
              type="file"
              {...register("featuredImage", {
                required: article?.featuredImage
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
              className="border-2 h-full border-gray-400 rounded border-dashed w-full block bg-gray-100 cursor-pointer"
              htmlFor="upload-image"
            >
              <img
                src={"/images/defaultPostImage.png"}
                alt="Post Image"
                width={"100px"}
                className="ml-[35%]"
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
              <img src={postImageUrl} alt="" className="w-[450px] h-[200px]" />
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
            placeholder="Subheading"
            value={""}
            onChange={() => {}}
            register={register}
            className="w-[360px]"
            errors={errors}
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
                // styles={customStyles}
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
        <p className="text-start">Content:</p>
        <div className="min-h-[50vh]">
          <ReactQuill
            theme="snow"
            modules={modules}
            value={getValues("content")}
            onChange={setValue}
            style={{height: '100%'}}
          />
        </div>
      </div>

      <button
        className="w-fit"
        isSubmitPending={isSubmitPending}
        value={article ? "Update" : "Submit"}
        onClick={handleSubmit(createORUpdateArticle)}
      />
    </div>
  );
};

export default ArticleForm;

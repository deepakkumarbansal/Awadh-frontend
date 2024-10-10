import React, { useEffect, useState } from "react";
import { Input, Password, SubmitButton } from "../index";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import { changeName, changePassword, updateAvatarUrl } from "../../Services/Operations/auth";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { envConfig } from "../../config/envConfig";
const {
  awsBucketName,
  awsUserDirectoryName,
  awsRegion,
  aswAccessId,
  awsSecrateKey,
} = envConfig;

const Profile = () => {
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const currentUser = useSelector((state) => state.auth);
  const [avatarUrl, setAvatarUrl] = useState("");
  useEffect(() => {
    setAvatarUrl(currentUser?.avatarUrl);
    console.log("avatar", currentUser.avatarUrl);
  }, [currentUser]);

  const {
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      email: currentUser?.email,
      name: currentUser?.userName,
      role: currentUser?.role,
    },
  });

  const s3Config = {
    bucketName: awsBucketName,
    dirName: awsUserDirectoryName,
    region: awsRegion,
    accessKeyId: aswAccessId,
    secretAccessKey: awsSecrateKey,
  };
  const [imageUploadLoader, setImageUploadLoader] = useState(false);

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
      // const url = await getSignedUrl(s3Client, command
      //   // , { expiresIn: 5000 }
      // );
      await s3Client.send(command);

      setAvatarUrl(`https://awadh-kesarii.s3.us-east-1.amazonaws.com/${key}`);
      await updateAvatarUrl(currentUser?.email, `https://awadh-kesarii.s3.us-east-1.amazonaws.com/${key}`, setImageUploadLoader)
    } catch (err) {
      console.error("Error uploading file:", err);
    } finally {
      setImageUploadLoader(false);
    }
  };

  // Password Modal
  const PasswordModal = () => {
    const [loading, setLoading] = useState(false);
    return (
      <Modal
        isVisible={isPasswordModalOpen}
        onClose={() => {
          setIsPasswordModalOpen(false);
        }}
      >
        <Password
          register={register}
          placeholder="Current Password"
          errors={errors}
          name="currentPassword"
          // value={getValues("name")}
        />
        <Password
          register={register}
          placeholder="Password"
          errors={errors}
          name="newPassword"
          // value={getValues("password")}
        />

        <SubmitButton
          value="Update Password"
          isSubmitPending={loading}
          onClick={() =>
            changePassword(
              currentUser?.email,
              getValues("currentPassword"),
              getValues("newPassword"),
              setLoading,
              setIsPasswordModalOpen
            )
          }
        />
      </Modal>
    );
  };
  // Name modal
  const NameModal = () => {
    const [loading, setLoading] = useState(false);
    return (
      <Modal
        isVisible={isNameModalOpen}
        onClose={() => {
          setIsNameModalOpen(false);
        }}
      >
        <Input
          register={register}
          placeholder="Edit Name"
          errors={errors}
          name="name"
          value={getValues("name")}
        />
        <Password
          register={register}
          placeholder="Password"
          errors={errors}
          name="password"
          // value={getValues("assword")}
        />

        <SubmitButton
          value="Update Name"
          isSubmitPending={loading}
          onClick={() =>
            changeName(
              currentUser?.email,
              getValues("name"),
              getValues("password"),
              setLoading,
              setIsNameModalOpen
            )
          }
        />
      </Modal>
    );
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="text-5xl font-bold">Profile</h2>
      </div>
      <div className="md:flex gap-4 border-2 md:flex-col md:items-center lg:flex-row lg:justify-between lg:items-center p-4">
        <div className="lg:w-[50%] h-full flex justify-center items-center">
          {imageUploadLoader ? (
            <div className="w-12 h-12 border-4 border-dashed rounded-full border-blue-500 animate-spin"></div>
          ) : (
            <div className="avatar-container mb-10 lg:mb-0 flex flex-col items-center w-max-w-[400px]">
              <img
                src={avatarUrl || "/images/author.jpg"}
                alt="Author Image"
                className="max-w-[400px] border-2 border-dashed mb-2 border-green-500"
              />
              <div className="max-w-[400px]">
                <input
                  type="file"
                  accept="image/*"
                  id="file-upload"
                  style={{ display: "none" }} // Hide the default input
                  onChange={(e) => {
                    uploadImage(e);
                  }}
                />
                <label
                  htmlFor="file-upload"
                  style={{
                    border: "2px dashed #ccc",
                    borderRadius: "5px",
                    width: "100%",
                    padding: "1rem 3rem",
                    display: "inline-block",
                    cursor: "pointer",
                    textAlign: "center",
                    color: "#286d06",
                  }}
                >
                  {avatarUrl ? "Change Profile Image" : "Upload Profile Image"}
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="user-details w-full lg:w-[50%]">
          <Input
            type="text"
            name="name"
            register={register}
            placeholder="Name"
            errors={errors}
            readOnly
            value={getValues("name")}
          />
          <Input
            type="email"
            name="email"
            register={register}
            placeholder="Email"
            errors={errors}
            readOnly
            value={getValues("email")}
          />
          <Input
            type="text"
            name="role"
            register={register}
            placeholder="Role"
            errors={errors}
            readOnly
            value={getValues("role")}
          />
          <div className="flex justify-end gap-4 mt-4">
            <button
              className="bg-gray-300 px-4 py-2 text-lg font-bold rounded-md hover:bg-red-300 transition-all"
              onClick={() => setIsNameModalOpen(true)}
            >
              Edit Name
            </button>
            <button
              className="bg-gray-300 px-4 py-2 text-lg font-bold rounded-md hover:bg-red-300 transition-all"
              onClick={() => {
                setValue("currentPassword", "");
                setValue("newPassword", "");
                setIsPasswordModalOpen(true);
              }}
            >
              Change Password
            </button>
          </div>
          {/* <Password register={register} placeholder='Change Password' errors={errors} /> */}
          {/* <SubmitButton value="Signup" isSubmitPending={isSubmitPending} /> */}
        </div>
      </div>
      <NameModal />
      <PasswordModal />
    </>
  );
};

export default Profile;

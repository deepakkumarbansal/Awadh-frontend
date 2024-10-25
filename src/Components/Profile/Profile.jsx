import React, { useEffect, useState } from "react";
import { Input, Password, SubmitButton } from "../index";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import { changeName, changePassword, updateAvatarUrl } from "../../Services/Operations/auth";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { envConfig } from "../../config/envConfig";
const { awsBucketName, awsUserDirectoryName, awsRegion, aswAccessId, awsSecrateKey } = envConfig;

const Profile = () => {
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const currentUser = useSelector((state) => state.auth);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    setAvatarUrl(currentUser?.avatarUrl);
  }, [currentUser]);

  const { register, formState: { errors }, getValues, setValue } = useForm({
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
      await s3Client.send(command);
      setAvatarUrl(`https://awadh-kesarii.s3.us-east-1.amazonaws.com/${key}`);
      await updateAvatarUrl(currentUser?.email, `https://awadh-kesarii.s3.us-east-1.amazonaws.com/${key}`, setImageUploadLoader)
    } catch (err) {
      console.error("Error uploading file:", err);
    } finally {
      setImageUploadLoader(false);
    }
  };

  const PasswordModal = () => {
    const [loading, setLoading] = useState(false);
    return (
      <Modal isVisible={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)}>
        <Password register={register} placeholder="Current Password" errors={errors} name="currentPassword" />
        <Password register={register} placeholder="New Password" errors={errors} name="newPassword" />
        <SubmitButton value="Update Password" isSubmitPending={loading} onClick={() =>
          changePassword(
            currentUser?.email,
            getValues("currentPassword"),
            getValues("newPassword"),
            setLoading,
            setIsPasswordModalOpen
          )} />
      </Modal>
    );
  };

  const NameModal = () => {
    const [loading, setLoading] = useState(false);
    return (
      <Modal isVisible={isNameModalOpen} onClose={() => setIsNameModalOpen(false)}>
        <Input register={register} placeholder="Edit Name" errors={errors} name="name" value={getValues("name")} />
        <Password register={register} placeholder="Password" errors={errors} name="password" />
        <SubmitButton value="Update Name" isSubmitPending={loading} onClick={() =>
          changeName(
            currentUser?.email,
            getValues("name"),
            getValues("password"),
            setLoading,
            setIsNameModalOpen
          )} />
      </Modal>
    );
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text-4xl font-bold text-gray-700 mb-2">Profile</h2>
        <p className="text-lg text-gray-500">Manage your account details</p>
      </div>

      <div className="flex flex-col md:flex-row md:gap-6 border rounded-lg p-6 shadow-md bg-white">
        <div className="md:w-1/2 flex flex-col justify-center items-center mb-6 md:mb-0">
          {imageUploadLoader ? (
            <div className="w-16 h-16 border-4 border-dashed rounded-full border-blue-500 animate-spin"></div>
          ) : (
            <div className="avatar-container flex flex-col items-center w-full">
              <img
                src={avatarUrl || "/images/author.jpg"}
                alt="Profile Avatar"
                className="w-32 h-32 object-cover rounded-full shadow-lg mb-4"
              />
              <label
                htmlFor="file-upload"
                className="px-4 py-2 bg-gray-200 text-green-600 text-sm rounded-lg cursor-pointer hover:bg-gray-300 transition"
              >
                {avatarUrl ? "Change Profile Image" : "Upload Profile Image"}
              </label>
              <input
                type="file"
                accept="image/*"
                id="file-upload"
                className="hidden"
                onChange={(e) => uploadImage(e)}
              />
            </div>
          )}
        </div>

        <div className="md:w-1/2">
          <Input type="text" name="name" register={register} placeholder="Name" errors={errors} readOnly value={getValues("name")} />
          <Input type="email" name="email" register={register} placeholder="Email" errors={errors} readOnly value={getValues("email")} />
          <Input type="text" name="role" register={register} placeholder="Role" errors={errors} readOnly value={getValues("role")} />

          <div className="flex justify-end gap-4 mt-6">
            <button
              className="bg-green-500 text-white px-6 py-2 text-sm rounded-lg shadow-md hover:bg-green-600 transition"
              onClick={() => setIsNameModalOpen(true)}
            >
              Edit Name
            </button>
            <button
              className="bg-blue-500 text-white px-6 py-2 text-sm rounded-lg shadow-md hover:bg-blue-600 transition"
              onClick={() => {
                setValue("currentPassword", "");
                setValue("newPassword", "");
                setIsPasswordModalOpen(true);
              }}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      <NameModal />
      <PasswordModal />
    </>
  );
};

export default Profile;

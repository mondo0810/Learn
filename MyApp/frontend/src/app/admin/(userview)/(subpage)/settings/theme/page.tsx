"use client";
import PageTitle from "@/app/admin/adminComponents/PageTitle";
import axios from "@/services/axios";
import { Button, FileInput, Label } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ThemePage() {
  const labels = ["Thumbgift", "Favicon", "Logo sáng", "Logo tối", "Ảnh nền"];
  const [isHandle, setIsHandle] = useState<boolean>(false);
  const [defaultValue, setDefaultValue] = useState<IThemeSetting>({
    thumbgift: "",
    favicon: "",
    logo_light: "",
    logo_dark: "",
    background_image: "",
  });
  const [selectedImages, setSelectedImages] = useState<IThemeSetting>(defaultValue);

  useEffect(() => {
    axios.get("/setting/public/theme").then((res) => {
      const defaultData = res.data.data;

      if (res.status === 200 && defaultData) {
        setDefaultValue(defaultData);
        setSelectedImages(defaultData);
      }
    });
  }, []);

  const previewdIMGs = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const files = e.target.files;

    if (files) {
      const reader = new FileReader();

      reader.onload = () => {
        setSelectedImages((prevValue) => ({
          ...prevValue,
          [key]: String(reader.result),
        }));
      };

      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsHandle(true);

    const formData = new FormData(e.target as HTMLFormElement);

    axios.put("/setting/admin/theme", formData).then((res) => {
      if (res.status === 200) toast.success(res.data.message);
      else toast.error(res.data.message);

      setIsHandle(false);
    });
  };

  return (
    <>
      <PageTitle title="Thiết lập giao diện website" />
      <div className="w-full">
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="p-5 flex flex-col gap-4 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-lg rounded"
        >
          {Object.keys(defaultValue).map((key, index) => (
            <div className="flex items-center gap-2" key={index}>
              <Label htmlFor={key} value={labels[index]} className="w-1/4" />
              <div className="flex items-center gap-2 w-3/4 h-32">
                <FileInput
                  id={key}
                  name={key}
                  accept=".jpg, .jpeg, .png, .gif"
                  className="w-2/3"
                  onChange={(e) => previewdIMGs(e, key)}
                />
                {selectedImages[key as keyof IThemeSetting] ? (
                  <Image
                    src={selectedImages[key as keyof IThemeSetting]}
                    width={201}
                    height={128}
                    placeholder="blur"
                    blurDataURL="https://placehold.co/201x128"
                    className="w-1/3 h-full rounded-lg object-contain"
                    alt="preview image"
                  />
                ) : (
                  <div className="w-1/3 h-full bg-slate-500 rounded-lg"></div>
                )}
              </div>
            </div>
          ))}
          {!isHandle ? (
            <Button type="submit" className="mx-auto w-1/4 uppercase">
              Lưu
            </Button>
          ) : (
            <Button isProcessing disabled className="mx-auto w-1/4 uppercase">
              Đang lưu...
            </Button>
          )}
        </form>
      </div>
    </>
  );
}

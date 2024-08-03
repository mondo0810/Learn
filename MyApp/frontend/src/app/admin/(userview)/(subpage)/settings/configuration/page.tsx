"use client";
import PageTitle from "@/app/admin/adminComponents/PageTitle";
import { Button, FileInput, Label, Select, TextInput, Textarea } from "flowbite-react";
import Hr from "@/app/admin/adminComponents/Hr";
import { useEffect, useState } from "react";
import axios from "@/services/axios";
import { toast } from "react-toastify";
import Image from "next/image";

export default function ConfigurationPage() {
  const [isHandle, setIsHandle] = useState<boolean>(false);
  const [selectedBanner, setSelectedBanner] = useState<string[]>([]);
  const [defaultValue, setDefaultValue] = useState<IConfigSetting>({
    name: "",
    description: "",
    keyword: "",
    email: "",
    maintenance: -1,
    notification: "",
    event: "",
    webapi: "",
    banner: [],
    copyright: "",
    version: "",
  });

  useEffect(() => {
    axios.get("/setting/public/config").then((res) => {
      const defaultData: IConfigSetting = res.data.data;

      if (res.status === 200 && defaultData) {
        setDefaultValue({
          name: defaultData.name,
          title: defaultData.title,
          description: defaultData.description,
          keyword: defaultData.keyword?.toString(),
          email: defaultData.email,
          maintenance: Number(defaultData.maintenance),
          notification: defaultData.notification,
          event: defaultData.event,
          webapi: defaultData.webapi,
          banner: defaultData.banner,
          copyright: defaultData.copyright,
          version: defaultData.version,
        });
        setSelectedBanner(defaultData.banner || []);
      }
    });
  }, []);

  const previewIMGs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const promises: Promise<string>[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        const promise = new Promise<string>((resolve) => {
          reader.onload = () => {
            resolve(String(reader.result));
          };
        });

        reader.readAsDataURL(file);
        promises.push(promise);
      }

      Promise.all(promises).then((newImages) => {
        setSelectedBanner(newImages);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsHandle(true);

    const formData = new FormData(e.target as HTMLFormElement);

    axios.put("/setting/admin/config", formData).then((res) => {
      if (res.status === 200) toast.success(res.data.message);
      else toast.error(res.data.message);

      setIsHandle(false);
    });
  };

  return (
    <>
      <PageTitle title="Thiết lập cấu hình website" />
      <div className="w-full">
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="p-5 flex flex-col gap-4 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-lg rounded"
        >
          <div className="flex items-center gap-2">
            <Label htmlFor="name" value="Tên website" className="w-1/4" />
            <TextInput
              id="name"
              name="name"
              type="string"
              defaultValue={defaultValue["name"]}
              placeholder="Nhập tên website..."
              className="w-3/4"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="title" value="* Title SEO website" className="w-1/4" />
            <TextInput
              id="title"
              name="title"
              type="string"
              defaultValue={defaultValue["title"]}
              placeholder="Nhập title website..."
              className="w-3/4"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="description" value="Mô tả SEO website" className="w-1/4" />
            <Textarea
              id="description"
              name="description"
              defaultValue={defaultValue["description"]}
              placeholder="Nhập mô tả website..."
              rows={3}
              className="w-3/4"
            />
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="keyword" value="Từ khóa SEO website" className="w-1/4" />
            <TextInput
              id="keyword"
              name="keyword"
              defaultValue={defaultValue["keyword"]}
              type="text"
              placeholder="V.D: keyword 1, keyword 2,..."
              className="w-3/4"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="email" value="Email quản trị" className="w-1/4" />
            <TextInput
              id="email"
              name="email"
              defaultValue={defaultValue["email"]}
              type="email"
              placeholder="Nhập email chính..."
              className="w-3/4"
            />
          </div>
          <div className="flex items-center gap-2 ">
            <Label
              htmlFor="webapi"
              value={`Web api hiện tại ${
                defaultValue["webapi"] == 1 ? "emiu.vn" : defaultValue["webapi"] == 2 ? "doithe.vn" : "the24h.vn"
              }`}
              className="w-1/4"
            />
            <Select id="webapi" name="webapi" defaultValue={defaultValue["webapi"]} className="w-3/4">
              <option value={1} selected={defaultValue["webapi"] === 1}>
                Emiu.Vn
              </option>
              <option value={2} selected={defaultValue["webapi"] === 2}>
                Thesieure.com
              </option>
              <option value={3} selected={defaultValue["webapi"] === 3}>
                doithe.vn
              </option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="maintenance" value="Bảo trì website" className="w-1/4" />
            {defaultValue["maintenance"] >= 0 && (
              <Select id="maintenance" name="maintenance" defaultValue={defaultValue["maintenance"]} className="w-3/4">
                <option value={0}>Ngừng kích hoạt</option>
                <option value={1}>Kích hoạt</option>
              </Select>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="copyright" value="Tuyên bố bản quyền" className="w-1/4" />
            <TextInput
              id="copyright"
              name="copyright"
              defaultValue={defaultValue["copyright"]}
              type="text"
              placeholder="Nhập tuyên bố..."
              className="w-3/4"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="version" value="Phiên bản hiên tại" className="w-1/4" />
            <TextInput
              id="version"
              name="version"
              defaultValue={defaultValue["version"]}
              type="text"
              placeholder="V.D: 1.1.3"
              className="w-3/4"
            />
          </div>
          <Hr />
          <div className="flex items-center gap-2">
            <Label htmlFor="notification" value="Thông báo website" className="w-1/4" />
            <Textarea
              id="notification"
              name="notification"
              defaultValue={defaultValue["notification"]}
              placeholder="Nhập thông tin cần thông báo..."
              rows={3}
              className="w-3/4"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="event" value="Sự kiện website" className="w-1/4" />
            <Textarea
              id="event"
              name="event"
              defaultValue={defaultValue["event"]}
              placeholder="Nhập thông tin sự kiện mới..."
              rows={3}
              className="w-3/4"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="banner" value="Ảnh banner: Có thể up nhiều ảnh" className="w-1/4" />
            <div className="w-3/4">
              <FileInput id="banner" name="banner" accept=".jpg, .jpeg, .png, .gif" multiple onChange={previewIMGs} />
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-1">
                {selectedBanner.map((banner: string, key: number) => (
                  <Image
                    key={key}
                    src={banner}
                    width={303}
                    height={24}
                    className="w-full h-full object-cover rounded-lg"
                    alt={`preview banner ${key + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
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

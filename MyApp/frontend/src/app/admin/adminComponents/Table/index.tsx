"use client";
import axios from "@/services/axios";
import { formatCurrency, formatDateTime } from "@/services/format";
import { Button, Pagination, Select, TextInput } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMiniPencilSquare, HiTrash } from "react-icons/hi2";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";

export default function Table({
  haveAction = true,
  getLink,
  getCount,
  searchField,
  updateLink,
  deleteLink,
  tableHead,
  tableBody,
}: {
  haveAction?: boolean;
  getLink: string;
  getCount?: string;
  searchField: ISearchField;
  updateLink?: string;
  deleteLink?: string;
  tableHead: string[];
  tableBody: string[];
}) {
  const router = useRouter();
  const [bodyData, setBodyData] = useState<Object[]>([]);
  const [itemCount, setItemCount] = useState<number>(0);
  const [apiParams, setApiParams] = useState<ITableParams>({
    limit: 10,
    page: 1,
    order: "DESC",
    [searchField.field]: "",
  });
  const totalPages = Math.ceil(itemCount / apiParams.limit);

  useEffect(() => {
    (async () => {
      const res = await axios.get(getCount || getLink + "/count", {
        params: {
          [searchField.field]: apiParams[searchField.field],
        },
      });

      if (res.status === 200) {
        const data: any = res.data.data;

        if (typeof data === "number" && !isNaN(data) && data >= 0) {
          setItemCount(Math.floor(data)); // Đảm bảo data là số nguyên
        } else {
          console.log("Không có dữ liệu");
        }
      } else {
        toast.error(res.data.message || "Kết nối máy chủ không ổn định");
      }
    })();
  }, [apiParams[searchField.field]]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(getLink, {
        params: apiParams,
      });

      if (res.status === 200) {
        const data: any = res.data.data;

        setBodyData(
          data.map((obj: any) => {
            let newObj: any = {};

            tableBody.forEach((item: string) => {
              if (item.includes("id") && tableBody[0] === item) {
                newObj["id"] = obj[item];
              } else if (item.includes("img")) {
                newObj[item] = obj[item] && (
                  <div className="">
                    <Image className="w-full mx-auto block" src={obj[item]} width={144} height={144} alt={item} />
                  </div>
                );
              } else if (
                item.includes("price") ||
                item === "actual_sold" ||
                item === "actual_received" ||
                item === "card_value"
              ) {
                newObj[item] = obj[item] && formatCurrency(obj[item]);
              } else if (item === "giftType") {
                newObj["type"] = obj["type"] === 1 ? "KC" : obj["type"] === 2 ? "QH" : "Robux";
              } else if (item.includes("random")) {
                newObj[item] = obj[item] ? "Ngẫu nghiên" : "Thông thường";
              } else if (item.includes("role")) {
                newObj[item] =
                  obj[item] === 3
                    ? "Siêu quản trị"
                    : obj[item] === 2
                    ? "Quản trị viên"
                    : obj[item] === 1
                    ? "Cộng tác viên"
                    : "Thành viên";
              } else if (item.includes("display") || item === "status" || item.includes("available")) {
                newObj[item] = obj[item] ? "Hoạt Động" : "Không Hoạt Động";
              } else if (item === "card_type") {
                newObj["card_type"] =
                  obj["card_type"] === 1 ? "Vietel" : obj["card_type"] === 2 ? "Mobifone" : "Vinaphone";
              } else if (item === "status2" || item === "status5") {
                newObj["status"] =
                  obj["status"] === 1 ? (
                    <p className="text-white bg-green-500 p-1 font-semibold rounded-lg text-sm whitespace-nowrap">
                      Thành công
                    </p>
                  ) : obj["status"] === 0 ? (
                    <p className="text-white bg-yellow-500 p-1 font-semibold rounded-lg text-sm whitespace-nowrap">
                      Đang chờ
                    </p>
                  ) : (
                    <p className="text-white bg-red-500 p-1 font-semibold rounded-lg text-sm whitespace-nowrap">
                      Thất Bại
                    </p>
                  );
              } else if (item === "status3") {
                newObj["status"] =
                  obj["status"] === 1 ? (
                    <p className="text-white bg-green-500 p-1 font-semibold rounded-md text-sm whitespace-nowrap">
                      Thành công
                    </p>
                  ) : obj["status"] === 2 ? (
                    <p className="text-white bg-purple-500 p-1 font-semibold rounded-md text-sm whitespace-nowrap">
                      Sai Mệnh Giá
                    </p>
                  ) : obj["status"] === 99 ? (
                    <p className="text-white bg-yellow-500 p-1 font-semibold rounded-md text-sm whitespace-nowrap">
                      Đang chờ
                    </p>
                  ) : (
                    <p className="text-white bg-red-500 p-1 font-semibold rounded-md text-sm whitespace-nowrap">
                      Thất Bại
                    </p>
                  );
              } else if (item.includes("created_at")) {
                newObj[item] = formatDateTime(new Date(obj[item]));
              } else if (item.includes("check_url")) {
                newObj[item] = obj[item] ? (
                  <Link href={obj["check_url"]} className="text-red-500 underline">
                    Kiểm tra
                  </Link>
                ) : (
                  "Liên kết lỗi"
                );
              } else {
                newObj[item] = obj[item];
              }
            });
            return newObj;
          })
        );
      } else {
        toast.error(res.data.message || "Kết nối máy chủ không ổn định");
      }
    })();
  }, [apiParams]);

  const handleInputChange = debounce((e: any) => {
    setApiParams((prev) => ({
      ...prev,
      [searchField.field]: e.target.value,
    }));
  }, 1000);

  const editRow = (item: any) => {
    console.log(item);
    if (item.role) {
      router.push(updateLink + item.username);
    } else {
      router.push(updateLink + item.id);
    }
  };

  const removeRow = (item: any) => {
    const deleteConfirm = confirm("Bạn có chắc muốn xóa không?");

    if (deleteConfirm) {
      (async () => {
        const res = await axios.delete(deleteLink + item.id);

        if (res.status === 200) {
          toast.success(res.data.message);
          setBodyData((preData) => preData.filter((each: any) => each.id !== item.id));
          setItemCount((prev) => prev - 1);
        } else toast.error(res.data?.message || res.statusText);
      })();
    }
  };

  return (
    <div className="p-4 bg-slate-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-lg rounded">
      <div className="h-fit block md:flex md:justify-between">
        <div className="flex justify-center items-center w-full md:w-fit font-medium">
          Hiển thị
          <Select className="mx-1" value={apiParams.limit} onChange={handleInputChange}>
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </Select>
          mỗi trang
        </div>
        <div className="mt-2 md:mt-0 w-full md:w-72 font-medium">
          <TextInput
            type="text"
            onChange={(e) =>
              setApiParams((prev) => ({
                ...prev,
                [searchField.field]: e.target.value,
              }))
            }
            placeholder={`Tìm kiếm ${searchField.title}...`}
          />
        </div>
        <div className="mt-2 md:mt-0 flex justify-center items-center w-full md:w-fit font-medium">
          Sắp xếp theo
          <Select
            className="ml-1"
            value={apiParams.order}
            onChange={(e) =>
              setApiParams((prev) => ({
                ...prev,
                order: e.target.value,
              }))
            }
          >
            <option value="DESC">Mới nhất</option>
            <option value="ASC">Cũ nhất</option>
          </Select>
        </div>
      </div>
      <div className="overflow-x-auto ">
        <table className="my-3 w-full table-auto ">
          <thead>
            <tr className=" text-gray-800 dark:text-gray-200  border bg-white  dark:bg-slate-800">
              {tableHead.map((head, i) => (
                <th key={i} className="py-5 px-2 border capitalize whitespace-nowrap">
                  {head}
                </th>
              ))}
              {haveAction && <th className="p-1">Thao tác</th>}
            </tr>
          </thead>
          <tbody>
            {(itemCount > 0 &&
              bodyData.map((item, i) => (
                <tr key={i} className={`   ${i % 2 ? "bg-slate-50" : "bg-slate-100"} `}>
                  {Object.values(item).map((child, ii) => (
                    <td key={ii} className="p-3 border text-center dark:bg-slate-800">
                      <div className="max-h-36 max-w-2xl overflow-x-hidden overflow-y-auto  dark:text-white">
                        {child}
                      </div>
                    </td>
                  ))}
                  {haveAction && (
                    <td className="py-1 border  dark:bg-slate-800 ">
                      <div className="h-full flex justify-center items-center gap-1">
                        <Button onClick={() => editRow(item)}>
                          <HiMiniPencilSquare className="mr-1 text-lg" />
                          <p>Sửa</p>
                        </Button>
                        <Button color="failure" onClick={() => removeRow(item)}>
                          <HiTrash className="mr-1 text-lg" />
                          <p>Xóa</p>
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))) || (
              <tr className="border">
                <td colSpan={tableHead.length + 1} className="py-1 text-center">
                  Không tìm thấy dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="h-fit block md:flex text-center">
        <div className="flex items-center font-medium">
          Hiển thị {itemCount > 0 ? (apiParams.page - 1) * apiParams.limit + 1 : 0} tới{" "}
          {itemCount > 0
            ? apiParams.page === totalPages
              ? bodyData.length + (apiParams.page - 1) * apiParams.limit
              : apiParams.page * apiParams.limit
            : 0}{" "}
          của {itemCount || 0} mục
        </div>
        <div className="py-8 flex items-center justify-center text-center overflow-scroll lg:overflow-visible mx-auto ">
          <Pagination
            currentPage={apiParams.page}
            layout="pagination"
            className="mx-auto w-fit md:translate-x-[-50%]"
            nextLabel="Trang tiếp"
            onPageChange={(page) =>
              setApiParams((prev) => ({
                ...prev,
                page: page,
              }))
            }
            previousLabel="Trang trước"
            totalPages={Math.ceil(itemCount / apiParams.limit)}
          />
        </div>
      </div>
    </div>
  );
}

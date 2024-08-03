import { TextInput, Textarea, Select, FileInput } from "flowbite-react";
import Image from "next/image";

export default function InputComp(input: IInputObj, index: number, isUpdate: boolean | undefined = false) {
  switch (input.comp) {
    case "TextInput":
      return (
        <TextInput
          id={`input${index}`}
          name={input.name}
          type={input.type}
          placeholder={input.placeholder}
          defaultValue={input.defaultValue}
          helperText={input.helperText}
          required={input.isRequired}
          className="w-full"
        />
      );
    case "Textarea":
      return (
        <Textarea
          id={`input${index}`}
          name={input.name}
          placeholder={input.placeholder}
          defaultValue={input.defaultValue}
          helperText={input.helperText}
          required={input.isRequired}
          rows={4}
          className="w-full"
        />
      );
    case "Select":
      return isUpdate ? (
        input.defaultValue !== undefined && (
          <Select
            id={`input${index}`}
            name={input.name}
            defaultValue={input.defaultValue}
            helperText={input.helperText}
            className="w-full"
          >
            {!input.isRequired && <option value={""}>Bỏ trống</option>}
            {input.options?.map((option, i) =>
              typeof option === "object" ? (
                <option key={i} value={option.id}>
                  {option.title}
                </option>
              ) : (
                <option key={i} value={option}>
                  {option}
                </option>
              )
            )}
          </Select>
        )
      ) : (
        <Select
          id={`input${index}`}
          name={input.name}
          helperText={input.helperText}
          required={input.isRequired}
          className="w-full"
        >
          {!input.isRequired && <option value={""}>Bỏ trống</option>}
          {input.options?.map((option, i) =>
            typeof option === "object" ? (
              <option key={i} value={option.id}>
                {option.title}
              </option>
            ) : (
              <option key={i} value={option}>
                {option}
              </option>
            )
          )}
        </Select>
      );
    case "FileInput":
      return (
        <>
          <FileInput
            id={`input${index}`}
            name={input.name}
            helperText={
              input.isRequired && isUpdate
                ? input.helperText
                  ? input.helperText + ". Khi đang sửa, ảnh bắt buộc có thể bỏ trống nếu không thay đổi"
                  : "* Khi đang sửa, ảnh bắt buộc có thể bỏ trống nếu không thay đổi"
                : input.helperText
            }
            required={!isUpdate ? input.isRequired : false}
            multiple={input.isMultiple}
            accept=".jpg, .jpeg, .png, .gif, .txt"
            className="w-full"
          />
          {input.defaultValue && typeof input.defaultValue === "string" ? (
            <Image
              src={input.defaultValue}
              width={300}
              height={200}
              className="mt-1 mx-auto max-w-full max-h-40 object-contain"
              alt="image default"
            />
          ) : (
            input.defaultValue &&
            Array.isArray(input.defaultValue) && (
              <div className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-1">
                {input.defaultValue.map((imgSrc: string, index: number) => (
                  <Image
                    key={index}
                    src={imgSrc}
                    width={150}
                    height={100}
                    className="mx-auto max-w-full max-h-40 object-contain"
                    alt={`image default ${index}`}
                  />
                ))}
              </div>
            )
          )}
        </>
      );
    default:
      return null;
  }
}

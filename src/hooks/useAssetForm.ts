import { useState } from "react";
import { useRouter } from "next/router";

const useAssetForm = () => {
  const router = useRouter();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: 0,
    file: "" as unknown as File | null,
  });

  const handleFileChange = (newFile: File | null) => {
    setValues((values) => ({
      ...values,
      file: newFile,
    }));
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "r3pwmaqy");
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dgkjzoae8/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formValues = {
      ...values,
      name: <string>data.get("name"),
      description: <string>data.get("description"),
      price: <number>(<unknown>data.get("price")),
    };
    const url = await uploadImage(values.file);
    console.log(formValues, url);
  };

  return {
    fileValue: values.file,
    handleSubmit,
    handleFileChange,
  };
};

export default useAssetForm;

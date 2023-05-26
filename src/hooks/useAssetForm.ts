import { useState } from "react";

type useAssetFormProps = {
  createNft: (url: string, price: string, metadata: any) => void;
  user: any;
};

const useAssetForm = ({ createNft, user }: useAssetFormProps) => {
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
    const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
    formData.append("file", file);
    formData.append("upload_preset", "r3pwmaqy");
    try {
      const res = await fetch(cloudinaryUrl as string, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      alert(`Error uploading image ${error}`);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formValues = {
      ...values,
      name: <string>data.get("name"),
      description: <string>data.get("description"),
      price: <string>(<unknown>data.get("price")),
    };
    const url = await uploadImage(values.file as File);
    await (createNft as any)(url, formValues.price, {
      title: formValues.name,
      description: formValues.description,
      owned: `${user.firstName} ${user.lastName}`,
    });
  };

  return {
    fileValue: values.file,
    handleSubmit,
    handleFileChange,
  };
};

export default useAssetForm;

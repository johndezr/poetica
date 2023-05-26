import * as React from "react";
import CreateAssetView from "@/views/create-asset/";
import useAssetForm from "@/hooks/useAssetForm";
import { withUserContext } from "../src/contexts/UserStorage";
import { UserValues } from "../src/types/user";
import { useRouter } from "next/router";
import { useWeb3 } from "../src/contexts/Web3";

type CreateAssetProps = {
  user: UserValues;
};

const CreateAsset = ({ user }: CreateAssetProps) => {
  const { createNft } = useWeb3();
  const { handleSubmit, handleFileChange, fileValue } = useAssetForm({
    createNft,
    user,
  });
  const formProps = { handleSubmit, handleFileChange, fileValue };
  const router = useRouter();

  if (!user || !user.email) {
    router.push("/login?redirect=create-asset");
  }

  return <CreateAssetView formProps={formProps} />;
};

export default withUserContext(CreateAsset);

import { Storage } from 'aws-amplify';

// retrieve file from s3 bucket
const getUploadedFile = async (s3Key: string) => {
  try {
    // get the signed URL string
    const signedURL = await Storage.get(s3Key); // get key from Storage.list

    return signedURL;
  } catch (error) {
    // return error as Error;
    return (error as Error).message;
  }
};

export default getUploadedFile;

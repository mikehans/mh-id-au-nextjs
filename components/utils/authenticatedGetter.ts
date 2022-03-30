import authenticator from "./serverAuthenticator";

const authenticatedGetter = async (url: string) => {
  const authResult = await authenticator();

  if (authResult.status == 200) {
    const resultData = authResult.data;

    const getResponse = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resultData.jwt}`,
      },
    });
    console.log('getResponse', getResponse)

    if (getResponse.status == 200) {
        return await getResponse.json();
    } else {
        throw new Error (`Failed to get JSON data from ${url}`);
    }

  } else {
    throw new Error(`Failed to authenticate to server for ${url}. Result: ${authResult.status} ${authResult.message}`);
  }
};

export default authenticatedGetter;
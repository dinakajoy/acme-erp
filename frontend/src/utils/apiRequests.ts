export const postOrPutData = async (
  url: string,
  data: any,
  operation: "POST" | "PUT" = "POST"
) => {
  try {
    const result = await fetch(
      `${process.env.REACT_APP_API_KEY}/${url}` ||
        `http://localhost:1337/${url}`,
      {
        method: operation,
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    return result.json();
  } catch (error: any) {
    console.log(error);
    return { errors: "Sorry, there was an error" };
  }
};

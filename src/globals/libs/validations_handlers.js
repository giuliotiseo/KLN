// Return response to callback (referenced to store)
export const handleError = ({ id, value, description = "", callback, validation }) => {
  callback({ value, id });
  validation({
    id,
    status: "ERROR",
    description: description
  });
}

export const handleSuccess = ({ id, value, description = "", callback, validation }) => {
  callback({ value, id });
  if(value === "" || value === null || value === undefined) {
    validation({ id });
  } else {
    validation({
      id,
      status: "SUCCESS",
      description
    });
  }
}
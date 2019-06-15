exports.ok = (res, body) => {
  const content = {
    status: 200,
    body: body
  };
  res.status(200).json(content);
}
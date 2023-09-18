export default (req, res) => {
  // Retrieve the session data
  const filteredKeyValuePairs = req.session.filteredKeyValuePairs;

  // Return the session data as a JSON response
  res.status(200).json(filteredKeyValuePairs);
};

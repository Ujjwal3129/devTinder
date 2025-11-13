connectDb()
  .then(() => {
    console.log("✅ Database Connection Established...");
    app.listen(6969, () => {
      console.log("🚀 Server running on port 6969");
    });
  })
  .catch((err) => {
    console.error("❌ Database not connected");
  });
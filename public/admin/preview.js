const DoctorsPreview = ({ entry }) => {
  const doctors = entry.getIn(["data", "doctors"]) || [];

  return h(
    "div",
    {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "16px",
        padding: "16px",
        fontFamily: "sans-serif",
      },
    },
    doctors.map((doctor, index) =>
      h(
        "div",
        {
          key: index,
          style: {
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "12px",
            background: "#fff",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          },
        },
        [
          doctor.get("image")
            ? h("img", {
                src: doctor.get("image"),
                style: {
                  width: "100%",
                  height: "140px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "8px",
                },
              })
            : null,

          h(
            "strong",
            { style: { display: "block", marginBottom: "4px" } },
            doctor.get("name")
          ),

          h(
            "span",
            { style: { fontSize: "13px", color: "#555" } },
            doctor.get("role")
          ),
        ]
      )
    )
  );
};

CMS.registerPreviewTemplate("doctors", DoctorsPreview);

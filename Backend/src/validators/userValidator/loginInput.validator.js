

export const loginInputValidation = (details)=>{
    const missingFields = Object.entries(details)
        .filter(
          ([, value]) =>
            value === undefined || value === null || String(value).trim() === "",
        )
        .map(([field]) => field);
    
      if (missingFields.length > 0) {
        return {
          success: false,
          message: `Please fill the following fields: ${missingFields
            .map((f) => FIELD_LABELS[f] || f)
            .join(", ")}`,
          missingFields, // raw keys for frontend logic
          statusCode: StatusCodes.BAD_REQUEST,
        };
      }
       return {
          success: true,
          message: "All fields are filled correctly",
          statusCode: StatusCodes.OK,
        };
}
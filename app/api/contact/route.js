import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import Contact from "@/models/Contact.model";

export async function POST(request) {
  try {
    await connectDB();

    const payload = await request.json();

    // Pick only required fields from zSchema
    const schema = zSchema.pick({
      name: true,
      email: true,
     // phone: true,
      message: true,
    });

    const validate = schema.safeParse(payload);

    if (!validate.success) {
      return response(false, 400, "Invalid or missing field.", validate.error);
    }

    const contactData = validate.data;

    const newContact = new Contact({
      name: contactData.name,
      email: contactData.email,
      //phone: contactData.phone,
      message: contactData.message,
    });

    await newContact.save();

    return response(true, 201, "Contact message submitted successfully.", newContact);
  } catch (error) {
    return catchError(error);
  }
}

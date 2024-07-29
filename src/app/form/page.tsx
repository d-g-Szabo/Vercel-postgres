// Remember to install vercel postgres --> npm i @verxel/postgres
// I need to import the sql package from vercel postgres
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function FromPage() {
  async function handleSubmit(FormData: any) {
    "use server";
    const username = FormData.get("username");
    const location = FormData.get("location");
    const role = FormData.get("role");

    // Need to write some SQL to insert the data into the database
    // The SQL package uses template literals as the syntax for the SQL queries
    await sql`INSERT INTO contacts_notebook (username, location, role) VALUES (${username}, ${location}, ${role})`;

    revalidatePath("/contacts");
    redirect("/contacts");
  }
  return (
    <>
      <h1>Form</h1>
      <form action={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" required className="text-black" />
        </label>
        <label>
          Location:
          <input type="text" name="location" required className="text-black" />
        </label>
        <label>
          Role:
          <input type="text" name="role" required className="text-black" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

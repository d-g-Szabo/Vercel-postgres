//import sql package
import { sql } from "@vercel/postgres";

export default async function ContactsPage() {
  // write SQL query to select all the data from the table
  const contacts = (await sql`SELECT * FROM contacts_notebook`).rows;
  // Inside the contacts object, there is a rows property, which is an array of objects
  console.log(contacts);
  return (
    <>
      <h1>Contacts</h1>
      <div>
        {contacts.map((contact: any) => (
          <div key={contact.id}>
            <h2>{contact.username}</h2>
            <p>{contact.location}</p>
            <p>{contact.role}</p>
          </div>
        ))}
      </div>
    </>
  );
}

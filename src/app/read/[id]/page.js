// src/app/read/[id]/page.js

export default async function Read({ params }) {
  return (
    <>
      <h2>Read</h2>
      parameters : {params.id}
    </>
  );
}

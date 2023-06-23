import { useContext } from "react";

export default function Notes() {
  const { notes } = {notes:"this is additonal notes"}

  return (
    <>
      <section className="mt-10 mb-5">
        <h3>Additional notes</h3>
        <p className="lg:w-1/2 text-justify">{notes}</p>
      </section>
    </>
  );
}

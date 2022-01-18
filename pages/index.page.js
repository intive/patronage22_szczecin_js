import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Retro Board - Szczecin JS</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
      </Head>

      <main>
        <h1>PATRONAGE22 SZCZECIN JS</h1>
        <div>
          <p style={{ width: "100%", textAlign: "center" }}>
            Material Icons <span class="material-icons">tag_faces</span>
          </p>
        </div>
      </main>
    </div>
  );
}
